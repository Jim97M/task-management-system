package com.backend.utils.helpers;

import com.backend.domain.Authority;
import com.backend.exception.ApiResourceNotFoundException;
import com.backend.repository.AuthorityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class RoleAssignment {


    private static final Logger logger = LoggerFactory.getLogger(RoleAssignment.class);

    public Set<Authority> assignRole(Set<String> userList, AuthorityRepository roleRepository) {
        Set<Authority> roles = new HashSet<>();

        logger.info("User List Role Is: {}", userList);

        if (userList == null) {
            Authority user = roleRepository.findByName("ROLE_USER")
                    .orElseThrow(() -> new ApiResourceNotFoundException("No Such Role"));
            roles.add(user);
        } else {
            userList.forEach(role -> {
                switch (role) {
                    case "ROLE_SUPER_ADMIN":
                        Authority superadmin = roleRepository.findByName("ROLE_SUPER_ADMIN")
                                .orElseThrow(() -> new ApiResourceNotFoundException("Error: Role not Found"));
                        roles.add(superadmin);
                        break;
                    case "ROLE_ADMIN":
                        Authority admin = roleRepository.findByName("ROLE_ADMIN")
                                .orElseThrow(() -> new ApiResourceNotFoundException("Error: Role not Found"));
                        roles.add(admin);
                        break;

                    default:
                        Authority user = roleRepository.findByName("ROLE_USER")
                                .orElseThrow(() -> new ApiResourceNotFoundException("Error: Role not Found"));
                        roles.add(user);
                }
            });
        }
        return roles;
    }
}
