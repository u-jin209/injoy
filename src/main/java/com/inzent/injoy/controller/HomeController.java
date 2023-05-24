package com.inzent.injoy.controller;
import com.inzent.injoy.model.BoardDTO;
import com.inzent.injoy.model.TaskDTO;
import com.inzent.injoy.service.*;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.BoardService;
import com.inzent.injoy.service.UserService;
import com.inzent.injoy.service.ProjectMemberService;
import com.inzent.injoy.service.ProjectService;

import com.inzent.injoy.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Iterator;


@Controller
public class HomeController {
    private final ProjectService projectService;
    private final ProjectMemberService memberService;
    private UserService userService;
    private BoardService boardService;

    private TaskService taskService;

    public HomeController(ProjectService projectService, ProjectMemberService memberService,
                          UserService userService, BoardService boardService, TaskService taskService)
    {
        this.projectService = projectService;
        this.memberService =  memberService;
        this.userService = userService;
        this.boardService = boardService;
        this.taskService = taskService;
    }

    @GetMapping("/")
    public String test() {

//        return "/user/login";
        return "/project/calendar";
    }

    @GetMapping("/imgTest")
    public String imgTest(Model model){

        return "user/imgTest";
    }



    @GetMapping("/project/{projectId}")
    public String showProject(Model model , @PathVariable int projectId) {

        List<BoardDTO> boardList = boardService.selectAll(projectId);
        model.addAttribute("boardList", boardList);

        List<TaskDTO> taskList = taskService.selectAll(projectId);
        model.addAttribute("taskList", taskList);

//      <  addMember에 들어가는 파라미터값들  >
        model.addAttribute("project", projectService.selectProject(projectId));
        model.addAttribute("memberList", memberService.selectMember(projectId));
        model.addAttribute("waitList", memberService.selectWaitMember(projectId));

//      < /addMember에 들어가는 파라미터값들  >

        return "project/mainProject";

    }


    @GetMapping("/user")
    public @ResponseBody String user(@AuthenticationPrincipal UserCustomDetails principal) {
        System.out.println("Principal : " + principal);
        System.out.println("OAuth2 : "+principal.getUserDTO().getProvider());
        // iterator 순차 출력 해보기
        Iterator<? extends GrantedAuthority> iter = principal.getAuthorities().iterator();
        while (iter.hasNext()) {
            GrantedAuthority auth = iter.next();
            System.out.println(auth.getAuthority());
        }
        return "유저 페이지입니다.";
    }

}


