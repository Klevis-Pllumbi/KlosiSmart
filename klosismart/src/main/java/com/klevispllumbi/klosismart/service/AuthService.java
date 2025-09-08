package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.dto.*;
import com.klevispllumbi.klosismart.jwt.JwtService;
import com.klevispllumbi.klosismart.model.*;
import com.klevispllumbi.klosismart.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email ekziston tashmë");
        }

        if (userRepository.findByNid(request.getNid()).isPresent()) {
            throw new RuntimeException("Numri personal ID ekziston tashmë");
        }

        User user = new User();
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setNid(request.getNid());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);

        String verificationUrl = "http://localhost:8080/api/auth/verify?token=" + verificationToken;

        emailService.sendVerificationEmail(user.getEmail(), user.getName() + " " + user.getSurname(), verificationUrl);

        userRepository.save(user);

        return new AuthResponse("Regjistrimi u krye me sukses. Ju lutemi verifikoni email-in përpara login-it.", null, null);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Kredinciale të pasakta. Email nuk i përket asnjë përdoruesi të regjistruar."));

        if (!user.isEnabled()) {
            throw new RuntimeException("Email nuk është verifikuar. Ju lutemi kontrolloni email-in tuaj.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Kredinciale të pasakta");
        }

        String jwtToken = jwtService.generateToken(user);

        return new AuthResponse("Login i suksesshëm", user.getRole().getAuthority(), jwtToken);
    }

    public boolean verifyUser(String token) {
        Optional<User> user = userRepository.findByVerificationToken(token);

        if (user.isEmpty()) {
            return false;
        }

        User u = user.get();
        u.setEnabled(true);
        userRepository.save(u);

        return true;
    }

    public void forgotPassword(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            String token = UUID.randomUUID().toString();
            user.setForgotPasswordToken(token);
            user.setForgotPasswordTokenExpiry(LocalDateTime.now().plusMinutes(10));

            userRepository.save(user);

            String resetLink = "http://localhost:3000/reset-password?token=" + token;

            emailService.sendResetPasswordEmail(user.getEmail(), user.getName() + " " + user.getSurname(), resetLink);
        }
    }

    public void resetPassword(String token, String newPassword) {
        Optional<User> userOpt = userRepository.findByForgotPasswordToken(token);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Token i pavlefshëm ose i skaduar");
        }

        User user = userOpt.get();

        if (user.getForgotPasswordTokenExpiry() == null || user.getForgotPasswordTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token ka skaduar. Ju lutemi kërkoni një link të ri për ndryshimin e fjalëkalimit.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setForgotPasswordToken(null);
        user.setForgotPasswordTokenExpiry(null);

        userRepository.save(user);
    }

}