package com.example.fileservice.mediator;

import com.example.fileservice.entity.ImageDTO;
import com.example.fileservice.entity.ImageEntity;
import com.example.fileservice.entity.ImageResponse;
import com.example.fileservice.exception.FtpConnectionException;
import com.example.fileservice.service.FtpService;
import com.example.fileservice.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
@AllArgsConstructor

public class MediatorImage {
    private final FtpService ftpService;
    private final ImageService imageService;

    public ResponseEntity<?> saveImage(MultipartFile file) {
        try {
            ImageEntity imageEntity = ftpService.uploadFileTOFTP(file);
            imageEntity = imageService.save(imageEntity);
            return ResponseEntity.ok(
                    ImageDTO.builder()
                            .uuid(imageEntity.getUuid())
                            .createAt(imageEntity.getCreateAt()));
        } catch (IOException e) {
            return ResponseEntity.status(400).body(new ImageResponse("File dont exist"));
        } catch (FtpConnectionException e1) {
            return ResponseEntity.status(400).body(new ImageResponse("Cannot save file"));
        }
    }

    public ResponseEntity<ImageResponse> delete(String uuid) {
        try {
            ImageEntity imageEntity = imageService.findByUuid(uuid);
            if (imageEntity != null) {
                ftpService.deleteFile(imageEntity.getPath());
                return ResponseEntity.ok(new ImageResponse("File deleted"));
            }
            return ResponseEntity.ok(new ImageResponse("File dont exist"));

        } catch (IOException e) {
            return ResponseEntity.status(400).body(new ImageResponse("Cannot delete file"));
        }
    }


    public ResponseEntity<?> getImage(String uuid) throws IOException {
        ImageEntity imageEntity = imageService.findByUuid(uuid);
        if (imageEntity != null) {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.IMAGE_PNG);
            return new ResponseEntity<>(ftpService.getFile(imageEntity).toByteArray(), httpHeaders, HttpStatus.OK);
        }
        return null;
    }
}
