package com.incubator.springapi.services;

import com.incubator.springapi.interfaces.IEmailService;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements IEmailService {
    private final JavaMailSender emailSender;

    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("user");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            emailSender.send(message);
        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }
}
