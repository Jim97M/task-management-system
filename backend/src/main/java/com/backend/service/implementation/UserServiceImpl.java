package com.backend.service.implementation;

import com.backend.domain.User;
import com.backend.repository.UserRepository;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> getUsers() {

        Iterable<User> user = userRepository.findAll();

        List<User> userList = StreamSupport.stream(user.spliterator(), false).collect(Collectors.toList());

        return ResponseEntity.ok().body(userList);
    }
}
