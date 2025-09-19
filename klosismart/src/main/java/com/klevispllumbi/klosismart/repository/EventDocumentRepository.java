// EventDocumentRepository.java
package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.EventDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventDocumentRepository extends JpaRepository<EventDocument, Long> {}
