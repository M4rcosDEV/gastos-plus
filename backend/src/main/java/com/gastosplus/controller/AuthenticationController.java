package com.gastosplus.controller;

import com.gastosplus.dto.user.AuthenticationDTO;
import com.gastosplus.dto.user.LoginResponseDTO;
import com.gastosplus.dto.user.RegisterDTO;
import com.gastosplus.dto.user.UserDTO;
import com.gastosplus.entity.User;
import com.gastosplus.repository.UserRepository;
import com.gastosplus.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamepassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamepassword);
        var token = jwtService.generateToken((User) auth.getPrincipal());

        User user = (User) auth.getPrincipal();

        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhotoUrl(),
                user.getRole().name()
        );

        return ResponseEntity.ok(new LoginResponseDTO(token, userDTO));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        if(this.userRepository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.name(), data.email(), encryptedPassword, data.photoUrl(), data.role());

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
}
