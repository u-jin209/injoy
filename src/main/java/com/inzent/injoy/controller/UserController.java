package com.inzent.injoy.controller;

import com.inzent.injoy.model.ChatRoomDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
import com.inzent.injoy.service.OrganService;
import com.inzent.injoy.service.S3Uploader;
import com.inzent.injoy.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import com.inzent.injoy.service.email.EmailVerifyService;
import com.inzent.injoy.service.email.PasswordFindService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


@Controller
@RequestMapping("/user/")
public class UserController {


    private final S3Uploader s3Upload;
    private final  UserService userService;
    private final OrganService organService;
    @Value("${part.upload.path}")
    private String FileDirPath;


//    private final EmailService emailService;

    private final EmailVerifyService emailVerifyService;

    private final PasswordFindService passwordFindService;

    @Autowired
    public UserController(S3Uploader s3Upload, UserService userService, OrganService organService, EmailVerifyService emailVerifyService, PasswordFindService passwordFindService) {
        this.s3Upload = s3Upload;
        this.userService = userService;
        this.organService = organService;
        this.emailVerifyService = emailVerifyService;
        this.passwordFindService = passwordFindService;
    }

    //로그인
    @PostMapping("auth")
    public String auth(HttpSession session, Model model, UserDTO attempt) {
//        userService.register(attempt);
        UserDTO result = userService.auth(attempt);

        if (result != null) {
            session.setAttribute("logIn", result);
            return "redirect:/board/showAll/1";   //페이지 url까지 바꿔줌
        } else {
            model.addAttribute("message", "로그인 정보를 다시 확인해주세요.");
            return "test";
        }
    }

    @GetMapping("findPassword")
    public String findPassword() {
        return "user/findPassword";
    }

    @GetMapping("logInPage")
    public String moveLogInPage() {
        return "user/logIn";
    }
    @GetMapping("logInFail")
    public String logInFail(Model model) {
        model.addAttribute("script", "<script>swal.fire({html:'로그인에 실패하였습니다. <br>아이디와 비밀번호를 다시 확인해주세요.',confirmButtonText:'확인',confirmButtonColor:'#3085d6'})</script>");
        return "user/logIn";
    }

    @GetMapping("register")
    public String showRegister() {
        return "user/register";
    }

    @PostMapping("register")
    public String register(UserDTO attempt, Model model) throws Exception {
        if (userService.register(attempt)) {
            String code = emailVerifyService.sendSimpleMessage(attempt.getUsername());
            model.addAttribute("email", attempt.getUsername());
            model.addAttribute("code", code);
            model.addAttribute("script", "<script>swal.fire({text:'이메일로 인증번호를 발송했습니다.',confirmButtonText:'확인',confirmButtonColor:'#3085d6'})</script>");
            return "user/emailVerify";
        } else {
            model.addAttribute("script", "<script>swal.fire({text:'이미 해당 email로 가입된 아이디가 존재합니다.',confirmButtonColor: '#3085d6'})</script>");
            return "user/register";
        }
    }
@PostMapping("checkUserType")
    public ResponseEntity<Map<String, Object>> checkUserType(@AuthenticationPrincipal UserCustomDetails logIn) {
    Map<String, Object> data = new HashMap<>();
    UserDTO userDTO = logIn.getUserDTO();
    if (userDTO.getProvider() == null) {
        data.put("flag", true);
    } else {
        data.put("flag", false);
    }
    return ResponseEntity.ok(data);
}

    @PostMapping("withdrawal")
    public ResponseEntity<Map<String, Object>> withdrawal(@AuthenticationPrincipal UserCustomDetails logIn) {
        Map<String, Object> data = new HashMap<>();
        UserDTO userDTO = logIn.getUserDTO();
        userService.delete(userDTO);
        data.put("flag", "success");
        return ResponseEntity.ok(data);
    }

    @GetMapping("emailVerifiedPage")
    public String emailVerifiedPage(Model model, @AuthenticationPrincipal UserCustomDetails logIn) throws Exception {
        UserDTO userDTO = logIn.getUserDTO();
        String code = emailVerifyService.sendSimpleMessage(logIn.getUsername());
        model.addAttribute("email", logIn.getUsername());
        model.addAttribute("code", code);
        model.addAttribute("script", "<script>swal.fire({text:'이메일 인증이 필요합니다. 이메일로 인증번호를 발송했습니다.',confirmButtonText:'확인',confirmButtonColor:'#3085d6'})</script>");
        return "user/emailVerify";
    }

