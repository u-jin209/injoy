package com.inzent.injoy.controller;


import com.inzent.injoy.model.UserDTO;
import com.inzent.injoy.service.ProjectService;
import com.inzent.injoy.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/project/")
public class ProjectController {
    private ProjectService projectService;
    private UserService userService;

    public ProjectController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("addMember")
    public String addMember(Model model){
        List<UserDTO> userList = userService.selectAll();
        model.addAttribute("users", userList);
        return "addMember";
    }


}
