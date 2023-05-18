package com.inzent.injoy.controller;

import com.inzent.injoy.model.ChatDTO;
import com.inzent.injoy.model.ChatRoomUserDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
import com.inzent.injoy.service.ChatRoomService;
import com.inzent.injoy.service.ChatRoomUserService;
import com.inzent.injoy.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Controller
public class ChatController {
    private final SimpMessageSendingOperations template;
    private final ChatRoomService chatRoomService;
    private final ChatRoomUserService chatRoomUserService;
    private final ChatService chatService;

    @MessageMapping("/chat/enterUser")
    public void enterUser(@Payload ChatDTO chatDTO, SimpMessageHeaderAccessor headerAccessor,@AuthenticationPrincipal UserCustomDetails login) {
        //채팅방 유저 등록
        UserDTO logIn = login.getUserDTO();
        LocalDateTime now = LocalDateTime.now();
        if (chatRoomUserService.selectChatRoomUserByUserNameAndChatRoomId(logIn.getUsername(), chatDTO.getChatRoomId())==null) {
            ChatRoomUserDTO chatRoomUserDTO = new ChatRoomUserDTO();
            chatRoomUserDTO.setChatRoomId(chatDTO.getChatRoomId());
            chatRoomUserDTO.setUsername(logIn.getUsername());
            chatRoomUserDTO.setName(logIn.getName());
            chatRoomUserService.insert(chatRoomUserDTO);
            ChatDTO newChatDTO = new ChatDTO();
            newChatDTO.setType(chatDTO.getType());
            newChatDTO.setSender(logIn.getName());
            newChatDTO.setChatRoomId(chatDTO.getChatRoomId());
            newChatDTO.setUserId(logIn.getId());
            newChatDTO.setTime(Timestamp.valueOf(now));
            chatService.insert(chatDTO);
        }
    }

    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload ChatDTO chatDTO, @AuthenticationPrincipal UserCustomDetails login) {
        UserDTO logIn = login.getUserDTO();
        LocalDateTime now = LocalDateTime.now();
        ChatDTO newChatDTO = new ChatDTO();
        newChatDTO.setType(chatDTO.getType());
        newChatDTO.setSender(logIn.getName());
        newChatDTO.setMessage(chatDTO.getMessage());
        newChatDTO.setTime(Timestamp.valueOf(now));
        newChatDTO.setChatRoomId(chatDTO.getChatRoomId());
        newChatDTO.setUserId(logIn.getId());
        newChatDTO.setName(logIn.getName());
        newChatDTO.setProfilePhoto(logIn.getProfilePhoto());
        template.convertAndSend("/sub/chat/room/" + chatDTO.getChatRoomId(), newChatDTO);
        chatService.insert(newChatDTO);
    }
}
