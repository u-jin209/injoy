package com.inzent.injoy.controller;
import com.inzent.injoy.model.UserCustomDetails;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Iterator;


@Controller
public class HomeController {

    @GetMapping("/")
    public String test() {
        return "test";

    }

    @GetMapping("/project")
    public String showProject() {
        return "project/mainProject";

    }

    @GetMapping("/user")
    public @ResponseBody String user(@AuthenticationPrincipal UserCustomDetails principal) {
        System.out.println("Principal : " + principal);
        System.out.println("OAuth2 : "+principal.getUserDTO().getProvider());
        // iterator 순차 출력 해보기
        Iterator<? extends GrantedAuthority> iter = principal.getAuthorities().iterator();
        while (iter.hasNext()) {
            GrantedAuthority auth = iter.next();
            System.out.println(auth.getAuthority());
        }

        return "유저 페이지입니다.";
    }


}


