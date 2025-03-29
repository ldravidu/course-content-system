package com.coursecontentsystem.service;

import com.coursecontentsystem.dto.ContentCreationDTO;
import com.coursecontentsystem.dto.ContentDTO;
import com.coursecontentsystem.dto.ContentUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

public interface ContentService {
    ContentDTO createContent(ContentCreationDTO contentCreationDTO, MultipartFile file, Long uploaderId)
            throws IOException;

    ContentDTO getContentById(Long id);

    Page<ContentDTO> getAllContent(Pageable pageable);

    Page<ContentDTO> getContentByCourse(Long courseId, Pageable pageable);

    ContentDTO updateContent(Long id, ContentUpdateDTO contentUpdateDTO);

    void deleteContent(Long id) throws IOException;

    InputStream getContentFile(Long id) throws IOException;
}
