package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class BoardDTO {
    private int boardId;
    private String title;
    private String content;
    private int boardWriterId;
    private int projectId;
    private int fileId;
    private Date entryDate;

    private String nickname;
}
