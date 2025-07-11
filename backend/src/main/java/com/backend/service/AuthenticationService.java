package com.backend.service;

import com.backend.payload.request.LoginRequest;
import com.backend.payload.request.UserRegistrationRequest;
import com.backend.payload.response.user.UserRegistrationResponse;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {

    UserRegistrationResponse registerUser(UserRegistrationRequest request) throws Exception;
    ResponseEntity<?> loginUser(LoginRequest request);

}