    @GetMapping("reMail")
    public String reMail(HttpServletRequest req, Model model) throws Exception {
        String email = req.getParameter("email");
        //System.out.println("email = " + email);
        String code = emailVerifyService.sendSimpleMessage(email);
        //System.out.println("code = " + code);
        model.addAttribute("email", email);
        model.addAttribute("code", code);
        model.addAttribute("script", "<script>swal.fire({text:'이메일로 인증번호를 발송했습니다.',confirmButtonText:'확인',confirmButtonColor:'#3085d6'})</script>");
        return "user/emailVerify";
    }

    @PostMapping("emailVerify")
    public String emailVerify(@RequestParam String username) {
        UserDTO userDTO = userService.findByUsername(username);
        userDTO.setEmailVerified(true);
        userService.updateEmailVerified(userDTO);
        return "user/logIn";
    }

    @PostMapping("passwordFind")
    public String passwordFind(@RequestParam String email, Model model) throws Exception {
        UserDTO userDTO = userService.findByUsername(email);
        //System.out.println(userDTO);
        if (userDTO != null) {
            String newPwd = passwordFindService.sendSimpleMessage(email);
            userService.updatePassword(userDTO, newPwd);
            model.addAttribute("script", "<script>swal.fire({text:'임시 비밀번호를 이메일로 발급하였습니다.',confirmButtonText:'확인',confirmButtonColor:'#3085d6'})</script>");
            return "user/logIn";
        } else {
            model.addAttribute("script", "<script>swal.fire({text:'해당 아이디가 존재하지 않습니다.',confirmButtonText:'확인',confirmButtonColor:'#3085d6'})</script>");
            return "user/findPassword";
        }
    }

    @GetMapping("userInfo")
    public String userInfo(@AuthenticationPrincipal UserCustomDetails login, Model model) {

        UserDTO user = login.getUserDTO();
        model.addAttribute("logIn", userService.selectOne(user.getId()));

        model.addAttribute("organList" ,organService.selectAll());

        return "user/userInfo";
    }
    @PostMapping("resetPassword")
    public ResponseEntity<Map<String, Object>> resetPassword(@AuthenticationPrincipal UserCustomDetails login,@RequestParam String currentPassword,@RequestParam String  newPassword) {
        Map<String, Object> data = new HashMap<>();
        UserDTO userDTO = login.getUserDTO();
        boolean flag = userService.resetPassword(userDTO, currentPassword, newPassword);
        data.put("flag", flag);
        return ResponseEntity.ok(data);
    }
    @PostMapping("updateInfo")
    public String updateInfo(@AuthenticationPrincipal UserCustomDetails login, UserDTO userDTO, @RequestParam(value = "file") MultipartFile profilePhoto,
                             HttpServletRequest request) throws IOException {


        //System.out.println("!######################################################################profilePhoto : "+ profilePhoto);

        UserDTO origin = login.getUserDTO();
        origin.setName(userDTO.getName());
        origin.setPhoneNumber(userDTO.getPhoneNumber());
        origin.setEmail(userDTO.getEmail());
        origin.setCondition(userDTO.getCondition());
        origin.setOrganId(userDTO.getOrganId());

        String fileRealName = profilePhoto.getOriginalFilename(); //파일명을 얻어낼 수 있는 메서드!

        //System.out.println("fileRealName : "+ fileRealName);
        if (fileRealName.length() !=0){
            //서버에 저장할 파일이름 fileextension으로 .jsp이런식의  확장자 명을 구함
            String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."), fileRealName.length());

            //String uploadFolder = "C:\\test\\upload";


            UUID uuid = UUID.randomUUID();
            String[] uuids = uuid.toString().split("-");

            String uniqueName = uuids[0];

            File saveFile = new File(request.getServletContext().getRealPath(FileDirPath),"uploadImg/"+uniqueName+fileExtension);
            profilePhoto.transferTo(saveFile);


            origin.setProfilePhoto(s3Upload.upload(saveFile,"uploadImg/"));
        }



        userService.updateInfo(origin);

        return "redirect:/user/userInfo";
    }

    @GetMapping("getUserInfo")
    @ResponseBody
    public UserDTO getUserInfo(@AuthenticationPrincipal UserCustomDetails login, Model model) {

        UserDTO userDTO = login.getUserDTO();
        return userDTO;
    }

    @PostMapping("updateConversation")
    public ResponseEntity<Map<String, Object>> createProjectChatRoom(@RequestParam String conversation,@AuthenticationPrincipal UserCustomDetails login) {
        UserDTO userDTO = login.getUserDTO();
        String loginConversation = userService.findConversation(userDTO.getId());
        Map<String, Object> data = new HashMap<>();
        if (loginConversation.equals("available")) {
            data.put("conversation", "away");
            userDTO.setConversation("away");
            userService.updateConversation(userDTO);
        } else if (loginConversation.equals("away")) {
            data.put("conversation", "available");
            userDTO.setConversation("available");
            userService.updateConversation(userDTO);
        }
        return ResponseEntity.ok(data);
    }


    }
