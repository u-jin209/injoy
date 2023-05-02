package com.inzent.injoy.controller;

import com.inzent.injoy.model.BookMarkDTO;
import com.inzent.injoy.model.OrganDTO;
import com.inzent.injoy.service.BookMarkService;
import com.inzent.injoy.service.OrganService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
    public String insert(String organName, String domain){

        System.out.println("organName : " +organName);
        System.out.println("domain : " +domain);
        OrganDTO organDTO = new OrganDTO();
        organDTO.setOrganName(organName);
        organDTO.setDomain(domain);
        organService.insert(organDTO);
        return "success";
    }




}
