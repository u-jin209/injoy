package com.inzent.injoy.controller;
import com.inzent.injoy.model.BoardDTO;
import com.inzent.injoy.service.BoardService;
import com.inzent.injoy.service.UserService;
import com.inzent.injoy.service.ProjectMemberService;
import com.inzent.injoy.service.ProjectService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@Controller
public class HomeController {
    private final ProjectService projectService;
    private final ProjectMemberService memberService;
    private UserService userService;
    private BoardService boardService;
    public HomeController(ProjectService projectService, ProjectMemberService memberService,
                          UserService userService, BoardService boardService)
    {
        this.projectService = projectService;
        this.memberService =  memberService;
        this.userService = userService;
        this.boardService = boardService;
    }



    @GetMapping("/")
    public String test() {
        return "test";

    }

    @GetMapping("/project/{projectId}")
    public String showProject(Model model , @PathVariable int projectId) {

        List<BoardDTO> boardList = boardService.selectAll(1);
        model.addAttribute("boardList", boardList);
        return "project/mainProject";


//      <  addMember에 들어가는 파라미터값들  >
        model.addAttribute("projectList", projectService.selectProject(projectId));
        model.addAttribute("memberList", memberService.selectMember(projectId));
        model.addAttribute("waitList", memberService.selectWait(projectId));

//      < /addMember에 들어가는 파라미터값들  >
    }

}


