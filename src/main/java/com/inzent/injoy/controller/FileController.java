package com.inzent.injoy.controller;

import com.inzent.injoy.model.FileDTO;
import com.inzent.injoy.model.FolderDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.FileService;
import com.inzent.injoy.service.FolderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/file")
public class FileController {
    @Value("${part.upload.path}")
    private String FileDirPath;

    private final FolderService folderService;
    private final FileService fileService;

    public FileController(FolderService folderService, FileService fileService) {
        this.folderService = folderService;
        this.fileService = fileService;
    }

    @ResponseBody
    @PostMapping("insert")
    public String insert(@AuthenticationPrincipal UserCustomDetails logIn, @RequestParam("file") MultipartFile file, HttpServletRequest request,
                         int projectId, String folderRoot) throws IOException {


        int NameIdx = folderRoot.lastIndexOf("/");
        String folderName = folderRoot.substring(NameIdx + 1);
        Map<String, Object> map = new HashMap<>();

        if (folderName != "") {
            folderRoot = folderRoot.replaceAll(folderName, "");

            map.put("folderRoot", folderRoot);
            map.put("folderName", folderName);
            map.put("projectId", projectId);

        } else {
            folderRoot = "/";

            map.put("folderRoot", folderRoot);
            map.put("projectId", projectId);

        }


        FolderDTO folder = folderService.selectFolder(map);
        int folderId = folder.getFolderId();

        String fileRealName = file.getOriginalFilename();

        BigDecimal roundedValue = new BigDecimal(file.getSize() / 1024.0).setScale(2, RoundingMode.HALF_UP);
        System.out.println("filegetSize roundedValue : " + roundedValue);


        System.out.println("fileRealName : " + fileRealName);


        FileDTO fileDTO = new FileDTO();
        fileDTO.setFileSize(roundedValue + "MB");
        fileDTO.setProjectId(projectId);
        fileDTO.setUserId(logIn.getUserDTO().getId());
        fileDTO.setFileName(fileRealName);
        fileDTO.setFolderId(folderId);


        if (fileRealName.length() != 0) {
            //서버에 저장할 파일이름 fileextension으로 .jsp이런식의  확장자 명을 구함
            String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."), fileRealName.length());

            //String uploadFolder = "C:\\test\\upload";


            UUID uuid = UUID.randomUUID();
            String[] uuids = uuid.toString().split("-");

            String uniqueName = uuids[0];

            File saveFile = new File(request.getServletContext().getRealPath(FileDirPath), "uploadFile/" + uniqueName + fileExtension);
            file.transferTo(saveFile);
            String[] filePath = String.valueOf(saveFile).split("web");

            System.out.println("filePath : " + filePath);
            fileDTO.setFileRealPath(FileDirPath + "uploadFile/" + uniqueName + fileExtension);
        }

        fileService.insert(fileDTO);


        return "redirect:/project/myProject";
    }

    @ResponseBody
    @GetMapping("fileList")
    public List<FileDTO> selectProject(String folderRoot, Integer projectId) {

         int NameIdx = folderRoot.lastIndexOf("/");

        String folderName = folderRoot.substring(NameIdx + 1);

        Map<String, Object> map = new HashMap<>();

        if (folderName != "") {
            folderRoot = folderRoot.replaceAll(folderName, "");

            map.put("folderRoot", folderRoot);
            map.put("folderName", folderName);
            map.put("projectId", projectId);

        } else {
            folderRoot = "/";

            map.put("folderRoot", folderRoot);
            map.put("projectId", projectId);

        }

        FolderDTO folder = folderService.selectFolder(map);
        int folderId = folder.getFolderId();


        Map<String, Object> file = new HashMap<>();
        file.put("folderId", folderId);
        file.put("projectId", projectId);


        return fileService.fileList(file);
    }


    @ResponseBody
    @GetMapping("searchFile")
    public List<FileDTO> searchFile( Integer projectId, String keyword) {
        Map<String, Object> map = new HashMap<>();
        map.put("projectId" , projectId);
        map.put("keyword",keyword);

        System.out.println("fileService.searchFile(map) : " + fileService.searchFile(map));
        return fileService.searchFile(map);
    }
}
