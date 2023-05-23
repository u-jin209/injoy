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
}
