package com.coursecontentsystem.controller;

import com.coursecontentsystem.dto.UserCreationDTO;
import com.coursecontentsystem.dto.UserDTO;
import com.coursecontentsystem.dto.UserUpdateDTO;
import com.coursecontentsystem.dto.auth.AuthResponseDTO;
import com.coursecontentsystem.dto.auth.LoginRequestDTO;
import com.coursecontentsystem.security.JwtService;
import com.coursecontentsystem.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/api/auth/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()));

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwtService.generateToken(userDetails);

            return ResponseEntity.ok(new AuthResponseDTO(jwt, "Bearer", userDetails.getUsername()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @PostMapping("/api/auth/register")
    public ResponseEntity<UserDTO> register(@RequestBody @Valid UserCreationDTO userDTO) {
        return ResponseEntity.ok(userService.createUser(userDTO));
    }

    @GetMapping("/api/users/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(userService.getUserByUsername(userDetails.getUsername()));
    }

    @PutMapping("/api/users/me")
    public ResponseEntity<UserDTO> updateCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody @Valid UserUpdateDTO userDTO) {
        UserDTO currentUser = userService.getUserByUsername(userDetails.getUsername());
        return ResponseEntity.ok(userService.updateUser(currentUser.getId(), userDTO));
    }
}
