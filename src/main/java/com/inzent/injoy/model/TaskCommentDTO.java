package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class TaskCommentDTO {
    private int projectId;
    private int taskId;
    private int authUserId;
    private Date crtDate;
    private Date mdfDate;
    private String comment;
}
