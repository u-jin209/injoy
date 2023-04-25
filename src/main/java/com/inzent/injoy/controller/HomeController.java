package com.inzent.injoy.controller;
import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.servlet.http.HttpServletRequest;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class HomeController {

    @GetMapping("/")
    public String method(Model model) {
        model.addAttribute("tmp","이것은 컨트롤에서부터 왔습니다.");

        return "cherry";
    }

    @GetMapping("/orange")
    public String orange(Model model){

        return "orange";
    }

    @GetMapping("/logic")
    @ResponseBody
    public List<Map<String, Object>> monthPlan(){
        JSONObject jsonObj = new JSONObject();
        JSONArray jsonArr = new JSONArray();

        HashMap<String, Object> hash = new HashMap<>();

        hash.put("title", "이것은 컨트롤러로부터 온 첫 번째 데이터입니다.");
        hash.put("start", "2023-04-11");
        hash.put("end", "2023-04-14");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);

        hash.put("title", "이것은 컨트롤러로부터 온 두 번째 데이터가 왔습니다람쥐이ㅣㅣㅣㅣㅣㅣㅣ.");
        hash.put("start", "2023-04-10");
        hash.put("end", "2023-04-13");
        jsonObj = new JSONObject(hash);
        jsonArr.add(jsonObj);

//        System.out.println("jsonArr : "+jsonArr);//값 확인하기

        return jsonArr;
    }



    @GetMapping("/project")
    public String showProject() {
        return "project/mainProject";

    }
}


