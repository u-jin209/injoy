package com.inzent.injoy.model;

import lombok.Data;

@Data
public class UserChatInfoDTO {
    private int userChatInfoId;
    private int userId;
    private String chatRoomId;
    private int alarmCount;

}
