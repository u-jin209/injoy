package com.inzent.injoy.controller;

import com.inzent.injoy.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


import java.util.*;

@RequiredArgsConstructor
@Controller
public class ConnectionController {
    private final SimpMessageSendingOperations template;

    // 로그인한 유저 리스트를 저장할 Set 컬렉션
    private Set<Integer> logInUsers = new HashSet<>();


    @MessageMapping("/connect/enterUser")
    public void enterUser(UserDTO userDTO,SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("id", userDTO.getId());
        logInUsers.add(userDTO.getId());

        template.convertAndSend("/sub/connect", logInUsers);

    }
    @MessageMapping("/connect/leaveUser")
    public void leaveUser(UserDTO userDTO) {

        logInUsers.remove(userDTO.getId());

        template.convertAndSend("/sub/connect", logInUsers);
    }

    @EventListener
    public void webSocketDisconnectListener(SessionDisconnectEvent event) {

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // stomp 세션에 있던 uuid 와 roomId 를 확인해서 채팅방 유저 리스트와 room 에서 해당 유저를 삭제
        Integer id = (Integer) headerAccessor.getSessionAttributes().get("id");


        // 채팅방 유저 -1
        logInUsers.remove(id);

        template.convertAndSend("/sub/connect", logInUsers);

    }


}
