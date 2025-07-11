package com.backend.payload.request;

import com.backend.domain.User;

public class HandleRegistrationDto {
    User user;

    public HandleRegistrationDto(User user) {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
