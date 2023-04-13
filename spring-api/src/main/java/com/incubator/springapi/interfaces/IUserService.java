package com.incubator.springapi.interfaces;

import com.incubator.springapi.entities.User;

import java.util.List;

public interface IUserService {
    public List<User> getAllUsers();
    public void deleteUser(Integer userID);
    public User getUser(Integer userID);
    public void registerUser(User newUser);
}
