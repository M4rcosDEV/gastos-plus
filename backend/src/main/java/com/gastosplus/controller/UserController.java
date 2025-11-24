package com.gastosplus.controller;

import com.gastosplus.entity.User;
import com.gastosplus.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    List<User> all() {
        return userService.findAll();
    }

    @PostMapping
    public User newUser(@RequestBody User newUser) {
        return userService.save(newUser);
    }

    @GetMapping("/me")
    public String getLoggedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = (User) auth.getPrincipal();

        return "User authenticated: " + user;
    }
}
