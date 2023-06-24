package com.inzent.injoy.controller;

import com.inzent.injoy.model.BoardCommentDTO;
import com.inzent.injoy.model.CalCommentDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
import com.inzent.injoy.service.CalendarCommentService;
import com.inzent.injoy.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/cComment")
public class CalendarCommentController {

    private UserService userService;
    private CalendarCommentService calendarCommentService;

    public CalendarCommentController(UserService userService, CalendarCommentService calendarCommentService) {
        this.userService = userService;
        this.calendarCommentService = calendarCommentService;
    }
    @PostMapping("/insert")
    public String insert(@AuthenticationPrincipal UserCustomDetails login, CalCommentDTO calCommentDTO){
        UserDTO userDTO = login.getUserDTO();
        String username = userDTO.getName();

        calCommentDTO.setCalComUserId(login.getUserDTO().getId());

        String nowStr = Timestamp.valueOf(LocalDateTime.now()).toString();
        String now = nowStr.substring(0, nowStr.length()-11);
        calCommentDTO.setCalComRegisterDateStr(now);

        calCommentDTO.setCalComUsername(username);
        calCommentDTO.setProfilePhoto(userDTO.getProfilePhoto());

        calendarCommentService.insert(calCommentDTO);

        return "redirect:/project/" + calCommentDTO.getCalComProjectId();
    }

    @GetMapping("/showAll")
    @ResponseBody
    public List<CalCommentDTO> showAll(int calendarId, int projectId){
        HashMap<String, Object> map = new HashMap<>();

        map.put("calendarId", calendarId);
        map.put("projectId",projectId);
        return calendarCommentService.selectAllComment(map);
    }


    @PostMapping("/update")
    public String update(CalCommentDTO calCommentDTO){
        CalCommentDTO calComment = calendarCommentService.selectOne(calCommentDTO.getCalCommentId());
        calComment.setCalComContent(calCommentDTO.getCalComContent());
        calendarCommentService.updateHome(calComment);
        return "redirect:/project/" + calComment.getCalComProjectId();

    }

    @PostMapping("/updateText")
    public String updateText(CalCommentDTO calCommentDTO){
        CalCommentDTO calComment = calendarCommentService.selectOne(calCommentDTO.getCalCommentId());
        calComment.setCalComContent(calCommentDTO.getCalComContent());
        calendarCommentService.updateHome(calComment);
        return "redirect:/project/myComment";

    }

    @GetMapping("/delete")
    public String delete(int calCommentId){
        CalCommentDTO calCommentDTO = calendarCommentService.selectOne(calCommentId);
        calendarCommentService.delete(calCommentId);
        return "redirect:/project/" + calCommentDTO.getCalComProjectId();
    }
}
