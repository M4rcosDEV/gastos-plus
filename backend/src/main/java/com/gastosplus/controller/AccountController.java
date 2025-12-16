package com.gastosplus.controller;

import com.gastosplus.dto.account.AccountResponseDTO;
import com.gastosplus.dto.account.CreateAccountDTO;
import com.gastosplus.dto.account.UpdateAccountDTO;
import com.gastosplus.entity.User;
import com.gastosplus.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<List<AccountResponseDTO>> findAllAccountsByUserId(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        List<AccountResponseDTO> listAccounts = accountService.findAllByUserId(user.getId()).stream()
                .map(AccountResponseDTO::fromEntity)
                .toList();

        return ResponseEntity.ok(listAccounts);
    }

    @PostMapping
    public ResponseEntity<?> newAccount(@RequestBody @Valid CreateAccountDTO data){
        try{
            accountService.createAccount(data);
            return ResponseEntity.status(HttpStatus.CREATED).body("Account created success");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateAccount(
            @PathVariable String id,
            @RequestBody @Valid UpdateAccountDTO dto) {

        // Chama o método do serviço que já contém a lógica de mapeamento MapStruct
        accountService.updateAccount(id, dto);

        // Retorna um status HTTP 204 No Content, que é o padrão
        // para operações PATCH/PUT bem-sucedidas que não retornam um corpo.
        return ResponseEntity.noContent().build();
    }
}
