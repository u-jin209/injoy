package com.inzent.injoy.model;

import lombok.Data;

@Data public class ProjectDTO {
    int projectId;
    String projectName;
    String invitationCode;
    String explanation;
    String managerApproval;
    int creatorUserId;


    int projectMemberId;
    int userId;
    String authority;
}
