package com.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.net.ssl.SSLContext;
import java.security.NoSuchAlgorithmException;

@Configuration
public class SSLContextConfig {

    @Bean
    public SSLContext sslContext() throws NoSuchAlgorithmException {
        return SSLContext.getDefault();
    }
}
