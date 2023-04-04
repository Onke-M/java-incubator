package com.incubator.springapi.controllers;

import com.incubator.springapi.entities.Role;
import com.incubator.springapi.entities.User;
import com.incubator.springapi.repositories.UserRepository;
import com.incubator.springapi.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@CrossOrigin(origins ={"http://localhost:4200"}, methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserController {
    private UserService userService;
    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private PasswordEncoder passwordEncoder;
    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
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

    @PostMapping("/registerCustomer")
    public ResponseEntity<User> registerCustomer(@RequestBody User newUser) {
        Role customerRole = new Role();
        customerRole.setRoleId(2);
        customerRole.setRoleDesc("Customer");
        newUser.setRole(customerRole);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        try {
            userService.registerUser(newUser);
            log.info("User: {} was created successfully", newUser.getUsername());
            return new ResponseEntity<>(newUser, HttpStatus.OK);

        } catch (Exception e) {
            log.warn("User: {} failed to create", newUser.getUsername());
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @DeleteMapping
    public ResponseEntity<User> deleteUser(@RequestParam Integer userID){
        try {
            userService.deleteUser(userID);
            log.info("User: {} was deleted successfully", userID);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            log.warn("User: {} failed to delete", userID);
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @PostMapping("/registerAdmin")
    public ResponseEntity<User> registerAdmin(@RequestBody User newUser) {
        Role customerRole = new Role();
        customerRole.setRoleId(1);
        customerRole.setRoleDesc("Admin");
        newUser.setRole(customerRole);
        try {
            userService.registerUser(newUser);
            log.info("User: {} was created successfully", newUser.getUsername());
            return new ResponseEntity<>(newUser, HttpStatus.OK);

        } catch (Exception e) {
            log.warn("User: {} failed to create", newUser.getUsername());
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }
}
