package com.inzent.injoy.controller;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;


@Controller
public class HomeController {

    @GetMapping("/")
    public String test() {
        return "index";

    }

    @GetMapping("/project")
    public String showProject() {
        return "project/mainProject";

    }


}


