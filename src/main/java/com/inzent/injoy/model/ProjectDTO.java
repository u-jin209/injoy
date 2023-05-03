package com.inzent.injoy.model;

import lombok.Data;

@Data public class ProjectDTO {
    private int projectId;
    private String projectName;
    private String invitationCode;
    private String explanation;
    private String managerApproval;
    private int creatorUserId;
    private int organId;
    private String domain;

//조인시 프로젝트맴버 정보
    private int projectMemberId;
    private int userId;
    private String authority;

    private int bookMarkId;
}
