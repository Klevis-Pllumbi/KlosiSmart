package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.NewsDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsDocumentRepository extends JpaRepository<NewsDocument, Long> {
}
