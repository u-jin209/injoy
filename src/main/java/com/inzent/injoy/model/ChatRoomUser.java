package com.inzent.injoy.model;

import lombok.Data;

@Data
public class ChatRoomUser {
    private int chatRoomUserId;
    private String username;
    private String name;
    private int chatRoomId;

}
