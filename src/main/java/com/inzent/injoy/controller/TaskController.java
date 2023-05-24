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
import java.time.LocalDateTime;
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
    @ResponseBody
    public String writeTask(@AuthenticationPrincipal UserCustomDetails login, TaskDTO taskDTO){
        String result1;
        taskDTO.setAuthorUserId(login.getUserDTO().getId());

        if (taskDTO.getTaskTitle().isEmpty()){
            result1 = "error";
        } else {
            if (Objects.equals(taskDTO.getClosingDate(), new Date(0))) {
                taskDTO.setClosingDate(null);
            }

            if (Objects.equals(taskDTO.getStartDate(), new Date(0))) {
                taskDTO.setStartDate(null);
            }

            if (Objects.equals(taskDTO.getPriority(), "")) {
                taskDTO.setPriority(null);
            }

            taskService.insert(taskDTO);
            result1 = "success";
        }

        return result1;

    }

    @PostMapping("taskPageWrite")
    @ResponseBody
    public String writeTaskPage(@AuthenticationPrincipal UserCustomDetails login, TaskDTO taskDTO){
        String result;
        taskDTO.setAuthorUserId(login.getUserDTO().getId());
        if (taskDTO.getTaskTitle().isEmpty()){
            result = "error";
        } else {

            if (Objects.equals(taskDTO.getClosingDate(), new Date(0))) {
                taskDTO.setClosingDate(null);
            }

            if (Objects.equals(taskDTO.getStartDate(), new Date(0))) {
                taskDTO.setStartDate(null);
            }

            if (Objects.equals(taskDTO.getPriority(), "")) {
                taskDTO.setPriority(null);
            }

            taskService.insert(taskDTO);
            result = "success";

        }

        return result;
    }

    @GetMapping("detailTask")
    @ResponseBody
    public TaskDTO detailTask(int taskId){
        return taskService.selectOne(taskId);
    }

    @PostMapping("updateTask")
    @ResponseBody
    public TaskDTO updateTitle(TaskDTO taskDTO){
        TaskDTO updateTaskDTO = taskService.selectOne(taskDTO.getTaskId());

        updateTaskDTO.setTaskTitle(taskDTO.getTaskTitle());
        updateTaskDTO.setTaskContent(taskDTO.getTaskContent());
        updateTaskDTO.setStartDate(taskDTO.getStartDate());
        updateTaskDTO.setClosingDate(taskDTO.getClosingDate());
        updateTaskDTO.setProcess(taskDTO.getProcess());
        updateTaskDTO.setPriority(taskDTO.getPriority());
        updateTaskDTO.setProgress(taskDTO.getProgress());


        taskService.update(updateTaskDTO);

        return updateTaskDTO;
    }

    @PostMapping("updateTitle")
    public String updateTitle(String taskTitle, int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);

        taskDTO.setTaskTitle(taskTitle);

        taskService.updateTitle(taskDTO);

        return "redirect:/project/" + taskDTO.getProjectId();
    }

    @PostMapping("updateProcess")
    public String updateProcess(String process, int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);
        System.out.println(process);
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

    @PostMapping("updateProgress")
    public String updateProgress(int progress, int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);

        taskDTO.setProgress(progress);

        taskService.updateProgress(taskDTO);

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

    @PostMapping("deleteStartDate")
    public String deleteStartDate(int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);

        taskDTO.setStartDate(null);
        taskService.updateStartDate(taskDTO);
        return  "redirect:/project/" + taskDTO.getProjectId();
    }

    @PostMapping("deleteEndDate")
    public String deleteEndDate(int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);

        taskDTO.setClosingDate(null);
        taskService.updateEndDate(taskDTO);
        return  "redirect:/project/" + taskDTO.getProjectId();
    }

    @PostMapping("deletePriority")
    public String deletePriority(int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);

        taskDTO.setPriority(null);
        taskService.updatePriority(taskDTO);
        return  "redirect:/project/" + taskDTO.getProjectId();
    }

    @GetMapping("search")
    @ResponseBody
    public List<TaskDTO> search(String keyword, int projectId){
        return taskService.findTask(keyword, projectId) ;
    }

    @PostMapping("deleteTask")
    public String deleteTask(int taskId){
        TaskDTO taskDTO = taskService.selectOne(taskId);

        taskService.deleteTask(taskId);
        return  "redirect:/project/" + taskDTO.getProjectId();
    }
}
