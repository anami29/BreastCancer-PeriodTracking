package com.example.healthappbackend.controller;

import com.example.healthappbackend.model.User;
import com.example.healthappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/streak")
@CrossOrigin(origins = "http://localhost:3000")
public class StreakController {

    @Autowired
    private UserRepository userRepository;

    // Endpoint to get streak data for a specific section
    @GetMapping("/{section}")
    public ResponseEntity<?> getStreakData(@PathVariable String section, @RequestParam String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        User user = userOptional.get();
        Map<String, Object> streakData;

        if ("menstruation".equalsIgnoreCase(section)) {
            streakData = Map.of(
                "currentStreak", user.getMenstruationStreak(),
                "longestStreak", user.getLongestMenstruationStreak(),
                "totalPosts", user.getTotalPosts() // Adjust if needed
            );
        } else if ("breastcancer".equalsIgnoreCase(section)) {
            streakData = Map.of(
                "currentStreak", user.getBreastCancerStreak(), // Represents intervals
                "longestStreak", user.getLongestBreastCancerStreak(),
                "totalPosts", user.getTotalPosts() // Adjust if needed
            );
        } else {
            return new ResponseEntity<>("Invalid section", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(streakData, HttpStatus.OK);
    }

    // Endpoint called when user performs the streak action
    @PostMapping("/checkin/{section}")
    public ResponseEntity<?> checkIn(@PathVariable String section, @RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        User user = userOptional.get();
        Date today = new Date();

        if ("menstruation".equalsIgnoreCase(section)) {
            // --- Placeholder Menstruation Logic ---
            // TODO: Implement actual logic based on period dates
            Date lastActivity = user.getLastMenstruationActivity();
            if (lastActivity == null) {
                user.setMenstruationStreak(1);
            } else {
                long diffInMillis = Math.abs(today.getTime() - lastActivity.getTime());
                long diffInDays = TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS);
                // Simplified: Check if last activity was yesterday (adjust for 4-day rule later)
                if (diffInDays == 1) {
                    user.setMenstruationStreak(user.getMenstruationStreak() + 1);
                } else if (diffInDays > 1) {
                    user.setMenstruationStreak(1);
                }
            }
            if (user.getMenstruationStreak() > user.getLongestMenstruationStreak()) {
                user.setLongestMenstruationStreak(user.getMenstruationStreak());
            }
            user.setLastMenstruationActivity(today);
            // --- End Placeholder ---

        } else if ("breastcancer".equalsIgnoreCase(section)) {
            // --- Placeholder Breast Cancer Logic ---
            // TODO: Implement actual logic based on age and interval
            Date lastActivity = user.getLastBreastCancerActivity();
            int ageYears = 0;
            try {
                LocalDate birthDate = LocalDate.parse(user.getDateOfBirth());
                ageYears = Period.between(birthDate, LocalDate.now()).getYears();
            } catch (Exception e) { /* Handle parse error */ }

            int requiredInterval = (ageYears > 30) ? 14 : 30; // 14 days or 30 days (approx month)

            if (lastActivity == null) {
                user.setBreastCancerStreak(1);
            } else {
                long diffInMillis = Math.abs(today.getTime() - lastActivity.getTime());
                long diffInDays = TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS);
                
                // Simplified: Just check if *any* activity happened within the interval
                if (diffInDays <= requiredInterval) {
                     // We don't increment here easily, streak counts successful intervals.
                     // A more complex check is needed comparing intervals. For now, just update date.
                } else {
                     // Interval missed, reset (placeholder logic)
                     user.setBreastCancerStreak(0); // Resetting, a better logic is needed
                }
                 // Placeholder: Incrementing for demo purposes
                user.setBreastCancerStreak(user.getBreastCancerStreak() + 1);
            }
             if (user.getBreastCancerStreak() > user.getLongestBreastCancerStreak()) {
                user.setLongestBreastCancerStreak(user.getBreastCancerStreak());
            }
            user.setLastBreastCancerActivity(today);
            // --- End Placeholder ---
        } else {
            return new ResponseEntity<>("Invalid section", HttpStatus.BAD_REQUEST);
        }

        userRepository.save(user);
        return new ResponseEntity<>(Map.of("message", "Check-in successful"), HttpStatus.OK);
    }
}