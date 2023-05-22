package com.inzent.injoy.controller;

import com.inzent.injoy.model.BookMarkDTO;
import com.inzent.injoy.model.FolderDTO;
import com.inzent.injoy.model.ProjectDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.BookMarkService;
import com.inzent.injoy.service.FolderService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/folder")
public class FolderController {

    private final FolderService folderService;
    public FolderController( FolderService folderService){
        this.folderService = folderService;
    }

    @ResponseBody
    @GetMapping("insert")
    public String insert(@AuthenticationPrincipal UserCustomDetails login, String folderRoot, String folderName,Integer projectId){


        FolderDTO folderDTO = new FolderDTO();

        folderDTO.setFolderName(folderName);
        folderDTO.setFolderRoot(folderRoot);
        folderDTO.setUserId(login.getUserDTO().getId());
        folderDTO.setProjectId(projectId);

        folderService.insert(folderDTO);

        return "redirect:/project/myProject";
    }


    @ResponseBody
    @PostMapping("delete")
    public String delete(String folderArr ){


        for(String num : folderArr.split(",")){

            folderService.delete(Integer.parseInt(num));
        }
        return "redirect:/project/myProject";
    }


    @ResponseBody
    @GetMapping("update")
    public String update(String root, String folder ) {
        System.out.println("root = " + root);
        System.out.println("folder = " + folder);
        Map<String, Object> map = new HashMap<>();

        for (String num : folder.split(",")) {
            map.put("root", root);
            map.put("folderId", Integer.parseInt(num));

            folderService.update(map);
        }
        return "redirect:/project/myProject";
    }

    @ResponseBody
    @GetMapping("folderList")
    public List<FolderDTO> selectProject(String folderRoot, Integer projectId){

        Map<String, Object> map = new HashMap<>();
        map.put("folderRoot",folderRoot);
        map.put("projectId", projectId);

        System.out.println("folderService.selectAll(map) : "+ folderService.selectAll(map));

        return  folderService.selectAll(map);
    }
    @PostMapping("checkName")
    @ResponseBody
    public int NameCheck(String folderName, int projectId, String folderRoot) {
        FolderDTO folderDTO= new FolderDTO();
        folderDTO.setFolderName(folderName);
        folderDTO.setFolderRoot(folderRoot);
        folderDTO.setProjectId(projectId);


        int cnt = folderService.checkName(folderDTO);
        return cnt;

    }
}
