package com.inzent.injoy.model;

import lombok.Data;

@Data
public class FileDTO {
    private int fileId;
    private int projectId;
    private int userId;
    private int folderId;
    private String fileName;
    private String fileRealPath;
    private String fileSize;



}
