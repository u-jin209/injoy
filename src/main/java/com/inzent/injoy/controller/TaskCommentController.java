package com.inzent.injoy.controller;

import com.inzent.injoy.model.TaskCommentDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.TaskCommentService;
import com.inzent.injoy.service.TaskService;
import com.inzent.injoy.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tComment")
public class TaskCommentController {

    private UserService userService;
    private TaskCommentService taskCommentService;

    public TaskCommentController(UserService userService, TaskCommentService taskCommentService) {
        this.userService = userService;
        this.taskCommentService = taskCommentService;
    }

    @PostMapping("/insert")
    public String insert(@AuthenticationPrincipal UserCustomDetails login, TaskCommentDTO taskCommentDTO){

        taskCommentDTO.setAuthUserId(login.getUserDTO().getId());
        taskCommentService.insert(taskCommentDTO);

        return "redirect:/project/" + taskCommentDTO.getProjectId();
    }
}
