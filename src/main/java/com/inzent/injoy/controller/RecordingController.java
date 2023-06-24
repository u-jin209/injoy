package com.inzent.injoy.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sound.sampled.*;
import java.io.File;
import java.io.IOException;

@RestController
public class RecordingController {

    @PostMapping("/record")
    public ResponseEntity<String> startRecording() {
        try {
            // 원하는 오디오 포맷 설정
            AudioFormat desiredFormat = new AudioFormat(AudioFormat.Encoding.PCM_SIGNED, 44100, 16, 2, 4, 44100, false);

            // 실제 지원하는 오디오 포맷 가져오기
            AudioFormat supportedFormat = getSupportedAudioFormat(desiredFormat);

            if (supportedFormat == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Desired audio format is not supported.");
            }

            // 마이크로부터 오디오 데이터 읽기
            DataLine.Info info = new DataLine.Info(TargetDataLine.class, supportedFormat);
            final TargetDataLine targetLine = (TargetDataLine) AudioSystem.getLine(info);
            targetLine.open(supportedFormat);
            targetLine.start();

            // 오디오 데이터를 파일로 저장
            File audioFile = new File("recording.wav");
            AudioInputStream audioStream = new AudioInputStream(targetLine);
            AudioSystem.write(audioStream, AudioFileFormat.Type.WAVE, audioFile);

            // 녹음 종료 후 메시지 반환
            return ResponseEntity.ok("Recording finished!");
        } catch (LineUnavailableException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to start recording.");
        }
    }

    // 시스템에서 지원하는 오디오 포맷 가져오기
    private AudioFormat getSupportedAudioFormat(AudioFormat desiredFormat) {
        Mixer.Info[] mixerInfos = AudioSystem.getMixerInfo();
        for (Mixer.Info mixerInfo : mixerInfos) {
            Mixer mixer = AudioSystem.getMixer(mixerInfo);
            Line.Info[] lineInfos = mixer.getTargetLineInfo();
            for (Line.Info lineInfo : lineInfos) {
                Line line;
                try {
                    line = mixer.getLine(lineInfo);
                } catch (LineUnavailableException e) {
                    continue;
                }

                if (line instanceof TargetDataLine) {
                    AudioFormat format = ((TargetDataLine) line).getFormat();
                    if (format.matches(desiredFormat)) {
                        return format;
                    }
                }
            }
        }
        return null;
    }
}
