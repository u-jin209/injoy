package com.inzent.injoy.model;

import lombok.Data;

import java.sql.Date;

@Data
public class UserDTO {
    int userId;
    String email;
    String name;
    String role;
    String phoneNumber;
    Date crtnDate;
    String profilePhoto;
    int organId;

}
