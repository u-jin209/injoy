package com.inzent.injoy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int id;
    private String username;
    private String password;
    private String email;
    private String name;
    private String organName;
    private String role;
    private String phoneNumber;
    private Timestamp crtnDate;
    private String profilePhoto;
    private int organId;
    private String provider;
    private String providerId;
    private boolean emailVerified;
    private String condition;
    private String conversation;

}
