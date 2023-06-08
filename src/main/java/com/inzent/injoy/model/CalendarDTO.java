package com.inzent.injoy.model;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Data
public class CalendarDTO {
    private int calendarId;
    private int projectId;
    private int userId;
    private String calTitle;
    private String calContent;
    private Date calStart;
    private Date calEnd;
    private Date calRegisterDate;
    private String calColor;
    private String calTextColor;
    private String calBorderColor;
    private String calAddress;
    private String calImgSrc;

    private String name;
    private String profilePhoto;
}
