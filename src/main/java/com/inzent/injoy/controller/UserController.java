package com.inzent.injoy.controller;

import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
import com.inzent.injoy.service.EmailService;
import com.inzent.injoy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/user/")
public class UserController {

    private final  UserService userService;

    private final EmailService emailService;

    @Autowired
    public UserController(UserService userService,EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
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
    public String register(UserDTO attempt, Model model) throws Exception {
        if(userService.register(attempt)){
            String code = emailService.sendSimpleMessage(attempt.getUsername());
            model.addAttribute("email", attempt.getUsername());
            model.addAttribute("code", code);
            return "user/emailVerify";
        }else{
            model.addAttribute("script", "<script>swal.fire('이미 해당 email로 가입된 아이디가 존재합니다.')</script>");
            return "user/register";
        }
    }

    @GetMapping("userInfo")
    public String userInfo(@AuthenticationPrincipal UserCustomDetails login, Model model){

        UserDTO user = login.getUserDTO();
        System.out.printf("user"+user);
        model.addAttribute("user",user);


        return "user/userInfo";
    }


    @PostMapping("updateInfo")
    public String updateInfo(@AuthenticationPrincipal UserCustomDetails login,UserDTO userDTO){

        UserDTO origin = login.getUserDTO();
        origin.setName(userDTO.getName());
        origin.setPhoneNumber(userDTO.getPhoneNumber());
        origin.setEmail(userDTO.getEmail());
        origin.setCondition(userDTO.getCondition());


        userService.updateInfo(origin);

        return "redirect:/user/userInfo";
    }
}
