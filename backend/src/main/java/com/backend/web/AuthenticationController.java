package com.backend.web;

import com.backend.payload.request.LoginRequest;
import com.backend.payload.request.UserRegistrationRequest;
import com.backend.payload.response.user.UserRegistrationResponse;
import com.backend.security.jwt.JwtUtils;
import com.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    @CrossOrigin(origins = "*")
    public ResponseEntity<UserRegistrationResponse> registerUser(@RequestBody UserRegistrationRequest userRegistrationRequest) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.registerUser(userRegistrationRequest));
    }


    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        return authenticationService.loginUser(loginRequest);
    }

}
