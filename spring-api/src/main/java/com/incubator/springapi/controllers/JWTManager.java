package com.incubator.springapi.controllers;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

@Configuration
public class JWTManager {

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter(Converter jwtRoleConverter){
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtRoleConverter);
        return jwtAuthenticationConverter;
    }
}
