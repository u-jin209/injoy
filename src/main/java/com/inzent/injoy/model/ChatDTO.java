package com.inzent.injoy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {
    private int chatId;
    private String  type;
    private String  chatRoomId;
    private String sender;
    private String message;
    private Timestamp time;
    private int userId;
    private String name;
    private String profilePhoto;
}
