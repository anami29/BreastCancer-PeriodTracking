package com.example.healthappbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.*;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "http://localhost:3000")
public class HospitalController {

    private final String GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY";

    @GetMapping("/search")
    public List<Map<String, Object>> searchHospitals(
            @RequestParam String city) {

        String url = "https://maps.googleapis.com/maps/api/place/textsearch/json" +
                "?query=breast+hospital+in+" + city +
                "&key=" + GOOGLE_API_KEY;

        RestTemplate restTemplate = new RestTemplate();
        Map response = restTemplate.getForObject(url, Map.class);

        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

        List<Map<String, Object>> finalList = new ArrayList<>();

        for (Map h : results) {
            Map<String, Object> obj = new HashMap<>();
            obj.put("name", h.get("name"));
            obj.put("address", h.get("formatted_address"));
            obj.put("rating", h.get("rating"));

            // --- Demo pricing (can move to DB later) ---
            obj.put("mammography", "₹1500 - ₹2500");
            obj.put("ultrasound", "₹1000 - ₹1800");
            obj.put("biopsy", "₹3000 - ₹6000");

            finalList.add(obj);
        }

        return finalList;
    }
}
