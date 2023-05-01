package com.inzent.injoy.controller;

import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
import com.inzent.injoy.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.Context;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Controller
@RequestMapping("/user/")
public class UserController {

    private final  UserService userService;
    @Value("${part.upload.path}")
    private String FileDirPath;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
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
    @GetMapping("logInPage")
    public String moveLogInPage(){
        return "user/logIn";
    }
    @GetMapping("register")
    public String showRegister() {
        return "user/register";
    }

    @PostMapping("register")
    public String register(UserDTO attempt, Model model) {
        if(userService.register(attempt)){
            return "redirect:/user/logInPage";
        }else{
            model.addAttribute("script", "<script>swal.fire('이미 해당 email로 가입된 아이디가 존재합니다.')</script>");

            return "user/register";
        }
    }

    @GetMapping("userInfo")
    public String userInfo(@AuthenticationPrincipal UserCustomDetails login, Model model){

        UserDTO user = login.getUserDTO();
        model.addAttribute("user",user);


        return "user/userInfo";
    }


    @PostMapping("updateInfo")
    public String updateInfo(@AuthenticationPrincipal UserCustomDetails login, UserDTO userDTO, @RequestParam("profileImg") MultipartFile profileImg,
                             HttpServletRequest request) throws IOException {






        UserDTO origin = login.getUserDTO();
        origin.setName(userDTO.getName());
        origin.setPhoneNumber(userDTO.getPhoneNumber());
        origin.setEmail(userDTO.getEmail());
        origin.setCondition(userDTO.getCondition());

        String fileRealName = profileImg.getOriginalFilename(); //파일명을 얻어낼 수 있는 메서드!

        System.out.println("fileRealName : "+ fileRealName);
        if (fileRealName.length() !=0){
            //서버에 저장할 파일이름 fileextension으로 .jsp이런식의  확장자 명을 구함
            String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."), fileRealName.length());

            //String uploadFolder = "C:\\test\\upload";


            UUID uuid = UUID.randomUUID();
            String[] uuids = uuid.toString().split("-");

            String uniqueName = uuids[0];

            File saveFile = new File(request.getServletContext().getRealPath(FileDirPath),uniqueName+fileExtension);
            profileImg.transferTo(saveFile);
            String[] imgPath = String.valueOf(saveFile).split("web");

            System.out.println("imgPath : "+imgPath);
            origin.setProfilePhoto(FileDirPath+uniqueName+fileExtension);
        }



        userService.updateInfo(origin);

        return "redirect:/user/userInfo";
    }


}
