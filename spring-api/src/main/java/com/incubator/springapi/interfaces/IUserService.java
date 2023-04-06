package com.incubator.springapi.interfaces;

import com.incubator.springapi.entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService {
    public List<User> getAllUsers();
    public ResponseEntity<?> deleteUser(Integer userID);
    public User getUser(Integer userID);
    public User registerUser(User newUser);
}
