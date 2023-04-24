package com.inzent.injoy.controller;

import com.inzent.injoy.model.ProjectMemberDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.ProjectMemberService;
import com.inzent.injoy.service.ProjectService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequestMapping("/member/")
public class ProjectMemberController {
    private  final ProjectMemberService memberService;
    private final ProjectService projectService;

    public ProjectMemberController(ProjectMemberService memberService, ProjectService projectService){
        this.memberService = memberService;
        this.projectService = projectService;
    }

    @GetMapping("insert/{projectId}")
    public String insertMember(@AuthenticationPrincipal UserCustomDetails login,@PathVariable int projectId ){

        ProjectMemberDTO memberDTO = new ProjectMemberDTO();

        if(projectId == -1){

            memberDTO.setUserId(login.getUserDTO().getId());
            memberDTO.setAuthority("MANAGER");
            memberDTO.setProjectId(projectService.selectLastId());

            memberService.insert(memberDTO);


            return "redirect:/project/myProject";
        }else {


            memberDTO.setUserId(login.getUserDTO().getId());
            memberDTO.setAuthority("REQUEST");
            memberDTO.setProjectId(projectId);

            memberService.insert(memberDTO);


            return "redirect:history.go(-1)";
        }
    }
}
