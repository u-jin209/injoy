package com.inzent.injoy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/chatRoom/")
public class ChatRoomController {

    @GetMapping("projectChatRoom")
    public String openProjectChatRoom(){
        return "/chatting/projectChatRoom";
    }

}
