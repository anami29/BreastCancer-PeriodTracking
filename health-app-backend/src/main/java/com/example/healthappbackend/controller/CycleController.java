package com.example.healthappbackend.controller;

import com.example.healthappbackend.model.User;
import com.example.healthappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit; // Import TimeUnit

@RestController
@RequestMapping("/api/cycle")
@CrossOrigin(origins = "http://localhost:3000")
public class CycleController {

    @Autowired
    private UserRepository userRepository;

    // Endpoint to log a new period start date (remains the same)
    @PostMapping("/log")
    public ResponseEntity<?> logPeriodStartDate(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String dateString = request.get("date");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        User user = userOptional.get();

        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date periodStartDate = formatter.parse(dateString);

            List<Date> dates = user.getPeriodStartDates();
            if (!dates.contains(periodStartDate)) {
                dates.add(periodStartDate);
                dates.sort(Date::compareTo);
                user.setPeriodStartDates(dates);
                userRepository.save(user);
            }
            return new ResponseEntity<>(Map.of("message", "Period date logged successfully"), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Invalid date format. Please use yyyy-MM-dd.", HttpStatus.BAD_REQUEST);
        }
    }

    // --- NEW: Endpoint to get cycle length history ---
    @GetMapping("/history")
    public ResponseEntity<?> getCycleHistory(@RequestParam String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        User user = userOptional.get();
        List<Date> periodDates = user.getPeriodStartDates();

        // Ensure dates are sorted
        periodDates.sort(Date::compareTo);

        List<Long> cycleLengths = new ArrayList<>();
        if (periodDates.size() > 1) {
            // Calculate the difference between consecutive dates
            for (int i = 1; i < periodDates.size(); i++) {
                long diffInMillis = Math.abs(periodDates.get(i).getTime() - periodDates.get(i - 1).getTime());
                long diffInDays = TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS);
                cycleLengths.add(diffInDays);
            }
        }

        // Return the list of cycle lengths (as days)
        return new ResponseEntity<>(cycleLengths, HttpStatus.OK);
    }
}