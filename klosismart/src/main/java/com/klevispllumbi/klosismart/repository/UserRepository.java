package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndEnabledTrue(String email);
}
