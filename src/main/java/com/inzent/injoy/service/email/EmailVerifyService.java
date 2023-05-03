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
public class EmailVerifyService implements EmailService{
    @Value("${mail}")
    private String mail;
    @Autowired
    JavaMailSender emailSender;

//    public static final String code = createKey();
    @Override
    public MimeMessage createMessage(String to,String code) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO,to); //보내는 대상
        message.setSubject("[인증번호: "+code+"] 인증 후 바로 Injoy를 사용하실 수 있습니다.");    //제목

        String msgg="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h1> 안녕하세요 injoy에 가입하신걸 환영합니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 이메일 인증 창에 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>이메일 인증 코드입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= code+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress(mail,"injoy"));//보내는 사람

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
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return code;
    }
}
