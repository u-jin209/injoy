package com.inzent.injoy.controller;
import com.google.gson.JsonObject;
import com.inzent.injoy.model.ProjectMemberDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
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
public class ProjectMemberController {
    private  ProjectMemberService memberService;
    private  ProjectService projectService;

    public ProjectMemberController(ProjectMemberService memberService, ProjectService projectService){
        this.memberService = memberService;
        this.projectService = projectService;
    }

    @GetMapping("insert/{projectId}/{authority}")
    public String insertMember(@AuthenticationPrincipal UserCustomDetails login,@PathVariable int projectId,
                               @PathVariable String authority ){

        System.out.println("authority : "+ authority);
        ProjectMemberDTO memberDTO = new ProjectMemberDTO();
        memberDTO.setUserId(login.getUserDTO().getId());
        memberDTO.setAuthority(authority);

        if(projectId == -1){

            memberDTO.setProjectId(projectService.selectLastId());
            memberService.insert(memberDTO);


            return "redirect:/project/myProject";
        }
        else if(authority.equals("REQUEST") ) {

            memberDTO.setProjectId(projectId);
            memberService.insert(memberDTO);


            return "redirect:/project/joinProject";
       }
        else{
            memberDTO.setProjectId(projectId);
            memberService.insert(memberDTO);

            return  "redirect:/project/"+projectId;
        }

    }


    @ResponseBody
    @GetMapping("delete")
    public String delete(Model model, int userId){

        memberService.delete(userId);
        return "redirect:history.go(-1)";
    }


    @ResponseBody
    @GetMapping("approve")
    public String approve(Model model, Integer userId , Integer projectId){

        HashMap<String, Object> map = new HashMap<>();

        map.put("userId", userId);
        map.put("projectId",projectId);


        ProjectMemberDTO origin = memberService.selectOne(map);
        origin.setAuthority("MEMBER");
        memberService.update(origin);
        return "redirect:history.go(-1)";
    }

    @ResponseBody
    @GetMapping("search")
    public List<ProjectMemberDTO> searchUser(String keyword, int projectId){

        ProjectMemberDTO memberDTO = new ProjectMemberDTO();
        memberDTO.setKeyword(keyword);
        memberDTO.setProjectId(projectId);

        return memberService.searchUser(memberDTO);
    }

    @ResponseBody
    @GetMapping("selectMember")
    public List<ProjectMemberDTO> selectMember(int projectId){


        return memberService.selectMember(projectId);
    }


}
