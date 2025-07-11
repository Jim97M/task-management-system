package com.backend.exception;

public class APIConflictException extends RuntimeException{
    public APIConflictException(String message) {
        super(message);
    }
}
