package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsRepository extends JpaRepository<News, Long>, JpaSpecificationExecutor<News> {
    Optional<News> findBySlug(String slug);
    boolean existsBySlug(String slug);
}

