package com.inzent.injoy.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class CalCommentDTO {
    private int calCommentId;
    private int calComProjectId;
    private int calComCalId;
    private int calComUserId;
    private String calComContent;
    private Timestamp calComRegisterDate;
    private String calComUsername;
    private String calComRegisterDateStr;
}
