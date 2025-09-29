package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndEnabledTrue(String email);
    Optional<User> findByVerificationToken(String token);
    Optional<Object> findByNid(@NotBlank(message = "NID është i detyrueshëm") @Pattern(
            regexp = "^[A-Z][0-9]{8}[A-Z]$",
            message = "NID duhet të fillojë dhe të përfundojë me një shkronjë të madhe dhe të ketë 8 numra në mes"
    ) String nid);
    Optional<User> findByForgotPasswordToken(String token);
    long count();
    long countByIsSubscribedTrue();
    long countByEnabledTrue();
    List<User> findAllByIsSubscribedTrue();
}
