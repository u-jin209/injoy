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
    public void enterUser(ChatDTO chatDTO,UserDTO userDTO, SimpMessageHeaderAccessor headerAccessor) {
        //채팅방 유저 등록
        LocalDateTime now = LocalDateTime.now();
        ChatRoomUserDTO newChatRoomUserDTO = chatRoomUserService.selectChatRoomUserByUserNameAndChatRoomId(userDTO.getUsername(), chatDTO.getChatRoomId());

        if (newChatRoomUserDTO==null) {
            ChatRoomUserDTO chatRoomUserDTO = new ChatRoomUserDTO();
            chatRoomUserDTO.setChatRoomId(chatDTO.getChatRoomId());
            chatRoomUserDTO.setUsername(userDTO.getUsername());
            chatRoomUserDTO.setName(userDTO.getName());
            chatRoomUserService.insert(chatRoomUserDTO);
            ChatDTO newChatDTO = new ChatDTO();
            newChatDTO.setType(chatDTO.getType());
            newChatDTO.setSender(userDTO.getName());
            newChatDTO.setChatRoomId(chatDTO.getChatRoomId());
            newChatDTO.setUserId(userDTO.getId());
            newChatDTO.setTime(Timestamp.valueOf(now));
            chatService.insert(chatDTO);
        }
    }

    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload ChatDTO chatDTO,@Payload UserDTO userDTO) {
        LocalDateTime now = LocalDateTime.now();
        ChatDTO newChatDTO = new ChatDTO();
        newChatDTO.setType(chatDTO.getType());
        newChatDTO.setSender(userDTO.getName());
        newChatDTO.setMessage(chatDTO.getMessage());
        newChatDTO.setTime(Timestamp.valueOf(now));
        newChatDTO.setChatRoomId(chatDTO.getChatRoomId());
        newChatDTO.setUserId(userDTO.getId());
        newChatDTO.setName(userDTO.getName());
        newChatDTO.setProfilePhoto(userDTO.getProfilePhoto());
        template.convertAndSend("/sub/chat/room/" + chatDTO.getChatRoomId(), newChatDTO);
        chatService.insert(newChatDTO);
    }
}
