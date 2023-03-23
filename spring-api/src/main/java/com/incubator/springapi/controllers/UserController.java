package com.incubator.springapi.controllers;

import com.incubator.springapi.entities.User;
import com.incubator.springapi.repositories.UserRepository;
import com.incubator.springapi.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@CrossOrigin(origins ={"http://localhost:4200"}, methods={RequestMethod.GET, RequestMethod.POST})
public class UserController {
    private UserService userService;
    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        LOGGER.info("Fetching all Users");
        List<User> users = userService.getAllUsers();

        if (!users.isEmpty()) {
            LOGGER.trace("Found users");
            return new ResponseEntity<>(users, HttpStatus.OK);
        }

        LOGGER.info("No users could be found");
        return ResponseEntity.notFound().build();
    }
}
