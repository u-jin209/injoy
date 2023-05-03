package com.inzent.injoy.service.email;

import jakarta.mail.internet.MimeMessage;

public interface EmailService {
    MimeMessage createMessage(String to,String code) throws Exception;
}
