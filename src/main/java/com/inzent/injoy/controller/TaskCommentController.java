package com.inzent.injoy.controller;

import com.inzent.injoy.model.BoardCommentDTO;
import com.inzent.injoy.model.TaskCommentDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.TaskCommentService;
import com.inzent.injoy.service.TaskService;
import com.inzent.injoy.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

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

        taskCommentDTO.setAuthorUserId(login.getUserDTO().getId());
        taskCommentService.insert(taskCommentDTO);

        return "redirect:/project/" + taskCommentDTO.getProjectId();
    }

    @GetMapping("/showAll")
    @ResponseBody
    public List<TaskCommentDTO> showAll(int taskId, int projectId){
        HashMap<String, Object> map = new HashMap<>();

        map.put("taskId", taskId);
        map.put("projectId",projectId);

        return taskCommentService.selectAll(map);
    }


    @PostMapping("/update")
    public String update(TaskCommentDTO taskCommentDTO){
        TaskCommentDTO tComment = taskCommentService.selectOne(taskCommentDTO.getTCommentId());
        tComment.setTComment(taskCommentDTO.getTComment());
        taskCommentService.update(tComment);
        return "redirect:/project/" + tComment.getProjectId();

    }

    @PostMapping("/updateText")
    public String updateText(TaskCommentDTO taskCommentDTO){
        TaskCommentDTO tComment = taskCommentService.selectOne(taskCommentDTO.getTCommentId());
        tComment.setTComment(taskCommentDTO.getTComment());
        taskCommentService.update(tComment);
        return "redirect:/project/myComment";

    }

    @GetMapping("/delete")
    public String delete(int tCommentId){
        TaskCommentDTO taskCommentDTO = taskCommentService.selectOne(tCommentId);
        taskCommentService.delete(tCommentId);
        return "redirect:/project/" + taskCommentDTO.getProjectId();
    }
}
