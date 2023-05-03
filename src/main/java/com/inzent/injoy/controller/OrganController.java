package com.inzent.injoy.controller;


import com.google.gson.JsonObject;
import com.inzent.injoy.model.BookMarkDTO;
import com.inzent.injoy.model.OrganDTO;
import com.inzent.injoy.service.BookMarkService;
import com.inzent.injoy.service.OrganService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/organ")
public class OrganController {

    private final OrganService organService;
    public OrganController(OrganService organService){
        this.organService = organService;
    }

    @ResponseBody
    @GetMapping("insert")
    public JsonObject insert(String organName){

        System.out.println("organName : " +organName);

        OrganDTO organDTO = new OrganDTO();
        organDTO.setOrganName(organName);

        organService.insert(organDTO);
        OrganDTO last = organService.selectLast();

        JsonObject object = new JsonObject();
        object.addProperty("organId",last.getOrganId());
        object.addProperty("organName",last.getOrganName());
        System.out.println("object : " +object);
        return  object;
    }


    @PostMapping("checkName")
    @ResponseBody
    public int NameCheck(String keyword) {

        int cnt = organService.checkName(keyword);
        return cnt;

    }

}
