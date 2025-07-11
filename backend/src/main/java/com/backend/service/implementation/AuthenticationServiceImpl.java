package com.backend.service.implementation;

import com.backend.domain.Authority;
import com.backend.domain.User;
import com.backend.exception.APIConflictException;
import com.backend.payload.request.HandleRegistrationDto;
import com.backend.payload.request.LoginRequest;
import com.backend.payload.request.UserRegistrationRequest;
import com.backend.payload.response.user.JwtResponse;
import com.backend.payload.response.user.UserRegistrationResponse;
import com.backend.repository.AuthorityRepository;
import com.backend.repository.UserRepository;
import com.backend.security.jwt.JwtUtils;
import com.backend.security.service.UserDetailsImpl;
import com.backend.service.AuthenticationService;
import com.backend.utils.helpers.RoleAssignment;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleAssignment roleAssignment;

    @Autowired
    private AuthorityRepository authorityRepository;


    @Autowired
    private BaseServiceImpl baseService;

    @Autowired
    private JwtUtils jwtUtils;


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public HandleRegistrationDto handleUserRegistration(UserRegistrationRequest request) throws Exception {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new APIConflictException("Email Already Exists, Please Try Another Email");
        }


        Set<String> stringList = new HashSet<>(List.of("ROLE_" + request.getUserType()));


        Set<Authority> roleList = roleAssignment.assignRole(stringList, authorityRepository);

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .authorities(roleList)
                .userType(request.getUserType())
                .build();


        User savedUser = saveUser(user);

        HandleRegistrationDto registrationDto = new HandleRegistrationDto(user);
        registrationDto.setUser(savedUser);

        return registrationDto;

    }

    @Override
    public UserRegistrationResponse registerUser(UserRegistrationRequest request) throws Exception {

        request.setEmail(request.getEmail().toLowerCase());
        HandleRegistrationDto handleRegistrationDto = handleUserRegistration(request);
        return UserRegistrationResponse.build(handleRegistrationDto.getUser());

    }


    private boolean passwordMatches(String rawPassword, String encodedPassword) {

        return passwordEncoder.matches(rawPassword, encodedPassword);
    }


    private User saveUser(User user) {
        try {

            return userRepository.save(user);
        } catch (Exception e) {
            logger.error("Error Saving User into Database", e);
            throw e; // Rethrow the exception or handle it appropriately
        }
    }
    @Override
    public ResponseEntity<?> loginUser(LoginRequest request) {

        request.setEmail(request.getEmail().toLowerCase());
        User user = baseService.getUserByEmail(request.getEmail());

        logger.info("Request Payload Password Is:{}", request.getPassword());

        logger.info("User Payload Password Is:{}", user.getPassword());

        logger.info("User Is:{}", user);

        if(user == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        if (user != null && passwordMatches(request.getPassword(), user.getPassword())) {


            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail().toLowerCase(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);



            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.OK).body(new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail(), roles));

        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email or Password Is Incorrect");
    }
}
