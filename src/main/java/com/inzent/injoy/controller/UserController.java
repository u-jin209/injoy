package com.inzent.injoy.controller;

import com.inzent.injoy.model.UserDTO;
import com.inzent.injoy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/user/")
public class UserController {

    private UserService userService;

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
            return "index";
        }
    }
    @GetMapping("logInPage")
    public String moveLogInPage(){
        return "user/logIn";
    }
    @GetMapping("register")
    public String showRegister() {
        System.out.println(userService.selectAll());
        return "user/register";
    }

    @PostMapping("register")
    public String register(UserDTO attempt, Model model) {
        if(userService.register(attempt)){
            return "redirect:/";
        }else{
            model.addAttribute("message", "중복된 아이디로 가입하실  수 없습니다.");
            return "user/register";
        }
    }

    @GetMapping("userInfo")
    public String userInfo(){
        return "user/userInfo";
    }
}
