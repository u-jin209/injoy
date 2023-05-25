package com.inzent.injoy.controller;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.inzent.injoy.model.CalendarDTO;
import com.inzent.injoy.service.CalendarService;
import jakarta.servlet.http.HttpServletRequest;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class CalendarController {
    private CalendarService calendarService;

    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping("/cherry")
    public void cherry(Model model, HttpServletRequest request) throws ParseException  {
        CalendarDTO c = new CalendarDTO();
        c.setTitle(request.getParameter("scheduleTitle"));
        c.setContent(request.getParameter("writeScheduleContent"));
//        c.setStart(request.getParameter("startDate"));
//        c.setEnd(request.getParameter("endDate"));

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date strDate = new Date(sdf.parse(request.getParameter("startDate")).getTime());
        Date endDate = new Date(sdf.parse(request.getParameter("endDate")).getTime());
        System.out.println("strDate = " + strDate);
        System.out.println("endDate = " + endDate);
        c.setColor("black");
        System.out.println("ccccccccccccccc = " + c);
        System.out.println("c.gettil = " + c.getTitle());
        calendarService.insert(c);
    }

    @GetMapping("/orange")
    public String orange(Model model, HttpServletRequest request){
        String tmp  = request.getParameter("test");
        System.out.println("Grape.HTML에서 보낸 값 : " + tmp);

        return "/project/calendar2";
//        return "grape";
    }

    @ResponseBody
    @GetMapping("/logic")
    public List<Map<String, Object>> monthPlan(HttpServletRequest request){
        String str = request.getParameter("activeStart");
        System.out.println("str : " + str);

        JSONObject jsonObj = new JSONObject();
        JSONArray jsonArr = new JSONArray();

        HashMap<String, Object> hash = new HashMap<>();

        hash.put("title", "This is Demo from Controller.");
        hash.put("start", "2023-05-09 17:30");
        hash.put("end", "2023-05-12 00:01");
        hash.put("color", "#545de8");
        hash.put("textColor", "");
        hash.put("borderColor", "");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);

        hash.put("title", "두 번째 데이터 From Controller.");
        hash.put("start", "2023-05-10 00:01");
        hash.put("end", "2023-05-13 00:01");
        hash.put("color", "#ffff37");
        hash.put("textColor", "black");
        hash.put("borderColor", "");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);

        hash.put("title", "하루일정입니다.");
        hash.put("start", "2023-05-25 13:30:00");
        hash.put("end", "2023-05-25 14:30:00");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);



        hash.put("title", "color");
        hash.put("start", "2023-05-16 00:01");
        hash.put("end", "2023-05-18 00:01");
        hash.put("color", "#A2F3A0FF");
        hash.put("textColor", "white");
        hash.put("borderColor", "#A2F3A0FF");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);

        hash.put("title", "color");
        hash.put("start", "2023-05-23 00:01");
        hash.put("end", "2023-05-25 00:01");
        hash.put("color", "#F6C7EFFF");
        hash.put("borderColor", "#F6C7EFFF");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);


        hash.put("title", "color");
        hash.put("start", "2023-05-23 00:01");
        hash.put("end", "2023-05-25 00:01");
        hash.put("color", "#F52A2AFF");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);


        return jsonArr;
    }


    @GetMapping("/project")
    public String showProject() {
        return "project/mainProject";
    }


    @ResponseBody
    @PostMapping(value = "/receive")
    public void receiveMethod(HttpServletRequest request) throws ParseException {
        CalendarDTO c = new CalendarDTO();

//        c.setProjectId( 프로젝트 아이디 넣어주세요 );
//        c.setUserId( 유저 아이디 넣어주세요 );
        c.setTitle(request.getParameter("scheduleTitle"));
        c.setContent(request.getParameter("writeScheduleContent"));


        System.out.println("startDate = " + request.getParameter("startDate"));
        System.out.println("endDate = " + request.getParameter("endDate"));
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);

        System.out.println("start = " + start);
        System.out.println("end = " + end);

        c.setEnd(Timestamp.valueOf(end));
        c.setStart(Timestamp.valueOf(start));

        LocalDateTime now = LocalDateTime.now();
        c.setRegister_date(Timestamp.valueOf(now));

//        color, textcolor, borderColor
        String[][] colorArr = {
                {"#545de8", "",""},
                {"#ffff37","black", ""},
                {"#A2F3A0FF","white", "#A2F3A0FF"},
                {"#F6C7EFFF","", "#F6C7EFFF"},
                {"#F52A2AFF","",""}
        };

        int n = (int)(Math.random() * 5);

        c.setColor(colorArr[n][0]);
        c.setTextColor(colorArr[n][1]);
        c.setBorderColor(colorArr[n][2]);

        c.setAddress(request.getParameter("addressInputId"));
        c.setImgSrc(request.getParameter("mapImage"));
        System.out.println("SRC : " + request.getParameter("mapImage"));

        System.out.println("c = " + c);
//        calendarService.insert(c);

    }
}
