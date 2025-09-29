package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.model.Role;
import com.klevispllumbi.klosismart.model.User;
import com.klevispllumbi.klosismart.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepo;
    public UserService(UserRepository userRepo) { this.userRepo = userRepo; }

    @Transactional
    public boolean toggleSubscription(User u) {
        u.setSubscribed(!u.isSubscribed());
        userRepo.save(u);
        return u.isSubscribed();
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Transactional
    public User changeUserRole(Long userId, String roleInput) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Përdoruesi nuk u gjet"));
        Role role = parseRole(roleInput);
        user.setRole(role);
        return userRepo.save(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        if (!userRepo.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Përdoruesi nuk u gjet");
        }
        userRepo.deleteById(userId);
    }

    private Role parseRole(String input) {
        if (input == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role is required");
        String r = input.trim().toUpperCase();
        if (r.startsWith("ROLE_")) r = r.substring(5);
        try { return Role.valueOf(r); }
        catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role: " + input);
        }
    }

    public record UserStats(long totalUsers, long totalSubscribed, long totalEnabled) {}

    @Transactional(readOnly = true)
    public UserStats getUserStats() {
        long total = userRepo.count();
        long subs = userRepo.countByIsSubscribedTrue();
        long enabled = userRepo.countByEnabledTrue();
        return new UserStats(total, subs, enabled);
    }
}
