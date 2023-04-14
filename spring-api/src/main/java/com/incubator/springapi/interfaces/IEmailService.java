package com.incubator.springapi.interfaces;

public interface IEmailService {
    void sendEmail(String to, String subject, String body);

}
