package com.backend.utils.helpers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AuthenticationValidator {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationValidator.class);

    public String extractTokenFromHeader(HttpServletRequest httpServletRequest){
        final String authorizationHeader = httpServletRequest.getHeader("Authorization");
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            return authorizationHeader.substring(7);
        }
        return null;
    }

}
