package com.coursecontentsystem.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;

public interface FileStorageService {
    String storeFile(MultipartFile file) throws IOException;

    InputStream getFile(String filePath) throws IOException;

    void deleteFile(String filePath) throws IOException;

    Path getFilePath(String filename);
}
