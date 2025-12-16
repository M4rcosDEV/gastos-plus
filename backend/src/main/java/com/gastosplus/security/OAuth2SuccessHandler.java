package com.gastosplus.security;

import com.gastosplus.entity.Account;
import com.gastosplus.entity.User;
import com.gastosplus.enums.UserRole;
import com.gastosplus.repository.AccountRepository;
import com.gastosplus.repository.UserRepository;
import com.gastosplus.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        String email = oauth2User.getAttribute("email");

        User user = (User) userRepository.findByEmail(email);

        if (user == null) {
            user = new User();
            user.setName(oauth2User.getAttribute("name"));
            user.setEmail(email);
            user.setPhotoUrl(oauth2User.getAttribute("picture"));
            user.setRole(UserRole.USER);
            user.setPassword(new BCryptPasswordEncoder().encode(UUID.randomUUID().toString()));

            userRepository.save(user);

            Account walletAccount = new Account();
            walletAccount.setAccountName("Carteira");
            walletAccount.setColor("#000000");
            walletAccount.setUser(user);
            accountRepository.save(walletAccount);
        }
        String token = jwtService.generateToken(user);

        String redirectUrl =
                "http://localhost:5173/oauth-success?token=" + token;

        response.sendRedirect(redirectUrl);;
    }
}
