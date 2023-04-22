package com.inzent.injoy.controller;


import com.inzent.injoy.model.ProjectDTO;

import java.util.UUID;

import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.ProjectService;
import com.inzent.injoy.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/project")
public class ProjectController {

    private UserService userService;
    private ProjectService projectService;

    public ProjectController(UserService userService, ProjectService projectService) {
        this.userService = userService;
        this.projectService = projectService;
    }

    @GetMapping("addMember")
    public String addMember(Model model) {

        return "/project/addMember";
    }
    @GetMapping("joinProject")
    public String joinProject(Model model) {

        return "joinProject";
    }

    @GetMapping("newProject")
    public String newProject(Model model) {

        return "/project/newProject";
    }

    @GetMapping("newProjectMain")
    public String newProjectMain(Model model) {

        return "/project/newProjectMain";
    }

    @GetMapping("myProject")

    public String myProject(@AuthenticationPrincipal UserCustomDetails login, Model model) {

        if (login == null){


            return "/user/logIn";
        }

        model.addAttribute("projectList",projectService.selectAll(login.getUserDTO().getId()));

        return "/project/myProject";
    }

    @PostMapping("insertProject")
    public String insertProject(@AuthenticationPrincipal UserCustomDetails login, ProjectDTO projectDTO) {


        projectDTO.setInvitationCode(UUID.randomUUID().toString());
        System.out.println("id : "+login.getUserDTO().getId());
        System.out.println("username : "+login.getUserDTO().getUsername());
        System.out.println("id : "+login.getUserDTO());
        projectDTO.setCreatorUserId(login.getUserDTO().getId());

        projectService.insert(projectDTO);

        return "redirect:/project/myProject";
    }


}
