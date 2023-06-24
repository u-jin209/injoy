package com.inzent.injoy.controller;

import com.inzent.injoy.model.FileDTO;
import com.inzent.injoy.model.FolderDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.VoiceDTO;
import com.inzent.injoy.service.FolderService;
import com.inzent.injoy.service.VoiceService;
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
@RequestMapping("/voice")
public class VoiceController {

    private final VoiceService voiceService;
    public VoiceController( VoiceService voiceService){
        this.voiceService = voiceService;
    }

    @ResponseBody
    @GetMapping("insert")
    public String insert(@AuthenticationPrincipal UserCustomDetails login,
                         String voiceTitle, String voiceText,String projectId){
        VoiceDTO voiceDTO  = new VoiceDTO();
        voiceDTO.setVoiceText(voiceText);
        voiceDTO.setVoiceTitle(voiceTitle);
        voiceDTO.setUserId(login.getUserDTO().getId());
        voiceDTO.setProjectId(Integer.parseInt(projectId));

        voiceService.insert(voiceDTO);

        return "redirect:/project/myProject";
    }

    @ResponseBody
    @GetMapping("voiceList")
    public List<VoiceDTO> selectProject( Integer projectId) {


        return voiceService.selectAll(projectId);
    }
    @ResponseBody
    @PostMapping("delete")
    public String delete(Integer voiceId ){


        voiceService.delete(voiceId);

        return "redirect:/project/myProject";
    }


}
