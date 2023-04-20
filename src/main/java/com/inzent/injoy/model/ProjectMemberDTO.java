package com.inzent.injoy.model;

import lombok.Data;

@Data public class ProjectMemberDTO {
    int projectMemberId;
    int projectId;
    int userId;
    String authority;

}
