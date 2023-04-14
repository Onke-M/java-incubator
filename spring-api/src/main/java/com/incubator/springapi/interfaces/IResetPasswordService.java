package com.incubator.springapi.interfaces;

public interface IResetPasswordService {
    void generateOTP();
    boolean compareOTP(String inputOTP);
    void sendOTP(String email);
    void resetPassword(String password);
}
