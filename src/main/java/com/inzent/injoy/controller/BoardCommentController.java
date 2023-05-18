package com.inzent.injoy.controller;

import com.inzent.injoy.model.BoardCommentDTO;
import com.inzent.injoy.model.TaskCommentDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.BoardCommentService;
import com.inzent.injoy.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/bComment")
public class BoardCommentController {

    private UserService userService;
    private BoardCommentService boardCommentService;

    public BoardCommentController(UserService userService, BoardCommentService boardCommentService) {
        this.userService = userService;
        this.boardCommentService = boardCommentService;
    }

    @PostMapping("/insert")
    public String insert(@AuthenticationPrincipal UserCustomDetails login, BoardCommentDTO boardCommentDTO){

        boardCommentDTO.setAuthorUserId(login.getUserDTO().getId());
        boardCommentService.insert(boardCommentDTO);

        return "redirect:/project/" + boardCommentDTO.getProjectId();
    }

    @GetMapping("/showAll")
    @ResponseBody
    public List<BoardCommentDTO> showAll(int boardId, int projectId){
        HashMap<String, Object> map = new HashMap<>();

        map.put("boardId", boardId);
        map.put("projectId",projectId);

        return boardCommentService.selectAll(map);
    }


    @PostMapping("/update")
    public String update(BoardCommentDTO boardCommentDTO){
        BoardCommentDTO bComment = boardCommentService.selectOne(boardCommentDTO.getBCommentId());
        bComment.setBComment(boardCommentDTO.getBComment());
        boardCommentService.update(bComment);
        return "redirect:/project/" + bComment.getProjectId();

    }

    @GetMapping("/delete")
    public String delete(int bCommentId){
        BoardCommentDTO boardCommentDTO = boardCommentService.selectOne(bCommentId);
        boardCommentService.delete(bCommentId);
        return "redirect:/project/" + boardCommentDTO.getProjectId();
    }
}
