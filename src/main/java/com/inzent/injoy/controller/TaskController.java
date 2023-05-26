package com.inzent.injoy.controller;

import com.inzent.injoy.model.*;
import com.inzent.injoy.service.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Controller
@RequestMapping("/task")
public class TaskController {
    @Value("${part.upload.path}")
    private String FileDirPath;
    private UserService userService;
    private TaskService taskService;
    private FolderService folderService;
    private TaskFileService taskFileService;
    private FileService fileService;

    public TaskController(UserService userService, TaskService taskService, FolderService folderService, TaskFileService taskFileService, FileService fileService) {
        this.userService = userService;
        this.taskService = taskService;
        this.folderService = folderService;
        this.taskFileService = taskFileService;
        this.fileService = fileService;
    }

    @PostMapping("mainWrite")
    @ResponseBody
    public String writeTask(@AuthenticationPrincipal UserCustomDetails login, TaskDTO taskDTO, @RequestParam("files") List<MultipartFile> files, HttpServletRequest request) throws IOException {
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

            // 파일 저장하기
            Map<String, Object> map = new HashMap<>();
            map.put("folderRoot", "/");
            map.put("projectId", taskDTO.getProjectId());
            FolderDTO folder = folderService.selectFolder(map);
            int folderId = folder.getFolderId();

            FileDTO fileDTO = new FileDTO();

            for (MultipartFile file : files) {
                String fileRealName = file.getOriginalFilename();

                BigDecimal roundedValue = new BigDecimal(file.getSize() / 1024.0).setScale(2, RoundingMode.HALF_UP);

                fileDTO.setFileSize(roundedValue + "MB");
                fileDTO.setProjectId(taskDTO.getProjectId());
                fileDTO.setUserId(login.getUserDTO().getId());
                fileDTO.setFileName(fileRealName.substring(0, fileRealName.lastIndexOf(".")));
                fileDTO.setFolderId(folderId);

                if (fileRealName.length() != 0) {
                    String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."), fileRealName.length());
                    UUID uuid = UUID.randomUUID();
                    String[] uuids = uuid.toString().split("-");
                    String uniqueName = uuids[0];
                    File saveFile = new File(request.getServletContext().getRealPath(FileDirPath), "uploadFile/" + uniqueName + fileExtension);
                    file.transferTo(saveFile);
                    String[] filePath = String.valueOf(saveFile).split("web");
                    System.out.println("filePath : " + filePath);
                    fileDTO.setFileRealPath(FileDirPath + "uploadFile/");
                    fileDTO.setUniqueName(uniqueName);
                    fileDTO.setFileExtension(fileExtension);
                }

                fileService.insert(fileDTO);

                TaskFileDTO taskFileDTO = new TaskFileDTO();
                taskFileDTO.setFileId(fileDTO.getFileId());
                taskFileDTO.setTaskId(taskDTO.getBoardId());
                taskFileService.insert(taskFileDTO);
            }


            result1 = "success";
        }

        return result1;

    }

    @PostMapping("taskPageWrite")
    @ResponseBody
    public String writeTaskPage(@AuthenticationPrincipal UserCustomDetails login, TaskDTO taskDTO, @RequestParam("files") List<MultipartFile> files, HttpServletRequest request) throws IOException{
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

            // 파일 저장하기
            Map<String, Object> map = new HashMap<>();
            map.put("folderRoot", "/");
            map.put("projectId", taskDTO.getProjectId());
            FolderDTO folder = folderService.selectFolder(map);
            int folderId = folder.getFolderId();

            FileDTO fileDTO = new FileDTO();

            for (MultipartFile file : files) {
                String fileRealName = file.getOriginalFilename();

                BigDecimal roundedValue = new BigDecimal(file.getSize() / 1024.0).setScale(2, RoundingMode.HALF_UP);

                fileDTO.setFileSize(roundedValue + "MB");
                fileDTO.setProjectId(taskDTO.getProjectId());
                fileDTO.setUserId(login.getUserDTO().getId());
                fileDTO.setFileName(fileRealName.substring(0, fileRealName.lastIndexOf(".")));
                fileDTO.setFolderId(folderId);

                if (fileRealName.length() != 0) {
                    String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."), fileRealName.length());
                    UUID uuid = UUID.randomUUID();
                    String[] uuids = uuid.toString().split("-");
                    String uniqueName = uuids[0];
                    File saveFile = new File(request.getServletContext().getRealPath(FileDirPath), "uploadFile/" + uniqueName + fileExtension);
                    file.transferTo(saveFile);
                    String[] filePath = String.valueOf(saveFile).split("web");
                    System.out.println("filePath : " + filePath);
                    fileDTO.setFileRealPath(FileDirPath + "uploadFile/");
                    fileDTO.setUniqueName(uniqueName);
                    fileDTO.setFileExtension(fileExtension);
                }

                fileService.insert(fileDTO);

                TaskFileDTO taskFileDTO = new TaskFileDTO();
                taskFileDTO.setFileId(fileDTO.getFileId());
                taskFileDTO.setTaskId(taskDTO.getBoardId());
                taskFileService.insert(taskFileDTO);
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

    @PostMapping("update")
    public String update(TaskDTO taskDTO){
        TaskDTO updateTaskDTO = taskService.selectOne(taskDTO.getTaskId());

        updateTaskDTO.setTaskTitle(taskDTO.getTaskTitle());
        updateTaskDTO.setTaskContent(taskDTO.getTaskContent());

        taskService.update(updateTaskDTO);

        return "redirect:/project/" + updateTaskDTO.getProjectId();
    }

    @PostMapping("updateTask")
    @ResponseBody
    public TaskDTO updateTask(TaskDTO taskDTO){
        TaskDTO updateTaskDTO = taskService.selectOne(taskDTO.getTaskId());
        if (updateTaskDTO != null) {
            updateTaskDTO.setTaskTitle(taskDTO.getTaskTitle());
            updateTaskDTO.setTaskContent(taskDTO.getTaskContent());
            if (!Objects.equals(taskDTO.getStartDate(), new Date(0))){
                updateTaskDTO.setStartDate(taskDTO.getStartDate());
            }

            if (!Objects.equals(taskDTO.getClosingDate(), new Date(0))){
                updateTaskDTO.setClosingDate(taskDTO.getClosingDate());
            }

            updateTaskDTO.setProcess(taskDTO.getProcess());
            updateTaskDTO.setPriority(taskDTO.getPriority());
            updateTaskDTO.setProgress(taskDTO.getProgress());
        }

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


    @GetMapping("getImg")
    @ResponseBody
    public List<TaskFileDTO> getImg(int taskId){
        List<TaskFileDTO> list = taskFileService.selectAll(taskId);
        return list;
    }

    @ResponseBody
    @GetMapping("downloadFile")
    public FileDTO downloadFile(String fileId) throws IOException {
        FileDTO f = fileService.selectOne(Integer.parseInt(fileId));

        return f;
    }
}
