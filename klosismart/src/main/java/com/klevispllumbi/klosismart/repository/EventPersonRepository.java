// EventPersonRepository.java
package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.EventPerson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventPersonRepository extends JpaRepository<EventPerson, Long> {}
