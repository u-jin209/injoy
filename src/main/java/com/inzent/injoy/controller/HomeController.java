package com.inzent.injoy.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

    @GetMapping("/")
    public String test() {
        return "test";

    }

    @GetMapping("/project")
    public String showProject() {
        return "project/mainPage";

    }

    @GetMapping("/kanbanBoard")
    public String showKanban() {
        return "project/kanban";

    }
}


