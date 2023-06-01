package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class TaskDTO {
    private int taskId;
    private int authorUserId;
    private Date crtDate;
    private Date mdfDate;
    private String taskTitle;
    private String taskContent;
    private int projectId;
    private Date startDate;
    private Date closingDate;
    private int progress;
    private String process;
    private String priority;

    //user
    private String name;
    private String profilePhoto;


//    BoardDTO 값
    private int boardId;
    private int boardWriterId;
    private String bTitle;
    private String bContent;
//    private int bFileId;
    private Date entryDate;

    private String projectName;
}
