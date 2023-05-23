package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class TaskCommentDTO {
    private int tCommentId;
    private int projectId;
    private int taskId;
    private int authorUserId;
    private Date crtDate;
    private Date mdfDate;
    private String tComment;


//    user 내용

    private String name;
    private String profilePhoto;
}
