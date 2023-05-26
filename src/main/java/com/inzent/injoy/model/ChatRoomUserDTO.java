package com.inzent.injoy.model;

import lombok.Data;

@Data
public class ChatRoomUserDTO {
    private int chatRoomUserId;
    private String username;
    private String name;
    private String chatRoomId;

    private String profilePhoto;

}
