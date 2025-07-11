package com.backend.payload.request;

import com.backend.enums.UserType;
import lombok.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegistrationRequest implements Serializable {

    @NotNull(message = "Email Entered Is Not Valid")
    private String email;

    public String getEmail() {
        return email;
    }

    @Enumerated(EnumType.STRING)
    private UserType userType;

    @NotNull(message = "Please Enter Password")
    private String password;

    @NotBlank(message = "Please Provide Username")
    private String username;

    public void setEmail(String email) {
        this.email = email;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
