package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.dto.*;
import com.klevispllumbi.klosismart.jwt.JwtService;
import com.klevispllumbi.klosismart.model.*;
import com.klevispllumbi.klosismart.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email ekziston tashmë");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return new AuthResponse("Regjistrimi u krye me sukses", user.getRole().getAuthority(), jwtToken);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Kredinciale të pasakta"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Kredinciale të pasakta");
        }

        String jwtToken = jwtService.generateToken(user);

        return new AuthResponse("Login i suksesshëm", user.getRole().getAuthority(), jwtToken);
    }
}