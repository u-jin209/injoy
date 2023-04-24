package com.inzent.injoy.controller;


import com.inzent.injoy.model.ProjectDTO;

import java.util.UUID;

import com.inzent.injoy.model.ProjectMemberDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.ProjectMemberService;
import com.inzent.injoy.service.ProjectService;
import com.inzent.injoy.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/project")
public class ProjectController {

    private  final UserService userService;
    private  final ProjectService projectService;
    private final ProjectMemberService projectMemberService;


    public ProjectController(UserService userService, ProjectService projectService,ProjectMemberService projectMemberService) {
        this.userService = userService;
        this.projectService = projectService;
        this.projectMemberService = projectMemberService;
    }

    @GetMapping("addMember")
    public String addMember(Model model) {

        return "/project/addMember";
    }


    @GetMapping("joinProject")
    public String joinProject(Model model) {

        return "/project/joinProject";
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
        projectDTO.setCreatorUserId(login.getUserDTO().getId());

        projectService.insert(projectDTO);




        return "redirect:/member/insert/-1";
    }


}
