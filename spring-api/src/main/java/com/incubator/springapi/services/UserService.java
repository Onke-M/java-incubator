package com.incubator.springapi.services;

import com.incubator.springapi.entities.User;
import com.incubator.springapi.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        Iterable<User> userIterable = userRepository.findAll();

        List<User> result = new ArrayList<>();
        userIterable.forEach(result::add);

        return result;
    }

    public User getUser(Integer userID) {
        User user = userRepository.findByUserID(userID);
        if(user == null)
        {
            return null;
        }
        return user;
    }
}
