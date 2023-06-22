package com.inzent.injoy.controller;
import com.google.gson.JsonObject;
import com.inzent.injoy.model.*;
import com.inzent.injoy.service.ProjectMemberService;
import com.inzent.injoy.service.ProjectService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.ListResourceBundle;
import java.util.Map;

@Controller
@RequestMapping("/member/")
public class  ProjectMemberController {
    private  ProjectMemberService memberService;
    private  ProjectService projectService;

    public ProjectMemberController(ProjectMemberService memberService, ProjectService projectService){
        this.memberService = memberService;
        this.projectService = projectService;
    }

    @GetMapping("insert/{projectId}/{authority}")
    public String insertMember(@AuthenticationPrincipal UserCustomDetails login,@PathVariable int projectId,
                               @PathVariable String authority , Integer userId){

        ProjectMemberDTO memberDTO = new ProjectMemberDTO();

        memberDTO.setAuthority(authority);

        if(authority.equals("REQUEST") ) {
            memberDTO.setUserId(login.getUserDTO().getId());
            memberDTO.setProjectId(projectId);
            memberService.insert(memberDTO);


            return "redirect:/project/joinProject";
       }
        else{
            memberDTO.setProjectId(projectId);
            memberDTO.setUserId(userId);
            memberService.insert(memberDTO);

            return  "redirect:/project/"+projectId;
        }

    }


    @ResponseBody
    @GetMapping("delete")
    public String delete(Model model, Integer userId , Integer projectId){

        HashMap<String, Object> map = new HashMap<>();

        map.put("userId", userId);
        map.put("projectId",projectId);
        memberService.delete(map);
        return "redirect:history.go(-1)";
    }


    @ResponseBody
    @GetMapping("approve")
    public String approve(Model model, Integer userId , Integer projectId){


        HashMap<String, Object> map = new HashMap<>();

        map.put("userId", userId);
        map.put("projectId",projectId);
        map.put("authority","MEMBER" );



        memberService.update(map);
        return "redirect:history.go(-1)";
    }

    @ResponseBody
    @GetMapping("searchUser")
    public List<ProjectMemberDTO> searchUser(String keyword, int projectId){

        ProjectMemberDTO memberDTO = new ProjectMemberDTO();
        memberDTO.setKeyword(keyword);
        memberDTO.setProjectId(projectId);

        //System.out.println("memberService.searchUser(memberDTO) = " + memberService.searchUser(memberDTO));

        return memberService.searchUser(memberDTO);
    }

    @ResponseBody
    @GetMapping("searchMember")
    public List<ProjectMemberDTO> searchMember(String keyword, Integer projectId){

        ProjectMemberDTO memberDTO = new ProjectMemberDTO();
        memberDTO.setKeyword(keyword);
        memberDTO.setProjectId(projectId);

        return memberService.searchMember(memberDTO);
    }

    @ResponseBody
    @GetMapping("selectMember")
    public List<ProjectMemberDTO> selectMember(Integer projectId){


        return memberService.selectMember(projectId);
    }


    @ResponseBody
    @GetMapping("inviteList")
    public List<ProjectMemberDTO> waitList(int projectId) {

        return memberService.selectInviteMember(projectId);
    }
    @ResponseBody
    @GetMapping("selectWaitMember")
    public List<ProjectMemberDTO> selectWaitMember(int projectId) {

        return memberService.selectWaitMember(projectId);
    }





}
