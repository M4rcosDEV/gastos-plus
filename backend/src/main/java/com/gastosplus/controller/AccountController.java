package com.gastosplus.controller;

import com.gastosplus.dto.account.CreateAccountDTO;
import com.gastosplus.entity.Account;
import com.gastosplus.entity.User;
import com.gastosplus.repository.AccountRepository;
import com.gastosplus.repository.UserRepository;
import com.gastosplus.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<String> newAccount(@RequestBody @Valid CreateAccountDTO data){
        accountService.createAccount(data);
        return ResponseEntity.status(HttpStatus.CREATED).body("Account created success");
    }
}
