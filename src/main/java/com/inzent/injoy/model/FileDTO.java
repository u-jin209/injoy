package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class FileDTO {
    private int fileId;
    private int projectId;
    private int userId;
    private int folderId;
    private String  projectName;
    private String folderRoot;
    private String folderName;
    private String fileName;
    private String fileRealPath;
    private String fileSize;
    private String uniqueName;
    private String fileExtension;

    private Date crtDate;
    private String name;

}
