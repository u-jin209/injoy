package com.inzent.injoy.controller;

import com.inzent.injoy.model.BoardDTO;
import com.inzent.injoy.model.ProjectDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.BoardService;
import com.inzent.injoy.service.ProjectService;
import com.inzent.injoy.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/board")
public class BoardController {

    private UserService userService;
    private BoardService boardService;

    public BoardController(UserService userService, BoardService boardService) {
        this.userService = userService;
        this.boardService = boardService;
    }

    @PostMapping("write")
    @ResponseBody
    public String writeBoard(@AuthenticationPrincipal UserCustomDetails login, BoardDTO boardDTO){
        boardDTO.setBoardWriterId(login.getUserDTO().getId());
        if (boardDTO.getBTitle().isEmpty()){
            return "error";
        } else {
            boardService.insert(boardDTO);
            return "success";
        }
    }

    @PostMapping("deleteBoard")
    public String deleteBoard(int boardId){
        BoardDTO boardDTO = boardService.selectOne(boardId);

        boardService.deleteBoard(boardId);
        return "redirect:/project/" + boardDTO.getProjectId();

    }

}
