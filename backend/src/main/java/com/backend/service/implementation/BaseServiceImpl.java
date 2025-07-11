package com.backend.service.implementation;

import com.backend.domain.User;
import com.backend.exception.ApiResourceNotFoundException;
import com.backend.repository.UserRepository;
import com.backend.security.service.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BaseServiceImpl {

    private static final Logger logger = LoggerFactory.getLogger(BaseServiceImpl.class);
    private final UserRepository userRepository;

    public BaseServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByEmail(String email){
        User user;

        user = userRepository.findByEmail(email).orElseThrow(() -> new ApiResourceNotFoundException("USER NOT FOUND"));

        return user;
    }

    public User getUserFromSecurityContext(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        logger.info("Principal type: {}", principal.getClass().getName());


        if(principal instanceof UserDetailsImpl){
            UserDetailsImpl userDetails = (UserDetailsImpl) principal;

            return userRepository.findByEmail(userDetails.getEmail())
                    .orElseThrow(() -> new ApiResourceNotFoundException("USER_NOT_LOGIN"));
        } else {
            throw new ApiResourceNotFoundException("USER_NOT_LOGIN");
        }
    }
}
