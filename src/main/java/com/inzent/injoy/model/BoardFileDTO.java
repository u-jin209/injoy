package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class BoardFileDTO {
    private int bFileId;
    private int boardId;
    private int fileId;

    // FileDTO 값
    private int folderId;
    private String fileName;
    private String fileRealPath;
    private String fileSize;
    private String uniqueName;
    private String fileExtension;
    private Date crtDate;
}
