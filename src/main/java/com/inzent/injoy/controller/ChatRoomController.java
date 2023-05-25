package com.inzent.injoy.controller;

import com.inzent.injoy.model.*;
import com.inzent.injoy.service.ChatRoomService;
import com.inzent.injoy.service.ChatRoomUserService;
import com.inzent.injoy.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/chatRoom/")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatRoomUserService chatRoomUserService;

    private final ChatService chatService;

    public ChatRoomController(ChatRoomService chatRoomService, ChatRoomUserService chatRoomUserService,ChatService chatService) {
        this.chatRoomService = chatRoomService;
        this.chatRoomUserService = chatRoomUserService;
        this.chatService = chatService;
    }

    @GetMapping("projectChatRoom")
    public String openProjectChatRoom(@RequestParam String chatRoomId, Model model,@AuthenticationPrincipal UserCustomDetails login) {
        UserDTO logIn = login.getUserDTO();
        List<ChatDTO> chatList = chatService.selectChatByChatRoomIdWithProfile(chatRoomId);
        System.out.println("chatList = " + chatList);
        ChatRoomDTO chatRoomDTO = chatRoomService.selectChatRoom(chatRoomId);
        model.addAttribute("chatRoomId", chatRoomId);
        model.addAttribute("chatList", chatList);
        model.addAttribute("roomName", chatRoomDTO.getRoomName());
        model.addAttribute("userCount", chatRoomDTO.getUserCount());
        model.addAttribute("userDTO", logIn);
        return "/chatting/projectChatRoom";
    }

    @PostMapping("checkProjectChatRoom")
    public ResponseEntity<Map<String, Object>> enterProjectChatRoom(@RequestParam int projectId) {
        Map<String, Object> data = new HashMap<>();
        ChatRoomDTO chatRoomDTO = chatRoomService.selectChatRoomByProjectId(projectId);
        if (chatRoomDTO == null) {
            data.put("isRoom", "no");
        } else {
            data.put("isRoom", "yes");
            data.put("url", "/chatRoom/projectChatRoom"); // 열고자 하는 URL
            data.put("top", 100); // 새 창의 위쪽 위치
            data.put("left", 100); // 새 창의 왼쪽 위치
            data.put("width", 420); // 새 창의 너비
            data.put("height", 650); // 새 창의 높이
            data.put("chatRoomId", chatRoomDTO.getChatRoomId());
        }
        return ResponseEntity.ok(data);
    }


    @PostMapping("createProjectChatRoom")
    public ResponseEntity<Map<String, Object>> createProjectChatRoom(@RequestBody ChatRoomDTO chatRoomDTO, @AuthenticationPrincipal UserCustomDetails login) {
        // 받은 데이터 처리
        String roomName = chatRoomDTO.getRoomName();
        int projectId = chatRoomDTO.getProjectId();
        String chatRoomId = UUID.randomUUID().toString();
        UserDTO logIn = login.getUserDTO();
        //채팅방 생성
        ChatRoomDTO newChatRoomDTO = new ChatRoomDTO();
        newChatRoomDTO.setChatRoomId(chatRoomId);
        newChatRoomDTO.setRoomName(roomName);
        newChatRoomDTO.setUserCount(1);
        newChatRoomDTO.setProjectId(projectId);
        newChatRoomDTO.setType("project");
        chatRoomService.insert(newChatRoomDTO);
//        //채팅방 유저 등록
//        ChatRoomUserDTO chatRoomUserDTO = new ChatRoomUserDTO();
//        chatRoomUserDTO.setChatRoomId(chatRoomId);
//        chatRoomUserDTO.setUsername(logIn.getUsername());
//        chatRoomUserDTO.setName(logIn.getName());
//        chatRoomUserService.insert(chatRoomUserDTO);
        // 새 창 정보 생성
        Map<String, Object> windowInfo = new HashMap<>();
        windowInfo.put("url", "/chatRoom/projectChatRoom"); // 열고자 하는 URL
        windowInfo.put("top", 100); // 새 창의 위쪽 위치
        windowInfo.put("left", 100); // 새 창의 왼쪽 위치
        windowInfo.put("width", 420); // 새 창의 너비
        windowInfo.put("height", 650); // 새 창의 높이
        windowInfo.put("chatRoomId", chatRoomId);
        // 응답 반환
        return ResponseEntity.ok(windowInfo);
    }
}
