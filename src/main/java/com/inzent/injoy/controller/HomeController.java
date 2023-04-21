package com.inzent.injoy.controller;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;


@Controller
public class HomeController {

    @GetMapping("/")
    public String method(Model model) {
        model.addAttribute("tmp","이것은 컨트롤에서부터 왔습니다.");

        return "cherry";
    }

    @GetMapping("/orange")
    public String orange(Model model){

        return "orange";
    }







    @GetMapping("/project")
    public String showProject() {
        return "project/mainProject";

    }


}


