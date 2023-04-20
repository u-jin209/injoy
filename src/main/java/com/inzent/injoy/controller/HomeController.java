package com.inzent.injoy.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

    @GetMapping("/")
    public String test(Model model) {
        model.addAttribute("tmp","이것은 컨트롤에서부터 왔습니다.");

        return "cherry";

    }
}


