package com.inzent.injoy.model;

import lombok.Data;

import java.util.Date;

@Data
public class VoiceDTO {
    private int voiceId;
    private int projectId;
    private int userId;

    String voiceText;
    String voiceTitle;




}
