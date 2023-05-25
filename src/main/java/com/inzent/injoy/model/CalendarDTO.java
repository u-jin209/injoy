package com.inzent.injoy.model;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;

@Data
public class CalendarDTO {
    private int calendarId;
    private int projectId;
    private int userId;
    private String title;
    private String content;
    private Timestamp start;
    private Timestamp end;
    private Timestamp register_date;
    private String color;
    private String textColor;
    private String borderColor;
    private String address;
    private String imgSrc;

}
