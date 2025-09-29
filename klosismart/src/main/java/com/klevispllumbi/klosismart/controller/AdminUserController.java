package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.model.User;
import com.klevispllumbi.klosismart.service.UserService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final UserService userService;
    public AdminUserController(UserService userService) { this.userService = userService; }

    @GetMapping
    public ResponseEntity<List<UserDto>> listAll() {
        List<UserDto> dto = userService.getAllUsers().stream()
                .map(UserDto::fromEntity)
                .toList();
        return ResponseEntity.ok(dto);
    }

    // PATCH /api/admin/users/{id}/role   body: {"role":"ADMIN"} ose {"role":"USER"}
    @PatchMapping("/{id}/role")
    public ResponseEntity<UserDto> changeRole(@PathVariable Long id, @RequestBody RoleUpdateRequest req) {
        User updated = userService.changeUserRole(id, req.role());
        return ResponseEntity.ok(UserDto.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<UserService.UserStats> users() {
        return ResponseEntity.ok(userService.getUserStats());
    }

    public record RoleUpdateRequest(@NotBlank String role) {}

    public record UserDto(Long id, String email, String fullName, String nid,
                          String role, boolean isSubscribed, boolean enabled) {
        static UserDto fromEntity(User u) {
            return new UserDto(
                    u.getId(),
                    u.getEmail(),
                    u.getName() + " " + u.getSurname(),
                    u.getNid(),
                    u.getRole() != null ? u.getRole().name() : null, // "ADMIN" | "USER"
                    u.isSubscribed(),
                    u.isEnabled()
            );
        }
    }
}
