package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class BoardDTO {
    private int boardId;
    private String bTitle;
    private String bContent;
    private int boardWriterId;
    private int projectId;
    private Date entryDate;

    private String name;
    private String profilePhoto;
}
