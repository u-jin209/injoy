package com.inzent.injoy.controller;
import com.inzent.injoy.model.BoardDTO;
import com.inzent.injoy.model.TaskCommentDTO;
import com.inzent.injoy.model.TaskDTO;
import com.inzent.injoy.service.*;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.BoardService;
import com.inzent.injoy.service.UserService;
import com.inzent.injoy.service.ProjectMemberService;
import com.inzent.injoy.service.ProjectService;


import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;


@Controller
public class HomeController {
    private final ProjectService projectService;
    private final ProjectMemberService memberService;
    private UserService userService;
    private BoardService boardService;

    private TaskService taskService;
    private TaskCommentService taskCommentService;

    public HomeController(ProjectService projectService, ProjectMemberService memberService,
                          UserService userService, BoardService boardService, TaskService taskService, TaskCommentService taskCommentService)
    {
        this.projectService = projectService;
        this.memberService =  memberService;
        this.userService = userService;
        this.boardService = boardService;
        this.taskService = taskService;
        this.taskCommentService = taskCommentService;
    }

    @GetMapping("/")
    public String test( ){
        return "/index";
    }

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        response.sendRedirect("/project/myProject");
    }

    @GetMapping("/imgTest")
    public String imgTest(Model model){

        return "user/imgTest";
    }




    @GetMapping("/project/{projectId}")
    public String showProject(Model model , @PathVariable int projectId, @AuthenticationPrincipal UserCustomDetails login) {

        List<BoardDTO> boardList = boardService.selectAll(projectId);
        model.addAttribute("boardList", boardList);

        List<TaskDTO> taskList = taskService.selectAll(projectId);
        model.addAttribute("taskList", taskList);
        List<TaskDTO> allList = taskService.viewAll(projectId);
        model.addAttribute("allList", allList);

        Map<String, Object> map = new HashMap<>();
        map.put("userId", login.getUserDTO().getId());
        map.put("projectId" , projectId);


//      <  addMember에 들어가는 파라미터값들  >
        model.addAttribute("project", projectService.selectProject(map));
        model.addAttribute("memberList", memberService.selectMember(projectId));
        model.addAttribute("waitList", memberService.selectWaitMember(projectId));
        model.addAttribute("inviteList", memberService.selectInviteMember(projectId));



        model.addAttribute("logIn" , memberService.authority(map));
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


