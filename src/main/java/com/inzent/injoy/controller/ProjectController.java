package com.inzent.injoy.controller;


import com.inzent.injoy.model.UserDTO;
import com.inzent.injoy.service.ProjectService;
import com.inzent.injoy.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/project")
public class ProjectController {
    private ProjectService projectService;
    private UserService userService;

    public ProjectController(UserService userService){
        this.userService = userService;
    }

    @RequestMapping(value = "/addMember", method = RequestMethod.GET)
    @ResponseBody
    public List<UserDTO> addMember(){
        List<UserDTO> userList = userService.selectAll();
        System.out.printf(userList.toString());
        return userList;
    }


}
