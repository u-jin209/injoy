package com.inzent.injoy.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.inzent.injoy.model.FileDTO;
import com.inzent.injoy.model.FolderDTO;
import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.service.FileService;
import com.inzent.injoy.service.FolderService;
import com.inzent.injoy.service.S3Uploader;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URISyntaxException;
import java.net.URL;
import java.io.File;
import java.io.IOException;
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
    private final S3Uploader s3Upload;
    private final AmazonS3 amazonS3Client;
    private final FolderService folderService;
    private final FileService fileService;

    // 버킷 이름 동적 할당
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public FileController(AmazonS3 amazonS3Client, S3Uploader s3Upload, FolderService folderService, FileService fileService) {
        this.amazonS3Client = amazonS3Client;
        this.s3Upload = s3Upload;
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




        FileDTO fileDTO = new FileDTO();
        fileDTO.setFileSize(roundedValue + "KB");
        fileDTO.setProjectId(projectId);
        fileDTO.setUserId(logIn.getUserDTO().getId());
        fileDTO.setFileName(fileRealName.substring(0, fileRealName.lastIndexOf(".")));
        fileDTO.setFolderId(folderId);


        if (fileRealName.length() != 0) {
            //서버에 저장할 파일이름 fileextension으로 .jsp이런식의  확장자 명을 구함
            String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."), fileRealName.length());


            UUID uuid = UUID.randomUUID();
            String[] uuids = uuid.toString().split("-");

            String uniqueName = uuids[0];

            File saveFile = new File(request.getServletContext().getRealPath(FileDirPath), uniqueName + fileExtension);
            file.transferTo(saveFile);
            String[] filePath = String.valueOf(saveFile).split("web");

            String path = s3Upload.upload(saveFile, "uploadFile");



            fileDTO.setFileRealPath(path);
            fileDTO.setUniqueName(uniqueName);
            fileDTO.setFileExtension(fileExtension);
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

        return fileService.searchFile(map);
    }

    @ResponseBody
    @GetMapping("allList")
    public List<FileDTO> allList(@AuthenticationPrincipal UserCustomDetails logIn) {

        return fileService.allFile(logIn.getUserDTO().getId());
    }


    @ResponseBody
    @GetMapping("allSearchFile")
    public List<FileDTO> allSearchFile(@AuthenticationPrincipal UserCustomDetails logIn, String keyword) {
        Map<String, Object> map = new HashMap<>();
        int userId = logIn.getUserDTO().getId();
        map.put("userId", userId);
        map.put("keyword", keyword);

        return fileService.allSearchFile(map);
    }

    @ResponseBody
    @PostMapping("delete")
    public String delete(String fileArr, HttpServletRequest request) {


        for (String num : fileArr.split(",")) {

            FileDTO origin = fileService.selectOne(Integer.parseInt(num));
            //파일 경로 지정
            File file = new File(request.getServletContext().getRealPath(FileDirPath), "uploadFile/" + origin.getUniqueName() + origin.getFileExtension());
            //현재 게시판에 존재하는 파일객체를 만듬


            if (file.exists()) { // 파일이 존재하면
                file.delete(); // 파일 삭제
            }


            fileService.delete(Integer.parseInt(num));
        }
        return "redirect:/project/myProject";
    }


    @ResponseBody
    @GetMapping("update")
    public String update(String root, String file, Integer projectId) {




        Map<String, Object> map = new HashMap<>();


        for (String num : file.split(",")) {
            map.put("fileId", Integer.parseInt(num));
            map.put("projectId", projectId);

            if (!Objects.equals(root, "/")) {
                map.put("root", root.substring(0, root.lastIndexOf("/")));
            } else {
                map.put("root", root);
            }


            fileService.update(map);
        }
        return "redirect:/project/myProject";
    }


//    @ResponseBody
//    @GetMapping("downloadFile")
//    public String downloadFile(String fileArr, HttpServletRequest request) throws IOException, URISyntaxException {
//
//        List<FileDTO> fileList = new ArrayList<>();
//
//        for (String id : fileArr.split(",")) {
//
//            fileList.add(fileService.selectOne(Integer.parseInt(id)));
//
//            System.out.println("fileService.selectOne(Integer.parseInt(id) : " + fileService.selectOne(Integer.parseInt(id)));
//        }
//
//
//        for (FileDTO f : fileList) {
//            down.downLoads("uploadFile/"+f.getUniqueName()+f.getFileExtension(),f.getFileName());
//
//        }
//        return "redirect:/project/myProject";
//    }

    @ResponseBody
    @GetMapping("downloadFile")
    public List<FileDTO> downloadFile(String fileArr, HttpServletRequest request) throws IOException, URISyntaxException {

        List<FileDTO> fileList = new ArrayList<>();

        for (String id : fileArr.split(",")) {

            fileList.add(fileService.selectOne(Integer.parseInt(id)));


        }





        return  fileList;
    }

    @ResponseBody
    @GetMapping("file")
    public ResponseEntity<Object> file(FileDTO f, HttpServletRequest request) throws IOException, URISyntaxException {
//        String path = request.getServletContext().getRealPath(FileDirPath) + "uploadFile/"; // 파일이 저장된 디렉토리 경로


        String savePath = System.getProperty("user.home") + "\\Downloads\\";
//        String file = java.net.URLDecoder.decode(amazonS3Client.getUrl(bucket, "uploadFile/" + f.getUniqueName() + f.getFileExtension()).toString(), StandardCharsets.UTF_8.name());



//        Path filePath = Paths.get(f.getFileRealPath());
//        Path filePath = Paths.get(new URI(f.getFileRealPath()));

        URL url = new URL(f.getFileRealPath());
        File file = Paths.get(url.toURI().getPath()).toFile();
//
        Resource resource = new FileSystemResource(file);
//

//            // 현재 시간을 한국 시간대로 가져옴
//            ZoneId zoneId = ZoneId.of("Asia/Seoul");
//            ZonedDateTime currentTime = ZonedDateTime.now(zoneId);
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
//            String formattedTime = currentTime.format(formatter);
//
//            System.out.println("formattedTime = " + formattedTime);


//        String newFileName = getUniqueFileName(String.valueOf(url), f.getFileName(), f.getFileExtension());
//        String saveFilePath = url + newFileName;
//        Files.copy(url, Paths.get(saveFilePath), StandardCopyOption.REPLACE_EXISTING);


        // 다운로드할 파일의 MIME 타입 설정
        String mimeType = request.getServletContext().getMimeType(String.valueOf(url));

        // 다운로드할 파일의 Content-Disposition 헤더 설정
        HttpHeaders headers = new HttpHeaders();

//            headers.setContentDisposition(ContentDisposition.builder("attachment").filename(formattedTime+"_"+f.getFileName()).build());
//            headers.setCacheControl("no-cache");
//            headers.setContentType(MediaType.parseMediaType(mimeType));
//            headers.set(HttpHeaders.DATE, formattedTime);

        headers.setContentDisposition(ContentDisposition.builder("attachment").filename(f.getFileName()).build());
        headers.setCacheControl("no-cache");
        headers.setContentType(MediaType.parseMediaType(mimeType));


        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(resource.contentLength())
                .body(resource);


//        String path = f.getFileRealPath(); // 파일이 저장된 디렉토리 경로
//
//        String savePath = System.getProperty("user.home") + "\\Downloads\\";
//
//
//
//
//        System.out.println("savePath = " + savePath);
//        try {
//            Path filePath = Paths.get(f.getFileRealPath());
//            Resource resource = new FileSystemResource(filePath.toFile());
//
//
//            // 현재 시간을 한국 시간대로 가져옴
//            ZoneId zoneId = ZoneId.of("Asia/Seoul");
//            ZonedDateTime currentTime = ZonedDateTime.now(zoneId);
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
//            String formattedTime = currentTime.format(formatter);
//
//            System.out.println("formattedTime = " + formattedTime);
//
//
//            String newFileName = getUniqueFileName(savePath, f.getFileName(), f.getFileExtension());
//            String saveFilePath = savePath + newFileName;
//            Files.copy(filePath, Paths.get(saveFilePath), StandardCopyOption.REPLACE_EXISTING);
//
//
//
//            // 다운로드할 파일의 MIME 타입 설정
//            String mimeType = request.getServletContext().getMimeType(saveFilePath);
//
//            // 다운로드할 파일의 Content-Disposition 헤더 설정
//            HttpHeaders headers = new HttpHeaders();
//
//            headers.setContentDisposition(ContentDisposition.builder("attachment").filename(formattedTime+"_"+f.getFileName()).build());
//            headers.setCacheControl("no-cache");
//            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//            headers.set(HttpHeaders.DATE, formattedTime);
//
//            return ResponseEntity.ok()
//                    .headers(headers)
//                    .contentLength(resource.contentLength())
//                    .body(resource);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
    }

    private String getUniqueFileName(String directory, String baseName, String extension) {
        String fileName = baseName + extension;
        String newFileName = fileName;
        int count = 1;
        Path filePath = Paths.get(directory + newFileName);
        while (Files.exists(filePath)) {
            newFileName = baseName + "(" + count + ")" + extension;
            filePath = Paths.get(directory + newFileName);
            count++;
        }
        return newFileName;
    }
}

