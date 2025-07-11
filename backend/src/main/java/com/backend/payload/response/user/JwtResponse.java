package com.backend.payload.response.user;


import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.List;

public class JwtResponse {
    private final String token;
    private final String type = "Bearer";
    private final Long id;
    private final String email;
    private final String username;
    private final List<String> roles;


    @JsonCreator
    public JwtResponse(String token, Long id, String email, String username, List<String> roles) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.username = username;
        this.roles = roles;
    }


    public String getToken() {
        return token;
    }

    public String getType() {
        return type;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public List<String> getRoles() {
        return roles;
    }
}
