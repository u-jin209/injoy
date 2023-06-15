package com.inzent.injoy.controller;

import com.inzent.injoy.model.*;
import com.inzent.injoy.service.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Controller
@RequestMapping("/board")
public class BoardController {
    @Value("${part.upload.path}")
    private String FileDirPath;

    private final S3Uploader s3Upload;
    private UserService userService;
    private BoardService boardService;
    private final FolderService folderService;
    private final FileService fileService;
    private final BoardFileService boardFileService;

    public BoardController(S3Uploader s3Upload,UserService userService, BoardService boardService, FolderService folderService, FileService fileService, BoardFileService boardFileService) {
        this.s3Upload = s3Upload;
        this.userService = userService;
        this.boardService = boardService;
        this.folderService = folderService;
        this.fileService = fileService;
        this.boardFileService = boardFileService;
    }

    @PostMapping("write")
    @ResponseBody
    public String writeBoard(@AuthenticationPrincipal UserCustomDetails login, BoardDTO boardDTO, @RequestParam(required = false) List<MultipartFile> files, HttpServletRequest request) throws IOException {
        boardDTO.setBoardWriterId(login.getUserDTO().getId());
        if (boardDTO.getBTitle().isEmpty()) {
            return "error";
        } else {

            // 파일 저장하기
            if (files != null){
                boardService.insert(boardDTO);
                Map<String, Object> map = new HashMap<>();
                map.put("folderRoot", "/");
                map.put("projectId", boardDTO.getProjectId());
                FolderDTO folder = folderService.selectFolder(map);
                int folderId = folder.getFolderId();

                FileDTO fileDTO = new FileDTO();

                for (MultipartFile file : files) {
                    String fileRealName = file.getOriginalFilename();

                    BigDecimal roundedValue = new BigDecimal(file.getSize() / 1024.0).setScale(2, RoundingMode.HALF_UP);

                    fileDTO.setFileSize(roundedValue + "MB");
                    fileDTO.setProjectId(boardDTO.getProjectId());
                    fileDTO.setUserId(login.getUserDTO().getId());
                    fileDTO.setFileName(fileRealName.substring(0, fileRealName.lastIndexOf(".")));
                    fileDTO.setFolderId(folderId);

                    if (fileRealName.length() != 0) {
                        String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."), fileRealName.length());
                        UUID uuid = UUID.randomUUID();
                        String[] uuids = uuid.toString().split("-");
                        String uniqueName = uuids[0];
                        File saveFile = new File(request.getServletContext().getRealPath(FileDirPath), uniqueName + fileExtension);
                        file.transferTo(saveFile);
                        String[] filePath = String.valueOf(saveFile).split("web");
                        String path = s3Upload.upload(saveFile,"uploadFile/");
                        fileDTO.setFileRealPath(path);
                        fileDTO.setUniqueName(uniqueName);
                        fileDTO.setFileExtension(fileExtension);
                    }

                    fileService.insert(fileDTO);

                    BoardFileDTO boardFileDTO = new BoardFileDTO();
                    boardFileDTO.setFileId(fileDTO.getFileId());
                    boardFileDTO.setBoardId(boardDTO.getBoardId());
                    boardFileService.insert(boardFileDTO);
                }

            } else {
                boardService.insert(boardDTO);
            }


            return "success";
        }
    }

    @PostMapping("deleteBoard")
    public String deleteBoard(int boardId){
        BoardDTO boardDTO = boardService.selectOne(boardId);

        boardService.deleteBoard(boardId);
        return "redirect:/project/" + boardDTO.getProjectId();

    }

    @PostMapping("update")
    public String update(@AuthenticationPrincipal UserCustomDetails login, BoardDTO boardDTO, @RequestParam(required = false) List<MultipartFile> files, HttpServletRequest request) throws IOException{
    BoardDTO board = boardService.selectOne(boardDTO.getBoardId());

        board.setBTitle(boardDTO.getBTitle());
        board.setBContent(boardDTO.getBContent());

        // 파일 저장하기
        if (files != null){
            boardService.update(board);
            boardFileService.delete(boardDTO.getBoardId());

            List<BoardFileDTO> listBoardFile = boardFileService.selectAll(boardDTO.getBoardId());

            for (BoardFileDTO dto : listBoardFile) {
                fileService.delete(dto.getFileId());
            }
            Map<String, Object> map = new HashMap<>();
            map.put("folderRoot", "/");
            map.put("projectId", board.getProjectId());
            FolderDTO folder = folderService.selectFolder(map);
            int folderId = folder.getFolderId();

            FileDTO fileDTO = new FileDTO();

            for (MultipartFile file : files) {
                String fileRealName = file.getOriginalFilename();

                BigDecimal roundedValue = new BigDecimal(file.getSize() / 1024.0).setScale(2, RoundingMode.HALF_UP);

                fileDTO.setFileSize(roundedValue + "MB");
                fileDTO.setProjectId(board.getProjectId());
                fileDTO.setUserId(login.getUserDTO().getId());
                fileDTO.setFileName(fileRealName.substring(0, fileRealName.lastIndexOf(".")));
                fileDTO.setFolderId(folderId);

                if (fileRealName.length() != 0) {
                    String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."), fileRealName.length());
                    UUID uuid = UUID.randomUUID();
                    String[] uuids = uuid.toString().split("-");
                    String uniqueName = uuids[0];
                    File saveFile = new File(request.getServletContext().getRealPath(FileDirPath), "uploadFile/" + uniqueName + fileExtension);
                    file.transferTo(saveFile);
                    String[] filePath = String.valueOf(saveFile).split("web");
                    String path = s3Upload.upload(saveFile,"uploadFile/");

                    fileDTO.setFileRealPath(path);
                    fileDTO.setUniqueName(uniqueName);
                    fileDTO.setFileExtension(fileExtension);
                }

                fileService.insert(fileDTO);

                BoardFileDTO boardFileDTO = new BoardFileDTO();
                boardFileDTO.setFileId(fileDTO.getFileId());
                boardFileDTO.setBoardId(boardDTO.getBoardId());
                boardFileService.insert(boardFileDTO);
            }

        } else {
            boardService.update(board);
        }
        return "redirect:/project/" + board.getProjectId();
    }

    @GetMapping("detailBoard")
    @ResponseBody
    public BoardDTO detailBoard(int boardId){
        return boardService.selectOne(boardId);
    }


    @GetMapping("getImg")
    @ResponseBody
    public List<BoardFileDTO> getImg(int boardId){
        List<BoardFileDTO> list = boardFileService.selectAll(boardId);
        return list;
    }

    @ResponseBody
    @GetMapping("downloadFile")
    public FileDTO downloadFile(String fileId, HttpServletRequest request) throws IOException {
        FileDTO f = new FileDTO();

        f = fileService.selectOne(Integer.parseInt(fileId));


        return f;
    }
}
