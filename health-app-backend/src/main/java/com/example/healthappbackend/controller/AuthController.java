package com.example.healthappbackend.controller;

import com.example.healthappbackend.model.User;
import com.example.healthappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired private UserRepository userRepository;
    @Autowired private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> signupRequest) {
        String name = signupRequest.get("name");
        String email = signupRequest.get("email");
        String phone = signupRequest.get("phone");
        String dateOfBirth = signupRequest.get("dateOfBirth");
        String password = signupRequest.get("password");

        if (userRepository.findByEmail(email).isPresent()) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(name, email, dateOfBirth, hashedPassword);
        user.setPhone(phone);
        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        String loginIdentifier = loginRequest.get("loginIdentifier");
        String password = loginRequest.get("password");

        Optional<User> userOptional = userRepository.findByEmail(loginIdentifier);
        if (userOptional.isEmpty()) {
            userOptional = userRepository.findByPhone(loginIdentifier);
        }

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {

                // --- UPDATED Streak Logic (using loginStreak fields) ---
                Date today = new Date();
                Date lastLogin = user.getLastLoginDate();
                if (lastLogin == null) {
                    user.setLoginStreak(1); // Use setLoginStreak
                } else {
                    long diffInMillis = Math.abs(today.getTime() - lastLogin.getTime());
                    long diffInDays = TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS);
                    if (diffInDays == 1) {
                        user.setLoginStreak(user.getLoginStreak() + 1); // Use getLoginStreak and setLoginStreak
                    } else if (diffInDays > 1) {
                        user.setLoginStreak(1); // Use setLoginStreak
                    }
                }
                // Use getLoginStreak and getLongestLoginStreak
                if (user.getLoginStreak() > user.getLongestLoginStreak()) {
                    user.setLongestLoginStreak(user.getLoginStreak()); // Use setLongestLoginStreak
                }
                user.setLastLoginDate(today);
                userRepository.save(user);
                // --- End of UPDATED Streak Logic ---

                return new ResponseEntity<>(Map.of("message", "Login successful!", "user", user.getName(), "email", user.getEmail()), HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    // This endpoint remains but now uses loginStreak fields for consistency
    @GetMapping("/streak")
    public ResponseEntity<?> getStreakData(@RequestParam String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Map<String, Object> streakData = Map.of(
                "currentStreak", user.getLoginStreak(), // Use getLoginStreak
                "longestStreak", user.getLongestLoginStreak(), // Use getLongestLoginStreak
                "totalPosts", user.getTotalPosts()
            );
            return new ResponseEntity<>(streakData, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
}