package com.eventhub.service;

import com.eventhub.dto.UserDto;
import com.eventhub.entity.User;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDto getProfile(String email) {
        return toDto(findByEmail(email));
    }

    public UserDto updateProfile(String email, UserDto dto) {
        User user = findByEmail(email);
        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getProfileImage() != null) user.setProfileImage(dto.getProfileImage());
        return toDto(userRepository.save(user));
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public UserDto toDto(User u) {
        UserDto dto = new UserDto();
        dto.setId(u.getId());
        dto.setName(u.getName());
        dto.setEmail(u.getEmail());
        dto.setRole(u.getRole().name());
        dto.setProfileImage(u.getProfileImage());
        dto.setCreatedAt(u.getCreatedAt());
        return dto;
    }
}
