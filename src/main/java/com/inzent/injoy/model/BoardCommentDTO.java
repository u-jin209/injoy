package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class BoardCommentDTO {
    private int bCommentId;
    private int projectId;
    private int boardId;
    private int authorUserId;
    private Date crtDate;
    private Date mdfDate;
    private String bComment;


//    user 내용

    private String name;
    private String profilePhoto;

    private int tCommentId;
    private int projectTaskId;
    private int taskId;
    private int projectAuthorUserId;
    private Date projectCrtDate;
    private Date projectMdfDate;
    private String tComment;

    private String projectName;
}
