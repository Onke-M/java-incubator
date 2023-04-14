package com.incubator.springapi.interfaces;

import com.incubator.springapi.entities.User;

import java.util.List;

public interface IUserService {
    public List<User> getAllUsers();
    public void deleteUser(Integer userID);
    public User getUserByID(Integer userID);
    public User getUserByEmail(String email);
    public void registerUser(User newUser);
    public void resetPassword(String email, String newPassword);
}
