package com.steganography.steganography;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
@RestController
public class SteganographyApplication {

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowCredentials(true);
        corsConfig.addAllowedOrigin("http://localhost:5173");
        corsConfig.addAllowedHeader("*");
        corsConfig.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }

    @PostMapping("/api/upload")
    public ResponseEntity<byte[]> uploadFilesAndCombine(
            @RequestParam("file") MultipartFile file,
            @RequestParam("image") MultipartFile image) {

        Path imagePath = Paths.get("uploads/" + image.getOriginalFilename());
        Path filePath = Paths.get("uploads/" + file.getOriginalFilename());

        String originalImageFilename = image.getOriginalFilename();
        String combinedFilename = capitalizeFirstLetter(originalImageFilename);
        Path combinedPath = Paths.get("uploads/" + combinedFilename);

        try {
            Files.write(imagePath, image.getBytes());
            Files.write(filePath, file.getBytes());

            ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", "copy", "/b",
                    imagePath.toString() + "+" + filePath.toString(), combinedPath.toString());
            Process process = processBuilder.start();
            process.waitFor();

            if (Files.exists(combinedPath)) {
                byte[] combinedFileBytes = Files.readAllBytes(combinedPath);
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDisposition(ContentDisposition.attachment().filename(combinedFilename).build());

                return new ResponseEntity<>(combinedFileBytes, headers, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to combine files".getBytes(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (IOException | InterruptedException e) {
            return new ResponseEntity<>(("Failed: " + e.getMessage()).getBytes(), HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            try {
                Files.deleteIfExists(imagePath);
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
            }
        }
    }

    private String capitalizeFirstLetter(String filename) {
        if (filename == null || filename.isEmpty()) {
            return filename;
        }
        return Character.toUpperCase(filename.charAt(0)) + filename.substring(1);
    }

    public static void main(String[] args) {
        SpringApplication.run(SteganographyApplication.class, args);
    }
}
