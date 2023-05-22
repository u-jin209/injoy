package com.inzent.injoy.controller;

import com.inzent.injoy.model.FileDTO;
import com.inzent.injoy.model.FolderDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.FileService;
import com.inzent.injoy.service.FolderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.catalina.Context;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

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

        System.out.println("projectId +: " + projectId);
        System.out.println("folderRoot +: " + folderRoot);
        System.out.println("folderName +: " + folderName);
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
    public List<FileDTO> searchFile(Integer projectId, String keyword) {
        Map<String, Object> map = new HashMap<>();
        map.put("projectId", projectId);
        map.put("keyword", keyword);

        System.out.println("fileService.searchFile(map) : " + fileService.searchFile(map));
        return fileService.searchFile(map);
    }

    @ResponseBody
    @PostMapping("delete")
    public String delete(String fileArr) {


        for (String num : fileArr.split(",")) {

            fileService.delete(Integer.parseInt(num));
        }
        return "redirect:/project/myProject";
    }


    @ResponseBody
    @GetMapping("update")
    public String update(String root, String file ) {

        System.out.println("root = " + root);
        System.out.println("file = " + file);



        Map<String, Object> map = new HashMap<>();


        for (String num : file.split(",")) {
            map.put("fileId", Integer.parseInt(num));

            if (!Objects.equals(root, "/")){
                map.put("root",root.substring(0,root.lastIndexOf("/")));
            }else {
                map.put("root",root);
            }
            fileService.update(map);
        }
        return "redirect:/project/myProject";
    }


    @ResponseBody
    @GetMapping("downloadFile")
    public void downloadFile(String fileArr, HttpServletResponse response, HttpServletRequest request) throws IOException {

        System.out.println("fileArr : " + fileArr);
        List<FileDTO> fileList = new ArrayList<>();

        for (String id : fileArr.split(",")) {

            fileList.add(fileService.selectOne(Integer.parseInt(id)));

            System.out.println("fileService.selectOne(Integer.parseInt(id) : " + fileService.selectOne(Integer.parseInt(id)));
        }


        for (FileDTO f : fileList) {

            int num = f.getFileRealPath().toString().lastIndexOf('/');

            String fileUrl = f.getFileRealPath().toString().substring(num);

            File file = new File(request.getServletContext().getRealPath(FileDirPath), "uploadFile/" + fileUrl);
            // file 다운로드 설정
            response.setContentType("application/download");
            response.setContentLength((int) file.length());

            response.setHeader("Content-disposition", "attachment; filename=\\" + f.getFileName() + "\\");

            // response 객체를 통해서 서버로부터 파일 다운로드
            OutputStream os = response.getOutputStream();
            // 파일 입력 객체 생성
            FileInputStream fileInputStream = new FileInputStream(file);
            OutputStream out = response.getOutputStream();

            int read = 0;
            byte[] buffer = new byte[1024];
            while ((read = fileInputStream.read(buffer)) != -1) { // 1024바이트씩 계속 읽으면서 outputStream에 저장, -1이 나오면 더이상 읽을 파일이 없음
                out.write(buffer, 0, read);
            }


        }


    }
}
