package com.incubator.springapi.interfaces;

public interface IResetPasswordService {
    String generateOTP();
    boolean compareOTP(String inputOTP);
    void sendOTP(String email);
    void resetPassword(String password);
}
