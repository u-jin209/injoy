package com.inzent.injoy.controller;

import com.inzent.injoy.model.BookMarkDTO;
import com.inzent.injoy.service.BookMarkService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bookMark")
public class BookMarkController {

    private final BookMarkService bookMarkService;
    public BookMarkController(BookMarkService bookMarkService){
        this.bookMarkService = bookMarkService;
    }

    @GetMapping("insert")
    public String insert(int projectId, int userId){

        BookMarkDTO bookMarkDTO = new BookMarkDTO();
        bookMarkDTO.setProjectId(projectId);
        bookMarkDTO.setUserId(userId);

        bookMarkService.insert(bookMarkDTO);
        return "redirect:/project/myProject";
    }


    @GetMapping("delete")
    public String delete(int projectId, int userId){
        BookMarkDTO bookMarkDTO = new BookMarkDTO();
        bookMarkDTO.setProjectId(projectId);
        bookMarkDTO.setUserId(userId);

        bookMarkService.delete(bookMarkDTO);
        return "redirect:/project/myProject";
    }

}
