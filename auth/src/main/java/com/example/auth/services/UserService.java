package com.example.auth.services;

import com.example.auth.entity.*;
import com.example.auth.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtServices jwtServices;
    private final AuthenticationManager authenticationManager;
   private final CookieService cookieService;
    @Value("${jwt.exp}")
    private int exp;
    @Value("${jwt.refresh.exp}")
    private int refreshExp;

    private User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.saveAndFlush(user);
    }

    public String generateToken(String username) {
        return jwtServices.generateToken(username);
    }

    public void validateToken(String token) {
        jwtServices.validateToken(token);
    }

    public void register(UserRegisterDTO userRegisterDTO) {
        User user = new User();
        user.setLogin(userRegisterDTO.getLogin());
        user.setPassword(userRegisterDTO.getPassword());
        user.setEmail(userRegisterDTO.getEmail());
        if (userRegisterDTO.getRole() != null) {
            user.setRole(userRegisterDTO.getRole());
        } else {
            user.setRole(Role.USER);
        }
        saveUser(user);
    }

    public ResponseEntity<?> login(HttpServletResponse response, User authRequest) {
        log.info("--START LoginService");
        User user = userRepository.findUserByLogin(authRequest.getUsername()).orElse(null);
        if (user != null) {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            if (authenticate.isAuthenticated()) {
                Cookie refresh = cookieService.generateCookie("token", generateToken(authRequest.getUsername()), exp);
                Cookie cookie = cookieService.generateCookie("refresh", generateToken(authRequest.getUsername()), refreshExp);
                response.addCookie(cookie);
                response.addCookie(refresh);
                return ResponseEntity.ok(
                        UserRegisterDTO
                                .builder()
                                .login(user.getUsername())
                                .email(user.getEmail())
                                .build());
            } else {
                log.info("--STOP LoginService");
                return ResponseEntity.ok(new AuthResponse(Code.A1));
            }
        }
        log.info("User dont exist");
        log.info("--STOP LoginService");
        return ResponseEntity.ok(new AuthResponse(Code.A2));
    }


}
