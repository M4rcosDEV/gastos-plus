package com.gastosplus.controller;

import com.gastosplus.dto.user.AuthenticationDTO;
import com.gastosplus.dto.user.LoginResponseDTO;
import com.gastosplus.dto.user.RegisterDTO;
import com.gastosplus.dto.user.UserDTO;
import com.gastosplus.entity.Account;
import com.gastosplus.entity.User;
import com.gastosplus.repository.AccountRepository;
import com.gastosplus.repository.UserRepository;
import com.gastosplus.service.JwtService;
import com.gastosplus.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private AccountRepository accountRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/current-user")
    public ResponseEntity<UserDTO> getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || !authentication.isAuthenticated()){
            return ResponseEntity.status(401).build();
        }

        User user = (User) authentication.getPrincipal();

        UserDTO userDTO = userService.mapToDto(user);

        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamepassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamepassword);
        var token = jwtService.generateToken((User) auth.getPrincipal());

        var expiresIn = jwtService.getExpirationDateFromToken(token);

        User user = (User) auth.getPrincipal();

        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhotoUrl(),
                user.getRole().name()
        );

        return ResponseEntity.ok(new LoginResponseDTO(token, expiresIn, userDTO));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO data) {
        if(this.userRepository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.name(), data.email(), encryptedPassword, data.photoUrl(), data.role());

        this.userRepository.save(newUser);

        Account walletAccount = new Account();

        //Create a wallet account immediately after the user registers.

        walletAccount.setAccountName("Carteira");
        walletAccount.setColor("#000000");
        walletAccount.setUser(newUser);

        this.accountRepository.save(walletAccount);
        return ResponseEntity.ok().build();
    }
}
