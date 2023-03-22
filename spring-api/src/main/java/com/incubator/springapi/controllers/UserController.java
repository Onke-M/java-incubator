package com.incubator.springapi.controllers;

import com.incubator.springapi.entities.User;
import com.incubator.springapi.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {
    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping()
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<List<User>> getAllUsers() {

        List<User> users = new ArrayList<>();
        try {
            users = userRepository.findAll();
            log.info("Successfully retrieved all Users");
            return ResponseEntity.ok(users);

        } catch (Exception e) {
            log.warn("Failed to retrieve all Users");
            return ResponseEntity.ok(users);
        }
    }
}
