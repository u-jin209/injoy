package com.inzent.injoy.controller;


import com.inzent.injoy.model.UserDTO;
import com.inzent.injoy.service.ProjectService;
import com.inzent.injoy.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/project")
public class ProjectController {

    private UserService userService;

    public ProjectController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("addMember")
    public String addMember(Model model){

        return "/project/addMember";
    }

    @GetMapping("newProject")
    public String newProject(Model model){

        return "/project/newProject";
    }
    @GetMapping("newProjectMain")
    public String newProjectMain(Model model){

        return "/project/newProjectMain";
    }
    @GetMapping("myProject")
    public String myProject(Model model){

        return "/project/myProject";
    }


}
