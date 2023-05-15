package com.inzent.injoy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {
    public enum MessageType{
        ENTER, TALK, LEAVE;
    }
    private MessageType type;
    private String  chatRoomId;
    private String sender;
    private String message;
    private String time;
}
