package com.inzent.injoy.service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.inzent.injoy.model.FileDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.*;
import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.ZoneId;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@Slf4j
public class S3Uploader {


    // 버킷 이름 동적 할당
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 버킷 주소 동적 할당
    @Value("${cloud.aws.s3.bucket.url}")
    private String defaultUrl;

    private final AmazonS3 amazonS3Client;

    public S3Uploader(AmazonS3 amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }
    public String upload(File uploadFile, String dirName)throws IOException {
        String fileName = dirName + "/" + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile);  // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성됨)

        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }

//    public String upload(MultipartFile multipartFile, String dirName)  {
//        File uploadFile = convert(multipartFile)
//                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
//        return upload(uploadFile, dirName);
//    }
    private String putS3(File uploadFile, String fileName) {
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, fileName, uploadFile);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentDisposition("attachment");
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead).withMetadata(metadata)// PublicRead 권한으로 업로드 됨
        );
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        if(targetFile.delete()) {
            //System.out.println("파일이 삭제되었습니다.");
        }else {
            //System.out.println("파일이 삭제되지 않았습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file) throws  IOException {
        File convertFile = new File(file.getOriginalFilename());
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }
    public ResponseEntity<byte[]> getObject(FileDTO f, String userName) throws IOException {

        String savePath = System.getProperty("user.home") + "\\Downloads\\";

        String storedFileUrl = null;

        //System.out.println("uploadFile/"+f.getUniqueName() + f.getFileExtension());

        try {
            storedFileUrl = java.net.URLDecoder.decode("uploadFile/"+f.getUniqueName() + f.getFileExtension(), StandardCharsets.UTF_8.name());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        S3Object o = amazonS3Client.getObject(new GetObjectRequest(bucket, storedFileUrl));
        S3ObjectInputStream objectInputStream = o.getObjectContent();
        byte[] bytes = IOUtils.toByteArray(objectInputStream);

        //System.out.println(storedFileUrl);
//        String fileName = URLEncoder.encode(storedFileUrl, "UTF-8").replaceAll("\\+", "%20");
        //System.out.println("!$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$fileName = " + storedFileUrl);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.parseMediaType(o.getObjectMetadata().getContentType()));
        httpHeaders.setContentLength(o.getObjectMetadata().getContentLength());
        httpHeaders.setContentDispositionFormData("attachment", URLEncoder.encode(storedFileUrl, StandardCharsets.UTF_8));

        return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
    }
    private void validateFileExists(String fileName) throws FileNotFoundException {
        if(!amazonS3Client.doesObjectExist(bucket, fileName))
            throw new FileNotFoundException();
    }
    private String getUniqueFileName(String directory, String baseName, String extension) {
        String fileName = baseName + extension;
        String newFileName = fileName;
        int count = 1;
        Path filePath = Paths.get(directory + newFileName);
        while (Files.exists(filePath)) {
            newFileName = baseName + "(" + count+")" + extension;
            filePath = Paths.get(directory + newFileName);
            count++;
        }
        return newFileName;
    }
}


