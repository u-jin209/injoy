package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class FolderDTO {

    private int folderId;
    private String folderRoot;
    private String folderName;
    private int projectId;
    private int userId;
    private Date crtDate;



    //폴더 & 유저  join 시 필요
    private String name;
}
