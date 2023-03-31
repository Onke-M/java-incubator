package com.incubator.springapi.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/token")
@CrossOrigin(origins ={"http://localhost:4200"}, methods={RequestMethod.GET, RequestMethod.POST})
public class AuthController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final JwtEncoder jwtEncoder;
    @Autowired
    public AuthController(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    @GetMapping()
    public String loginToken(Authentication authentication) {
        return "Hello" + " " ;
    }

    @PostMapping()
    public String JWTToken(Authentication authentication) {
        LOGGER.info("Hitting Endpoint");

        Instant now = Instant.now();
        Long expiry = 259200L;
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining());

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(authentication.getName())
                .claim("roles", scope)
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
