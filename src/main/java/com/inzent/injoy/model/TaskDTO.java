package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class TaskDTO {
    private int taskId;
    private int authorUserId;
    private Date crtDate;
    private Date mdfDate;
    private String title;
    private String content;
    private int projectId;
    private Date startDate;
    private Date closingDate;
    private int fileId;
    private int progress;
    private String process;
    private String priority;
    private int managerId;

}
