package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.dto.RequestCreateDto;
import com.klevispllumbi.klosismart.dto.RequestDto;
import com.klevispllumbi.klosismart.model.*;
import com.klevispllumbi.klosismart.repository.RequestFileRepository;
import com.klevispllumbi.klosismart.repository.RequestRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;
    private final RequestFileRepository fileRepository;

    private final String uploadDir = "uploads/requests/";

    public RequestDto createRequest(RequestCreateDto dto, User user) {

        Request request = new Request();
        request.setTitle(dto.getTitle());
        request.setDescription(dto.getDescription());
        request.setLatitude(dto.getLatitude());
        request.setLongitude(dto.getLongitude());
        request.setStatus(RequestStatus.E_RE);
        request.setCreatedAt(LocalDateTime.now());
        request.setUser(user);

        List<RequestFile> files = new ArrayList<>();
        if (dto.getFiles() != null) {
            for (MultipartFile file : dto.getFiles()) {

                String cleanFileName = file.getOriginalFilename()
                        .replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
                String fileName = System.currentTimeMillis() + "_" + cleanFileName;

                try {
                    Files.createDirectories(Paths.get(uploadDir));
                    Path targetPath = Paths.get(uploadDir + fileName);
                    Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    throw new RuntimeException("Dështoi ruajtja e file-it: " + fileName, e);
                }

                FileCategory category = file.getContentType().startsWith("image/")
                        ? FileCategory.IMAGE
                        : FileCategory.DOCUMENT;

                RequestFile rf = new RequestFile();
                rf.setFileName(file.getOriginalFilename());
                rf.setFileType(file.getContentType());
                rf.setFilePath(uploadDir + fileName);
                rf.setCategory(category);
                rf.setRequest(request);
                files.add(rf);
            }
        }
        request.setFiles(files);

        Request saved = requestRepository.save(request);
        fileRepository.saveAll(files);

        // TODO: dergo email tek admin-et

        return mapToDto(saved);
    }

    public List<RequestDto> getAllRequests() {
        List<Request> list = requestRepository.findAll();
        List<RequestDto> dtoList = new ArrayList<>();
        for (Request r : list) {
            dtoList.add(mapToDto(r));
        }
        return dtoList;
    }

    public List<RequestDto> getRequestsByStatus(RequestStatus status) {
        List<Request> list = requestRepository.findByStatus(status);
        List<RequestDto> dtoList = new ArrayList<>();
        for (Request r : list) {
            dtoList.add(mapToDto(r));
        }
        return dtoList;
    }

    public RequestDto getRequestById(Long id) {
        Request r = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kërkesa nuk u gjet"));
        return mapToDto(r);
    }

    public RequestDto updateRequestStatus(Long id, String statusStr) {
        RequestStatus newStatus;
        try {
            newStatus = RequestStatus.valueOf(statusStr);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Status i pavlefshëm: " + statusStr);
        }

        Request r = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kërkesa nuk u gjet me id: " + id));

        r.setStatus(newStatus);

        if (newStatus == RequestStatus.E_ZGJIDHUR) {
            r.setResolvedAt(LocalDateTime.now());
        }

        Request saved = requestRepository.save(r);
        return mapToDto(saved);
    }

    private RequestDto mapToDto(Request r) {
        RequestDto dto = new RequestDto();
        dto.setId(r.getId());
        dto.setTitle(r.getTitle());
        dto.setDescription(r.getDescription());
        dto.setStatus(r.getStatus().name());
        dto.setLatitude(r.getLatitude());
        dto.setLongitude(r.getLongitude());
        dto.setCreatedAt(r.getCreatedAt());
        dto.setResolvedAt(r.getResolvedAt());
        dto.setUserEmail(r.getUser().getEmail());
        dto.setUserName(r.getUser().getName() + " " + r.getUser().getSurname());

        List<String> imageUrls = new ArrayList<>();
        List<String> documentUrls = new ArrayList<>();
        if (r.getFiles() != null) {
            for (RequestFile f : r.getFiles()) {
                String fileName = Paths.get(f.getFilePath()).getFileName().toString();
                if (f.getCategory() == FileCategory.IMAGE) {
                    imageUrls.add("/api/admin/files/" + fileName);
                } else {
                    documentUrls.add("/api/admin/files/" + fileName);
                }
            }
        }
        dto.setImageUrls(imageUrls);
        dto.setDocumentUrls(documentUrls);

        return dto;
    }
}