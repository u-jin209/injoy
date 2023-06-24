package com.inzent.injoy.controller;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;


import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;


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



    @PostMapping("/translateText")
    public ResponseEntity<Map<String, Object>> translateText(HttpServletRequest request) {
        Map<String,Object> map = new HashMap<>();
        String rawText = request.getParameter("text");
        System.out.println("rawText = " + rawText);
        String value = request.getParameter("lan");

        // Set your API key
        String apiKey = "AIzaSyDgXh3i1wbaAO9vIWwICMORiey17ulb_bw";

        // Initialize the translation client with the API key
        Translate translate = TranslateOptions.newBuilder().setApiKey(apiKey).build().getService();

        // Translate text from English to Spanish
        String text = rawText;
//        Translation translation = translate.translate(text, Translate.TranslateOption.sourceLanguage("en"),
//                Translate.TranslateOption.targetLanguage("ko"));
        Translation translation = null;
        if (Objects.equals(value, "en")){
            translation = translate.translate(text, Translate.TranslateOption.sourceLanguage("ko"),
                    Translate.TranslateOption.targetLanguage("en"));
        } else if (Objects.equals(value, "ko")){
            translation = translate.translate(text, Translate.TranslateOption.sourceLanguage("en"),
                    Translate.TranslateOption.targetLanguage("ko"));
        }

//        System.out.println("Source text: " + translation.getOriginalText());
        System.out.println("번역 Translated text: " + Objects.requireNonNull(translation).getTranslatedText());

        String resultText = translation.getTranslatedText();
        map.put("resultText", resultText);

        return ResponseEntity.ok(map);
    }
}
