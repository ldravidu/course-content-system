package com.coursecontentsystem.controller;

import com.coursecontentsystem.dto.ContentCreationDTO;
import com.coursecontentsystem.dto.ContentDTO;
import com.coursecontentsystem.dto.ContentUpdateDTO;
import com.coursecontentsystem.service.ContentService;
import com.coursecontentsystem.security.SecurityUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
@Slf4j
public class ContentController {
    private final ContentService contentService;

    @GetMapping
    public ResponseEntity<Page<ContentDTO>> getAllContent(Pageable pageable) {
        return ResponseEntity.ok(contentService.getAllContent(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContentDTO> getContent(@PathVariable Long id) {
        log.info("Fetching content with id: {}", id);
        ContentDTO content = contentService.getContentById(id);
        log.debug("Retrieved content: {}", content);
        return ResponseEntity.ok(content);
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable Long id) throws IOException {
        log.info("Downloading file for content id: {}", id);
        ContentDTO content = contentService.getContentById(id);
        InputStreamResource resource = new InputStreamResource(contentService.getContentFile(id));
        log.debug("File download prepared for content: {}, type: {}", content.getOriginalFilename(),
                content.getContentType());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(content.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + content.getOriginalFilename() + "\"")
                .body(resource);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ContentDTO> createContent(
            @RequestPart("content") @Valid ContentCreationDTO contentDTO,
            @RequestPart("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails) throws IOException {
        log.debug("Received content type: {}, file type: {}",
                contentDTO.getClass().getName(),
                file.getContentType());
        Long userId = getUserIdFromUserDetails(userDetails);
        log.info("Creating new content by user: {}", userId);
        log.debug("Content creation request: {}, file name: {}", contentDTO, file.getOriginalFilename());

        ContentDTO created = contentService.createContent(contentDTO, file, userId);
        log.info("Content created successfully with id: {}", created.getId());
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContentDTO> updateContent(
            @PathVariable Long id,
            @RequestBody @Valid ContentUpdateDTO contentDTO) {
        return ResponseEntity.ok(contentService.updateContent(id, contentDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) throws IOException {
        contentService.deleteContent(id);
        return ResponseEntity.noContent().build();
    }

    // Helper method to get user ID from UserDetails
    private Long getUserIdFromUserDetails(UserDetails userDetails) {
        return ((SecurityUser) userDetails).getId();
    }
}
