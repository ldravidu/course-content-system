package com.coursecontentsystem.service.impl;

import com.coursecontentsystem.service.FileStorageService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {

    private static final Logger logger = LoggerFactory.getLogger(FileStorageServiceImpl.class);

    @Value("${app.file.storage.location}")
    private String fileStorageLocation;

    @PostConstruct
    private void validateFileStorageLocation() {
        if (fileStorageLocation == null || fileStorageLocation.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "The file storage location is not configured. Please set 'app.file.storage.location'.");
        }
    }

    private Path fileStoragePath;

    @PostConstruct
    public void init() throws IOException {
        fileStoragePath = Paths.get(fileStorageLocation).toAbsolutePath().normalize();
        Files.createDirectories(fileStoragePath);
    }

    @Override
    public String storeFile(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IOException("File name is null");
        }
        if (file.isEmpty()) {
            throw new IOException("File is empty");
        }
        filename = StringUtils.cleanPath(filename);
        String uniqueFilename = UUID.randomUUID().toString() + "_" + filename;
        Path targetLocation = fileStoragePath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFilename;
    }

    /**
     * Returns an InputStream to stream the file content without loading the entire
     * file into memory.
     */
    public InputStream getFile(String filePath) throws IOException {
        Path path = fileStoragePath.resolve(filePath).normalize();
        return Files.newInputStream(path);
    }

    @Override
    public void deleteFile(String filePath) throws IOException {
        Path path = fileStoragePath.resolve(filePath).normalize();
        boolean deleted = Files.deleteIfExists(path);
        if (!deleted) {
            logger.warn("File {} could not be deleted or does not exist.", path);
        }
    }

    @Override
    public Path getFilePath(String filename) {
        return fileStoragePath.resolve(filename).normalize();
    }
}
