package com.coursecontentsystem.service;

import com.coursecontentsystem.dto.UserCreationDTO;
import com.coursecontentsystem.dto.UserDTO;
import com.coursecontentsystem.dto.UserUpdateDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserDTO createUser(UserCreationDTO userCreationDTO);

    UserDTO getUserById(Long id);

    UserDTO getUserByUsername(String username);

    Page<UserDTO> getAllUsers(Pageable pageable);

    UserDTO updateUser(Long id, UserUpdateDTO userUpdateDTO);

    void deleteUser(Long id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
