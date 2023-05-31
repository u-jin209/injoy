package com.inzent.injoy.controller;

import com.inzent.injoy.model.*;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
            Map<String, Object> message = new HashMap<>();

            ChatRoomDTO chatRoomDTO = chatRoomService.selectChatRoom(chatDTO.getChatRoomId());
            int userCount = chatRoomDTO.getUserCount();
            userCount += 1;
            chatRoomDTO.setUserCount(userCount);
            chatRoomService.updateUserCount(chatRoomDTO);
            message.put("userCount", userCount);

            ChatRoomUserDTO chatRoomUserDTO = new ChatRoomUserDTO();
            chatRoomUserDTO.setChatRoomId(chatDTO.getChatRoomId());
            chatRoomUserDTO.setUsername(userDTO.getUsername());
            chatRoomUserDTO.setName(userDTO.getName());
            chatRoomUserDTO.setProfilePhoto(userDTO.getProfilePhoto());
            System.out.println("chatRoomUserDTO = " + chatRoomUserDTO);
            chatRoomUserService.insert(chatRoomUserDTO);
            List<ChatRoomUserDTO> chatRoomUserList = chatRoomUserService.selectChatRoomUserByChatRoomId(chatDTO.getChatRoomId());
            message.put("chatRoomUserList", chatRoomUserList);

            String content=userDTO.getName()+chatDTO.getMessage();
            ChatDTO newChatDTO = new ChatDTO();
            newChatDTO.setMessage(content);
            newChatDTO.setType(chatDTO.getType());
            newChatDTO.setSender(userDTO.getName());
            newChatDTO.setChatRoomId(chatDTO.getChatRoomId());
            newChatDTO.setUserId(userDTO.getId());
            newChatDTO.setTime(Timestamp.valueOf(now));
//            chatService.insert(newChatDTO);
            message.put("newChatDTO", newChatDTO);

            template.convertAndSend("/sub/chat/room/" + chatDTO.getChatRoomId(), message);
        }
    }

    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload ChatDTO chatDTO, @Payload UserDTO userDTO) {
        Map<String, Object> message = new HashMap<>();
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
        message.put("newChatDTO", newChatDTO);
        template.convertAndSend("/sub/chat/room/" + chatDTO.getChatRoomId(), message);
        chatService.insert(newChatDTO);
    }

    @MessageMapping("/chat/leaveUser")
    public void leaveUser(ChatDTO chatDTO,UserDTO userDTO) {
        //채팅방 유저 등록
        LocalDateTime now = LocalDateTime.now();
        Map<String, Object> message = new HashMap<>();
        chatRoomUserService.deleteChatRoomUserByUserNameAndChatRoomId(userDTO.getUsername(), chatDTO.getChatRoomId());
        ChatRoomDTO chatRoomDTO = chatRoomService.selectChatRoom(chatDTO.getChatRoomId());
        int userCount = chatRoomDTO.getUserCount();
        userCount -= 1;
        chatRoomDTO.setUserCount(userCount);
        chatRoomService.updateUserCount(chatRoomDTO);
        message.put("userCount", userCount);

        List<ChatRoomUserDTO> chatRoomUserList = chatRoomUserService.selectChatRoomUserByChatRoomId(chatDTO.getChatRoomId());
        message.put("chatRoomUserList", chatRoomUserList);

        String content=userDTO.getName()+chatDTO.getMessage();
        ChatDTO newChatDTO = new ChatDTO();
        newChatDTO.setMessage(content);
        newChatDTO.setType(chatDTO.getType());
        newChatDTO.setSender(userDTO.getName());
        newChatDTO.setChatRoomId(chatDTO.getChatRoomId());
        newChatDTO.setUserId(userDTO.getId());
        newChatDTO.setTime(Timestamp.valueOf(now));
        chatService.insert(newChatDTO);
        message.put("newChatDTO", newChatDTO);

        message.put("userId", userDTO.getId());

        template.convertAndSend("/sub/chat/room/" + chatDTO.getChatRoomId(), message);
    }
}
