package com.klevispllumbi.klosismart.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        String message = "Autentikimi i pamjaftueshëm.";


        Exception exception = (Exception) request.getAttribute("exception");

        if (exception != null) {
            if (exception instanceof ExpiredJwtException) {
                message = "Tokeni është skaduar. Ju lutem logohuni përsëri.";
            } else if (exception instanceof MalformedJwtException || exception instanceof SignatureException) {
                message = "Tokeni është i pavlefshëm.";
            } else {
                message = exception.getMessage();
            }
        } else {
            Throwable cause = authException.getCause();
            if (cause instanceof ExpiredJwtException) {
                message = "Tokeni është skaduar. Ju lutem logohuni përsëri.";
            } else if (cause instanceof MalformedJwtException || cause instanceof SignatureException) {
                message = "Tokeni është i pavlefshëm.";
            } else if (authException instanceof InsufficientAuthenticationException) {
                message = "Autorizimi mungon ose është i pasaktë.";
            } else if (authException.getMessage() != null && !authException.getMessage().isEmpty()) {
                message = authException.getMessage();
            }
        }

        Map<String, Object> body = new HashMap<>();
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        body.put("error", "Unauthorized");
        body.put("message", message);
        body.put("path", request.getServletPath());

        objectMapper.writeValue(response.getOutputStream(), body);
    }
}
