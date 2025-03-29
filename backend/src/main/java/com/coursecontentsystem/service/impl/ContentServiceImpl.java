package com.coursecontentsystem.service.impl;

import com.coursecontentsystem.dto.ContentCreationDTO;
import com.coursecontentsystem.dto.ContentDTO;
import com.coursecontentsystem.dto.ContentUpdateDTO;
import com.coursecontentsystem.mapper.ContentMapper;
import com.coursecontentsystem.model.Content;
import com.coursecontentsystem.model.Course;
import com.coursecontentsystem.model.FileType;
import com.coursecontentsystem.model.User;
import com.coursecontentsystem.repository.ContentRepository;
import com.coursecontentsystem.repository.CourseRepository;
import com.coursecontentsystem.repository.UserRepository;
import com.coursecontentsystem.service.ContentService;
import com.coursecontentsystem.service.FileStorageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
@Transactional
public class ContentServiceImpl implements ContentService {
    private static final String CONTENT_API_URL_PREFIX = "/api/content/";

    private final ContentRepository contentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final ContentMapper contentMapper;

    @Override
    public ContentDTO createContent(ContentCreationDTO dto, MultipartFile file, Long uploaderId) throws IOException {
        User uploader = userRepository.findById(uploaderId)
                .orElseThrow(() -> new EntityNotFoundException("Uploader not found"));

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Provided file is null or empty");
        }
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        Content content = contentMapper.toEntity(dto);
        content.setCourse(course);
        content.setUploadedBy(uploader);
        content.setOriginalFilename(file.getOriginalFilename());
        content.setContentType(file.getContentType());
        content.setFileSize(file.getSize());
        content.setFileType(determineFileType(file.getContentType()));

        String filePath = fileStorageService.storeFile(file);
        content.setFilePath(filePath);

        return contentMapper.toDTO(contentRepository.save(content));
    }

    @Override
    public ContentDTO getContentById(Long id) {
        return contentRepository.findById(id)
                .map(this::enrichContentDTO)
                .orElseThrow(() -> new EntityNotFoundException("Content not found"));
    }

    @Override
    public Page<ContentDTO> getAllContent(Pageable pageable) {
        return contentRepository.findAll(pageable)
                .map(this::enrichContentDTO);
    }

    @Override
    public Page<ContentDTO> getContentByCourse(Long courseId, Pageable pageable) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
        return contentRepository.findByCourse(course, pageable)
                .map(this::enrichContentDTO);
    }

    @Override
    public ContentDTO updateContent(Long id, ContentUpdateDTO dto) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Content not found"));

        contentMapper.updateEntity(content, dto);
        return contentMapper.toDTO(contentRepository.save(content));
    }

    @Override
    public void deleteContent(Long id) throws IOException {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Content not found"));

        fileStorageService.deleteFile(content.getFilePath());
        contentRepository.delete(content);
    }

    @Override
    public InputStream getContentFile(Long id) throws IOException {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Content not found"));
        return fileStorageService.getFile(content.getFilePath());
    }

    private FileType determineFileType(String contentType) {
        if (contentType.startsWith("image/"))
            return FileType.IMAGE;
        if (contentType.startsWith("video/"))
            return FileType.VIDEO;
        if (contentType.equals("application/pdf"))
            return FileType.PDF;
        throw new IllegalArgumentException("Unsupported file type: " + contentType);
    }

    private ContentDTO enrichContentDTO(Content content) {
        ContentDTO dto = contentMapper.toDTO(content);
        dto.setContentUrl(CONTENT_API_URL_PREFIX + content.getId() + "/file");
        return dto;
    }
}
