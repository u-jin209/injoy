package com.inzent.injoy.controller;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
public class ImageTextController {
    @Value("${part.upload.path}")
    private String uploadPath;

    @PostMapping("/extract-text")
    public ResponseEntity<String> extractTextFromImage(@RequestPart("image") MultipartFile imageFile) {
        if (imageFile.isEmpty()) {
            return ResponseEntity.badRequest().body("이미지 파일을 선택하세요.");
        }

        try {
            // 이미지를 임시 파일로 저장
            File tempFile = File.createTempFile("image", imageFile.getOriginalFilename());
            imageFile.transferTo(tempFile);

            // Tesseract 인스턴스 생성
            Tesseract tesseract = new Tesseract();
            tesseract.setLanguage("kor");

            // 이미지에서 텍스트 추출
            String extractedText = tesseract.doOCR(tempFile);

            // 임시 파일 삭제
            tempFile.delete();

            return ResponseEntity.ok(extractedText);
        } catch (IOException | TesseractException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("텍스트 추출 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}
