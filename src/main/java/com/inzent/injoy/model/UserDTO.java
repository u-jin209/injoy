package com.inzent.injoy.model;

import lombok.Data;

@Data
public class UserDTO {
    private int id;
    private String username;
    private String password;
    private String role;

    private String condition;
    private String profilePhoto;
    private String name;
    private String phoneNumber;
    private String email;
}
