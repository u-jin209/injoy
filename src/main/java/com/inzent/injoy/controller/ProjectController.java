package com.inzent.injoy.controller;


import com.inzent.injoy.model.*;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.inzent.injoy.service.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
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
    private FolderService folderService;

    public ProjectController(UserService userService, ProjectService projectService, ProjectMemberService projectMemberService,
                             OrganService organService, FolderService folderService) {
        this.userService = userService;
        this.projectService = projectService;
        this.projectMemberService = projectMemberService;
        this.organService = organService;
        this.folderService = folderService;

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
        model.addAttribute("logIn", userService.selectOne(login.getUserDTO().getId()));
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
    @GetMapping("convert")
    public String convert(Model model) {

        model.addAttribute("organList" ,organService.selectAll());

        return "/project/convert";
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
        model.addAttribute("logIn", userService.selectOne(login.getUserDTO().getId()));
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


        ProjectMemberDTO memberDTO = new ProjectMemberDTO();

        memberDTO.setAuthority("MANAGER");
        memberDTO.setUserId(login.getUserDTO().getId());
        memberDTO.setProjectId(projectDTO.getProjectId());
        projectMemberService.insert(memberDTO);

        FolderDTO folderDTO = new FolderDTO();


        folderDTO.setFolderRoot("/");
        folderDTO.setUserId(login.getUserDTO().getId());
        folderDTO.setProjectId(projectDTO.getProjectId());
        folderService.insert(folderDTO);

        return "redirect:/project/myProject";
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


    @ResponseBody
    @GetMapping("delete")
    public void delete(Integer projectId){

        projectService.delete(projectId);

    }

    @ResponseBody
    @PostMapping("update")
    public void update(String projectName,String explanation, Integer projectId ){

        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setProjectName(projectName);
        projectDTO.setExplanation(explanation);
        projectDTO.setProjectId(projectId);


        projectService.update(projectDTO);

    }


}
