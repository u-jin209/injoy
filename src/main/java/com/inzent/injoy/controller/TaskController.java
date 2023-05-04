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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
        System.out.println(taskDTO);
        taskDTO.setAuthorUserId(login.getUserDTO().getId());

        taskService.insert(taskDTO);

        return "redirect:/project/" + taskDTO.getProjectId();
    }

    @PostMapping("taskPageWrite")
    public String writeTaskPage(@AuthenticationPrincipal UserCustomDetails login, TaskDTO taskDTO){
        System.out.println(taskDTO);
        taskDTO.setAuthorUserId(login.getUserDTO().getId());

        taskService.insert(taskDTO);

        return "redirect:/project/" + taskDTO.getProjectId();
    }

    @PostMapping("updateTitle")
    public String updateTitle(String title, int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);
        taskDTO.setTitle(title);

        taskService.updateTitle(taskDTO);

        return "redirect:/project/" + taskDTO.getProjectId();
    }

    @PostMapping("updateProcess")
    public String updateProcess(String process, int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);
        taskDTO.setProcess(process);

        taskService.updateProcess(taskDTO);

        return "redirect:/project/" + taskDTO.getProjectId();
    }


    @PostMapping("updatePriority")
    public String updatePriority(String priority, int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);
        taskDTO.setPriority(priority);

        taskService.updatePriority(taskDTO);

        return "redirect:/project/" + taskDTO.getProjectId();
    }

    @PostMapping("updateStartDate")
    public String updateStartDate(String startDate, int taskId) throws ParseException {
        System.out.println("in");
        TaskDTO taskDTO = taskService.selectOne(taskId);

        if (!Objects.equals(startDate, "")){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date(sdf.parse(startDate).getTime());

            taskDTO.setStartDate(date);
        } else {
            taskDTO.setStartDate(null);
        }

        taskService.updateStartDate(taskDTO);
        System.out.println("out");
        return "redirect:/project/" + taskDTO.getProjectId();
    }
}
