package com.incubator.springapi.controllers;

import com.incubator.springapi.entities.LoginDTO;
import com.incubator.springapi.entities.User;
import com.incubator.springapi.interfaces.IResetPasswordService;
import com.incubator.springapi.interfaces.IUserService;
import com.incubator.springapi.services.MyUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private PasswordEncoder passwordEncoder;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    private final IUserService userService;
    private final IResetPasswordService resetPasswordService;
    @Autowired
    public AuthController(JwtEncoder jwtEncoder, MyUserDetailsService myUserDetailsService, PasswordEncoder passwordEncoder, IUserService userService, IResetPasswordService resetPasswordService) {
        this.jwtEncoder = jwtEncoder;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.resetPasswordService = resetPasswordService;
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

    @PutMapping()
    @RequestMapping("/resetPassword")
    public ResponseEntity<?> ResetPassword(@RequestBody String password){
        try {
            resetPasswordService.resetPassword(password);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    @RequestMapping("/getOTP")
    public ResponseEntity<?> GetOTP(@RequestParam String email){
        try {
            String otp = resetPasswordService.generateOTP();
            resetPasswordService.sendOTP(email);
            return new ResponseEntity<>(otp, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    @RequestMapping("/compareOTP")
    public ResponseEntity<?> CompareOTP(@RequestParam String otp){
        try {
            if(resetPasswordService.compareOTP(otp)) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    @RequestMapping("/login")
    public ResponseEntity<?> Login(@RequestBody LoginDTO loginDTO) {
        User user = userService.getUserByEmail(loginDTO.getUsername());
        if(user!=null){
        LOGGER.info("User Exists");

            if(encoder.matches(loginDTO.getPassword(), user.getPassword())){
                LOGGER.info("Password is the same");


                Instant now = Instant.now();
                Long expiry = 259200L;
                String scope = String.valueOf(user.getRole().getRoleDesc());

                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(now)
                        .expiresAt(now.plusSeconds(expiry))
                        .subject(user.getUsername())
                        .claim("role", scope)
                        .id(user.getUserID().toString())
                        .build();

                JSONObject jo = new JSONObject();
                jo.put("token", jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue());
                return new ResponseEntity<>(jo.toString(), HttpStatus.OK);

            }
            LOGGER.info("Password is not the same");
            return null;
        }
        LOGGER.info("User does not exist");
        return null;
    }
}
