package com.inzent.injoy.model;

import lombok.Data;

@Data public class ProjectMemberDTO {
    int projectMemberId;
    int projectId;
    int userId;
    String authority;

    private String username;
    //조인시 유저 정보
    private String name;
    private String phoneNumber;
    private String email;
    private String profilePhoto;

    //search용 정보

    private String keyword;
    private int id;


}
