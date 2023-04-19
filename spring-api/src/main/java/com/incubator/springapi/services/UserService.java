package com.incubator.springapi.services;

import com.incubator.springapi.controllers.UserController;
import com.incubator.springapi.entities.Cart;
import com.incubator.springapi.entities.User;
import com.incubator.springapi.interfaces.IUserService;
import com.incubator.springapi.repositories.CartRepository;
import com.incubator.springapi.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, CartRepository cartRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        Iterable<User> userIterable = userRepository.findAll();

        List<User> result = new ArrayList<>();
        userIterable.forEach(result::add);

        return result;
    }
    @Transactional
    public void deleteUser(Integer userID){
        try {
            User user = userRepository.findByUserID(userID);
            if(user!=null) {
                userRepository.delete(user);
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
    }

    public User getUserByID(Integer userID) {
        return userRepository.findByUserID(userID);
    }

    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Transactional
    public void registerUser(User newUser){
        try{
            newUser = userRepository.save(newUser);
            if(Objects.equals(newUser.getRole().getRoleDesc(), "Customer")){

                Cart cart = new Cart();
                cart.setUser(newUser);
                cartRepository.save(cart);
            }
        }
        catch(Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }

    }
    @Transactional
    public void resetPassword(String email, String newPassword) {
        try{
            User user = getUserByEmail(email);
            if(user!=null){
                LOGGER.info("Found user" + user.getUsername());
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
            }
            else{
                LOGGER.info("User not found");
            }
        }
        catch(Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
    }
}
