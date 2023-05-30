package com.inzent.injoy.model;

import lombok.Builder;
import lombok.Data;

@Data
public class ChatRoomDTO {
    private String  chatRoomId;
    private String roomName;
    private int userCount;
    private int projectId;

    private String type;
    private String host;
    private String guest;
}
