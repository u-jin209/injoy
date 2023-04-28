package com.inzent.injoy.controller;

import com.inzent.injoy.model.BoardDTO;
import com.inzent.injoy.model.TaskDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.BoardService;
import com.inzent.injoy.service.TaskService;
import com.inzent.injoy.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/task")
public class TaskController {

    private UserService userService;
    private TaskService taskService;

    public TaskController(UserService userService, TaskService taskService) {
        this.userService = userService;
        this.taskService = taskService;
    }

    @PostMapping("write")
    public String writeTask(@AuthenticationPrincipal UserCustomDetails login, TaskDTO taskDTO){
        taskDTO.setAuthorUserId(login.getUserDTO().getId());

        taskService.insert(taskDTO);
        return "/project/projectHome";
    }

    @PostMapping("updateProcess")
    public String updateProcess(@AuthenticationPrincipal UserCustomDetails login, TaskDTO taskDTO){
        System.out.println(taskDTO);
        if (login.getUserDTO().getId() == taskDTO.getAuthorUserId()){
            System.out.println("controller");
            taskService.updateProcess(taskDTO);
            System.out.println("end");
        }

        return "/project/taskPage";
    }

}
