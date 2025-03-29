package com.coursecontentsystem.controller;

import com.coursecontentsystem.dto.ContentCreationDTO;
import com.coursecontentsystem.dto.ContentDTO;
import com.coursecontentsystem.dto.ContentUpdateDTO;
import com.coursecontentsystem.service.ContentService;
import com.coursecontentsystem.security.SecurityUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
public class ContentController {
    private final ContentService contentService;

    @GetMapping
    public ResponseEntity<Page<ContentDTO>> getAllContent(Pageable pageable) {
        return ResponseEntity.ok(contentService.getAllContent(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContentDTO> getContent(@PathVariable Long id) {
        return ResponseEntity.ok(contentService.getContentById(id));
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable Long id) throws IOException {
        ContentDTO content = contentService.getContentById(id);
        InputStreamResource resource = new InputStreamResource(contentService.getContentFile(id));

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
        // Assuming we have a way to get user ID from UserDetails
        Long userId = getUserIdFromUserDetails(userDetails);
        return ResponseEntity.ok(contentService.createContent(contentDTO, file, userId));
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
