package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {
}
