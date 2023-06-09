package com.incubator.springapi.services;

import com.incubator.springapi.controllers.UserController;
import com.incubator.springapi.interfaces.IEmailService;
import com.incubator.springapi.interfaces.IResetPasswordService;
import com.incubator.springapi.interfaces.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class ResetPasswordService implements IResetPasswordService {
    String otp;
    String userEmail;
    private final IEmailService emailService;
    private final IUserService userService;

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);


    public ResetPasswordService(IEmailService emailService, IUserService userService) {
        this.emailService = emailService;
        this.userService = userService;
    }

    public String generateOTP() {
        Random random = new Random();
        otp = String.format("%04d", random.nextInt(10000));
        return otp;
    }

    public void sendOTP(String email){
        LOGGER.info("The OTP is: " + otp);
        String subject = "Reset Password";
        String body = "The OTP is: " + otp;
        userEmail = email;
        emailService.sendEmail(email, subject, body);
    }

    public void resetPassword(String password){
        userService.resetPassword(userEmail, password);
    }

    public boolean compareOTP(String inputOTP) {
        return inputOTP.equals(otp);
    }

}
