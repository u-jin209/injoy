package com.inzent.injoy.controller;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslationController {

    @PostMapping("/translate")
    public ResponseEntity<String> translateText(@RequestBody String textToTranslate) {
        try {
            // 번역 서비스 초기화
            Translate translate = TranslateOptions.getDefaultInstance().getService();

            // 번역
            Translation translation = translate.translate(textToTranslate);

            // 번역된 텍스트 반환
            String translatedText = translation.getTranslatedText();
            return ResponseEntity.ok(translatedText);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to translate the text.");
        }
    }
}