package com.incubator.springapi.services;

import com.incubator.springapi.entities.User;
import com.incubator.springapi.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final CartService cartService;

    public UserService(UserRepository userRepository, CartService cartService) {
        this.userRepository = userRepository;
        this.cartService = cartService;
    }

    public List<User> getAllUsers() {
        Iterable<User> userIterable = userRepository.findAll();

        List<User> result = new ArrayList<>();
        userIterable.forEach(result::add);

        return result;
    }

    public ResponseEntity<?> deleteUser(Integer userID){
        try {
            User user = userRepository.findByUserID(userID);
            if(user!=null) {
                userRepository.delete(user);
                return new ResponseEntity<>(null, HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    public User getUser(Integer userID) {
        User user = userRepository.findByUserID(userID);
        if(user == null)
        {
            return null;
        }
        return user;
    }

    public User registerUser(User newUser){
        newUser = userRepository.save(newUser);
        if(newUser.getRole().getRoleDesc() == "Customer"){
            cartService.createCart(newUser);
            return newUser;
        }
        return newUser;
    }
}
