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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
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
    public FileController(FolderService folderService,FileService fileService){
        this.folderService = folderService;
        this.fileService = fileService;
    }

    @ResponseBody
    @PostMapping("insert")
    public String insert(@AuthenticationPrincipal UserCustomDetails logIn,@RequestParam("file") MultipartFile file ,HttpServletRequest request,
                         int projectId, String folderRoot) throws IOException {

        int folderId = 0;
        System.out.println("folderRoot = " + folderRoot);

        Map<String , Object> map = new HashMap<>();
        map.put("folderRoot", folderRoot);
        map.put("projectId",projectId);

        List<FolderDTO> folders = folderService.selectFolder(map);
        System.out.println("folders = " + folders);
        for(FolderDTO f: folders){
            String s ="";
            if(f.getFolderName() == null){
                s = f.getFolderRoot();
            }else{
                s = f.getFolderRoot() + f.getFolderName();
            }

            System.out.println("sssssssssssssssssssssssssssss : "+s);
            if(s.equals(folderRoot)){
                folderId = f.getFolderId();
                System.out.println("sssssssssssss  folderId : "+folderId);
            }

        }


        String fileRealName = file.getOriginalFilename();

        BigDecimal roundedValue = new BigDecimal(file.getSize()/ 1024.0 ).setScale(2, RoundingMode.HALF_UP);
        System.out.println("filegetSize roundedValue : "+ roundedValue);


        System.out.println("fileRealName : "+ fileRealName);


        FileDTO fileDTO = new FileDTO();
        fileDTO.setFileSize(roundedValue +"MB");
        fileDTO.setProjectId(projectId);
        fileDTO.setUserId(logIn.getUserDTO().getId());
        fileDTO.setFileName(fileRealName);
        fileDTO.setFolderId(folderId);


        if (fileRealName.length() !=0){
            //서버에 저장할 파일이름 fileextension으로 .jsp이런식의  확장자 명을 구함
            String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."), fileRealName.length());

            //String uploadFolder = "C:\\test\\upload";


            UUID uuid = UUID.randomUUID();
            String[] uuids = uuid.toString().split("-");

            String uniqueName = uuids[0];

            File saveFile = new File(request.getServletContext().getRealPath(FileDirPath),"uploadFile/"+uniqueName+fileExtension);
            file.transferTo(saveFile);
            String[] filePath = String.valueOf(saveFile).split("web");

            System.out.println("filePath : "+filePath);
            fileDTO.setFileRealPath(FileDirPath+"uploadFile/"+uniqueName+fileExtension);
        }

        fileService.insert(fileDTO);


        return "redirect:/project/myProject";
    }


}
