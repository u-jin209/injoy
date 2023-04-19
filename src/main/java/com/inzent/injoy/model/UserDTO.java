package com.inzent.injoy.model;

import lombok.Data;

@Data
public class UserDTO {
    private int id;
    private String username;
    private String password;
    private String role;

    //이것을 추가했습니다.
    private String Cherry;
    private String Cherry2;

}
