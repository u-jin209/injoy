package com.inzent.injoy.service.email;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;


@Service
public class PasswordFindService implements EmailService {
    @Value("${mail}")
    private String mail;
    @Autowired
    JavaMailSender emailSender;

    @Override
    public MimeMessage createMessage(String to,String code) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, to); //보내는 대상
        message.setSubject("[Injoy] 비밀번호 변경 안내");    //제목

        String msgg = "";
        msgg += "<div style='margin:20px;'>";
        msgg += "<h1> 비밀번호가 변경되었습니다. </h1>";
        msgg += "<br>";
        msgg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg += "<h3 style='color:blue;'>임시 비밀번호입니다. 로그인 후 비밀번호 변경을 해주세요.</h3>";
        msgg += "<div style='font-size:130%'>";
        msgg += "PASSWORD : <strong>";
        msgg += code + "</strong><div><br/> ";
        msgg += "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress(mail, "injoy"));//보내는 사람

        return message;
    }

    public static String createKey() {
        Random random = new Random();
        int key = random.nextInt(9000) + 1000;
        return Integer.toString(key);
    }

    public String sendSimpleMessage(String to) throws Exception {
        // TODO Auto-generated method stub
        String code = createKey();
        MimeMessage message = createMessage(to,code);
        try {//예외처리
            emailSender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return code;
    }
}
