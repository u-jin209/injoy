package com.inzent.injoy.controller;
import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.servlet.http.HttpServletRequest;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class CalendarController {

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
        JSONObject jsonObj = new JSONObject();
        JSONArray jsonArr = new JSONArray();

        HashMap<String, Object> hash = new HashMap<>();

        hash.put("title", "This is Demo from Controller.");
        hash.put("start", "2023-05-09 17:30");
        hash.put("end", "2023-05-12 00:01");
        hash.put("color", "#545de8");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);

        hash.put("title", "두 번째 데이터 From Controller.");
        hash.put("start", "2023-05-10 00:01");
        hash.put("end", "2023-05-13 00:01");
        hash.put("color", "#ffff37");
        hash.put("textColor", "black");
        hash.put("borderColor", "blue");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);

        hash.put("title", "하루일정입니다.");
        hash.put("start", "2023-05-25 13:30:00");
        hash.put("end", "2023-05-25 14:30:00");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);

//        hash.put("title", "이것은 컨트롤러로부터 온 첫 번째 데이터입니다.");
//        hash.put("start", "2023-05-10 15:30:00");
//        hash.put("end", "2023-05-13 13:30:00");
//        hash.put("color", "#454ff6");
//        hash.put("allDay", "true");
//
//        jsonObj = new JSONObject(hash);
//        jsonArr.add(jsonObj);
//
//        hash.put("title", "이것은 컨트롤러로부터 온 두 번째 데이터가 왔습니다람쥐이ㅣㅣㅣㅣㅣㅣㅣ.");
//        hash.put("start", "2023-05-09");
//        hash.put("end", "2023-05-12");
//        hash.put("color", "#f5f21d");
//        hash.put("allDay", "true");
//
//        jsonObj = new JSONObject(hash);
//        jsonArr.add(jsonObj);
//
//        hash.put("title", "당일일정데이터");
//        hash.put("start", "2023-05-24 14:30:00");
//        hash.put("end", "2023-05-24 14:30:00");
//        hash.put("color", "#454ff6");
//        hash.put("borderColor", "blue");
//        hash.put("allDay", "true");
//        jsonObj = new JSONObject(hash);
//        jsonArr.add(jsonObj);

//        System.out.println("jsonArr : "+jsonArr);//값 확인하기

        return jsonArr;
    }


    @GetMapping("/project")
    public String showProject() {
        return "project/mainProject";
    }


    @ResponseBody
    @PostMapping(value = "/receive")
    public void receiveMethod(HttpServletRequest request){

        String title = request.getParameter("scheduleTitle");
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

        System.out.println("title : " + title);
        System.out.println("startdate : " + startDate);
        System.out.println("enddate : " + endDate);

    }
}
