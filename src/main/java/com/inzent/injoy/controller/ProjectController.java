package com.inzent.injoy.controller;


import com.inzent.injoy.model.OrganDTO;
import com.inzent.injoy.model.ProjectDTO;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.inzent.injoy.model.ProjectMemberDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.OrganService;
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

    private final OrganService organService;

    public ProjectController(UserService userService, ProjectService projectService, ProjectMemberService projectMemberService,
                             OrganService organService) {
        this.userService = userService;
        this.projectService = projectService;
        this.projectMemberService = projectMemberService;
        this.organService = organService;


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
    public String newProject(Model model) {

        model.addAttribute("organList" ,organService.selectAll());

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
        model.addAttribute("invite" , projectMemberService.confirmInvite(login.getUserDTO().getId()));



        return "/project/myProject";
    }
    @ResponseBody
    @GetMapping("inviteList")
    public List<ProjectDTO> selectMember(@AuthenticationPrincipal UserCustomDetails login){


        return projectMemberService.confirmInvite(login.getUserDTO().getId());
    }


    @ResponseBody
    @GetMapping("projectList")
    public List<ProjectDTO> selectProject(@AuthenticationPrincipal UserCustomDetails login){


        return  projectService.selectAll(login.getUserDTO().getId());
    }


    @PostMapping("insertProject")
    public String insertProject(@AuthenticationPrincipal UserCustomDetails login, ProjectDTO projectDTO) {


        projectDTO.setInvitationCode(UUID.randomUUID().toString());
        projectDTO.setCreatorUserId(login.getUserDTO().getId());

        projectService.insert(projectDTO);


        return "redirect:/member/insert/-1/MANAGER";
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

        return projectService.searchInviteCode(map);
    }


    @PostMapping("checkDomain")
    @ResponseBody
    public int checkDomain(String keyword, int organId) {



        HashMap<String, Object> map = new HashMap<>();

        map.put("organId",organId );
        map.put("keyword", keyword);
        int cnt = projectService.checkDomain(map);
        return cnt;

    }

    @ResponseBody
    @PostMapping("checkName")
    public int checkName(String keyword, int organId) {

        HashMap<String, Object> map = new HashMap<>();

        map.put("organId",organId );
        map.put("keyword", keyword);
        int cnt = projectService.checkName(map);
        return cnt;

    }

}
