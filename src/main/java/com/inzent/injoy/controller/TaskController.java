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
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("mainWrite")
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

    @GetMapping("detailTask")
    @ResponseBody
    public TaskDTO detailTask(int taskId){
        return taskService.selectOne(taskId);
    }

    @PostMapping("updateTitle")
    public String updateTitle(String taskTitle, int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);

        TaskDTO taskDTO1 = taskService.selectOne(taskId);
        System.out.println("taskTitle = " + taskTitle);
        System.out.println("TaskController.updateTitle");
        taskDTO.setTaskTitle(taskTitle);

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
        TaskDTO taskDTO = taskService.selectOne(taskId);

        if (!Objects.equals(startDate, "")){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date(sdf.parse(startDate).getTime());

            taskDTO.setStartDate(date);
        } else {
            taskDTO.setStartDate(null);
        }

        taskService.updateStartDate(taskDTO);
        return "redirect:/project/" + taskDTO.getProjectId();
    }

    @PostMapping("updateEndDate")
    public String updateEndDate(String endDate, int taskId) throws ParseException {
        TaskDTO taskDTO = taskService.selectOne(taskId);

        if (!Objects.equals(endDate, "")){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date(sdf.parse(endDate).getTime());

            taskDTO.setClosingDate(date);
        } else {
            taskDTO.setClosingDate(null);
        }

        taskService.updateEndDate(taskDTO);
        return "redirect:/project/" + taskDTO.getProjectId();
    }

    @GetMapping("search")
    @ResponseBody
    public List<TaskDTO> search(String keyword, int projectId){
        return taskService.findTask(keyword, projectId) ;
    }
}
