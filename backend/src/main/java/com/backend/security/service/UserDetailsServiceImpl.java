package com.backend.security.service;
import com.backend.domain.User;
import com.backend.repository.UserRepository;
import com.backend.service.implementation.BaseServiceImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final BaseServiceImpl baseService;
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(BaseServiceImpl baseService, UserRepository userRepository) {
        this.baseService = baseService;
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return UserDetailsImpl.build(user);
    }
}
