package com.example.healthappbackend.controller;

import com.example.healthappbackend.model.User;
import com.example.healthappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
// No CrossOrigin needed here because we have a global WebConfig
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getUserProfile(@RequestParam String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isPresent()) {
            // If the user is found, send their data with a 200 OK status
            return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
        }
        
        // If the user is not found, send a 404 Not Found status
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
}