package com.incubator.springapi.services;

import com.incubator.springapi.entities.Cart;
import com.incubator.springapi.entities.User;
import com.incubator.springapi.interfaces.IUserService;
import com.incubator.springapi.repositories.CartRepository;
import com.incubator.springapi.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final CartRepository cartRepository;

    public UserService(UserRepository userRepository, CartRepository cartRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
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
        if(Objects.equals(newUser.getRole().getRoleDesc(), "Customer")){

            Cart cart = new Cart();
            cart.setUser(newUser);
            cartRepository.save(cart);

            return newUser;
        }
        return newUser;
    }
}
