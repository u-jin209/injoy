package com.inzent.injoy.controller;


import com.inzent.injoy.model.ProjectDTO;
import java.util.UUID;

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
    private ProjectService projectService;

    public ProjectController(UserService userService,ProjectService projectService)
    {
        this.userService = userService;
        this.projectService = projectService;
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

    @PostMapping("insertProject")
    public String insertProject(ProjectDTO projectDTO ){



        projectDTO.setInvitationCode(UUID.randomUUID().toString());
        projectDTO.setCreatorUserId(3);

        projectService.insert(projectDTO);

        return "redirect:/";
    }


}
