package com.backend.payload.response.user;


import com.backend.domain.Authority;
import com.backend.domain.User;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
public class UserRegistrationResponse {
    private String email;

    private String userType;

    private String token;

    private Set<Authority> roles;

    public String username;

    public UserRegistrationResponse(String email, String userType, Set<Authority> roles, String username) {
        this.email = email;
        this.userType = userType;
        this.roles = roles;
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Set<Authority> getRoles() {
        return roles;
    }

    public void setRoles(Set<Authority> roles) {
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public static UserRegistrationResponse build(User user){
        return new UserRegistrationResponse(
                user.getEmail(),
                user.getUserType().name(),
                user.getAuthorities(),
                user.getUsername()
        );
    }
}
