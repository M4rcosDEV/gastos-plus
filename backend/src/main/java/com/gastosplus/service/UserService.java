package com.gastosplus.service;

import com.gastosplus.dto.user.UserDTO;
import com.gastosplus.entity.User;
import com.gastosplus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User save(User user){
        return userRepository.save(user);
    }


    public User update(Long id, User user){
        User userExisting = findById(id);

        userExisting.setName(user.getName());
        userExisting.setEmail(user.getEmail());
        userExisting.setPhotoUrl(user.getPhotoUrl());

        return save(userExisting);
    }

    public void delete(Long id){
        userRepository.deleteById(id);
    }

    public UserDTO mapToDto(User user){
        return new UserDTO (
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhotoUrl(),
                user.getRole().getRole()
        );
    }
}
