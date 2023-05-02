package com.inzent.injoy.controller;


import com.inzent.injoy.model.ProjectDTO;

import java.util.HashMap;
import java.util.List;
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

    private final UserService userService;
    private final ProjectService projectService;
    private final ProjectMemberService projectMemberService;


    public ProjectController(UserService userService, ProjectService projectService, ProjectMemberService projectMemberService) {
        this.userService = userService;
        this.projectService = projectService;
        this.projectMemberService = projectMemberService;
    }

    @GetMapping("addMember")
    public String addMember() {

        return "/project/addMember";
    }

    @GetMapping("team")
    public String team() {

        return "/project/team";
    }

    @GetMapping("joinProject")
    public String joinProject(@AuthenticationPrincipal UserCustomDetails login, Model model) {
        model.addAttribute("waitList", projectService.selectWaitProject(login.getUserDTO().getId()));
        return "/project/joinProject";
    }


    @ResponseBody
    @GetMapping("waitList")
    public List<ProjectDTO> waitList(@AuthenticationPrincipal UserCustomDetails login) {


        return projectService.selectWaitProject(login.getUserDTO().getId());
    }

    @GetMapping("newProject")
    public String newProject() {

        return "/project/newProject";
    }

    @GetMapping("newProjectMain")
    public String newProjectMain() {

        return "/project/newProjectMain";
    }

    @GetMapping("myProject")

    public String myProject(@AuthenticationPrincipal UserCustomDetails login, Model model) {

        if (login == null) {


            return "/user/logIn";
        }

        model.addAttribute("projectList", projectService.selectAll(login.getUserDTO().getId()));

        return "/project/myProject";
    }

    @PostMapping("insertProject")
    public String insertProject(@AuthenticationPrincipal UserCustomDetails login, ProjectDTO projectDTO) {


        projectDTO.setInvitationCode(UUID.randomUUID().toString());
        projectDTO.setCreatorUserId(login.getUserDTO().getId());

        projectService.insert(projectDTO);


        return "redirect:/member/insert/-1";
    }

    @ResponseBody
    @GetMapping("search")
    public List<ProjectDTO> searchProject(@AuthenticationPrincipal UserCustomDetails login, String keyword) {

        HashMap<String, Object> map = new HashMap<>();

        map.put("userId", login.getUserDTO().getId());
        map.put("keyword", keyword);

        return projectService.searchProject(map);
    }

    @ResponseBody
    @GetMapping("inviteCode")
    public ProjectDTO searchInviteCode(@AuthenticationPrincipal UserCustomDetails login, String keyword) {
        HashMap<String, Object> map = new HashMap<>();

        map.put("userId", login.getUserDTO().getId());
        map.put("keyword", keyword);
        System.out.println("==================================================");
        System.out.checkError();
        System.out.println("ProjectController.searchInviteCode >> " + keyword);
        System.out.println("ProjectController.searchInviteCode >> " + login.getUserDTO().getId());


        System.out.println(" projectService.searchInviteCode(map) : " + projectService.searchInviteCode(map));

        return projectService.searchInviteCode(map);
    }

}
