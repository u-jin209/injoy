package com.inzent.injoy.controller;
import com.inzent.injoy.model.BoardDTO;
import com.inzent.injoy.service.BoardService;
import com.inzent.injoy.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.List;


@Controller
public class HomeController {
    private UserService userService;
    private BoardService boardService;

    public HomeController(UserService userService, BoardService boardService) {
        this.userService = userService;
        this.boardService = boardService;
    }

    @GetMapping("/")
    public String test() {
        return "test";

    }

    @GetMapping("/project")
    public String showProject(Model model) {
        List<BoardDTO> boardList = boardService.selectAll(1);
        model.addAttribute("boardList", boardList);
        return "project/mainProject";

    }


}


