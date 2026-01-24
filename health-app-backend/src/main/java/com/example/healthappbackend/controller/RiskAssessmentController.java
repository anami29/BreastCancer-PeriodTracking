package com.example.healthappbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

@RestController
@RequestMapping("/api/risk-assessment")
@CrossOrigin(origins = "http://localhost:3000")
public class RiskAssessmentController {

    private static final Logger logger = LoggerFactory.getLogger(RiskAssessmentController.class);

    @PostMapping("/calculate")
    public ResponseEntity<?> calculateRisk(@RequestBody Map<String, Object> requestData) {
        logger.info("Received risk assessment request: {}", requestData);

        try {
            // Extract and validate form data
            int age = Integer.parseInt(requestData.get("age").toString());
            double heightCm = Double.parseDouble(requestData.get("height").toString());
            double weight = Double.parseDouble(requestData.get("weight").toString());
            String maternalHistory = (String) requestData.get("maternalHistory");
            String paternalHistory = (String) requestData.get("paternalHistory");
            int menarcheAge = Integer.parseInt(requestData.get("menarcheAge").toString());

            // Handle optional parity field
            int parity = 0;
            if (requestData.get("parity") != null && !requestData.get("parity").toString().isEmpty()) {
                parity = (int) Math.round(Double.parseDouble(requestData.get("parity").toString()));
            }

            String hrtUse = (String) requestData.get("hrtUse");
            String brcaStatus = (String) requestData.get("brcaStatus");
            String biopsyHistory = (String) requestData.get("biopsyHistory");

            logger.info("Parsed data - Age: {}, Height: {}cm, Weight: {}kg, Menarche: {}, Parity: {}",
                    age, heightCm, weight, menarcheAge, parity);

            // Convert height from cm to meters and calculate BMI
            double heightM = heightCm / 100.0;
            double bmi = weight / (heightM * heightM);

            logger.info("Calculated BMI: {}", bmi);

            // Calculate Tyrer-Cuzick risk score
            double riskScore = calculateTyrerCuzickRisk(age, bmi, maternalHistory, paternalHistory,
                    menarcheAge, parity, hrtUse, brcaStatus, biopsyHistory);

            logger.info("Calculated risk score: {}", riskScore);

            // Calculate lifetime risk percentage
            double baseRisk = 12.0; // Base lifetime risk for average woman
            double adjustedRisk = baseRisk * (1 + riskScore / 5.0);

            // Ensure risk is within reasonable bounds
            adjustedRisk = Math.max(5.0, Math.min(50.0, adjustedRisk));

            logger.info("Calculated lifetime risk: {}%", adjustedRisk);

            // Determine risk level
            String riskLevel = determineRiskLevel(adjustedRisk);

            // Get recommendations
            List<String> recommendations = getRecommendations(riskLevel);

            // Return the result in the expected format
            Map<String, Object> result = new HashMap<>();
            result.put("risk_level", riskLevel);
            result.put("lifetime_risk_percentage", Math.round(adjustedRisk * 10.0) / 10.0);
            result.put("risk_score", Math.round(riskScore * 100.0) / 100.0);
            result.put("model_used", "Inspired by Tyrer-Cuzick");
            result.put("recommendations", recommendations);

            logger.info("Returning result: {}", result);
            return ResponseEntity.ok(result);

        } catch (NumberFormatException e) {
            logger.error("Number format error in risk calculation: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid number format in input data. Please check your entries."));
        } catch (NullPointerException e) {
            logger.error("Missing required field in risk calculation: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Missing required fields. Please fill in all required information."));
        } catch (Exception e) {
            logger.error("Unexpected error in risk calculation: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Error calculating risk. Please try again."));
        }
    }

    private double calculateTyrerCuzickRisk(int age, double bmi, String maternalHistory, String paternalHistory,
            int menarcheAge, int parity, String hrtUse, String brcaStatus, String biopsyHistory) {
        double riskScore = 0.0;

        // Age factor
        if (age < 40) {
            riskScore += 0.5;
        } else if (40 <= age && age < 50) {
            riskScore += 1.0;
        } else if (50 <= age && age < 60) {
            riskScore += 1.5;
        } else {
            riskScore += 2.0;
        }

        // Family history (first-degree relatives)
        double familyRisk = 0;
        if ("yes".equals(maternalHistory)) {
            familyRisk += 2.0;
        }
        if ("yes".equals(paternalHistory)) {
            familyRisk += 1.5;
        }
        riskScore += familyRisk;

        // BRCA status
        if ("positive".equals(brcaStatus)) {
            riskScore += 5.0;
        } else if ("negative".equals(brcaStatus)) {
            riskScore -= 0.5;
        }

        // Reproductive factors
        if (menarcheAge < 12) {
            riskScore += 1.0;
        } else if (menarcheAge > 14) {
            riskScore -= 0.5;
        }

        if (parity == 0) {
            riskScore += 1.0;
        } else if (parity >= 3) {
            riskScore -= 0.5;
        }

        // BMI
        if (bmi > 30) {
            riskScore += 1.0;
        } else if (bmi < 20) {
            riskScore += 0.5;
        }

        // HRT use
        if ("yes".equals(hrtUse)) {
            riskScore += 0.5;
        }

        // Biopsy history
        if ("yes".equals(biopsyHistory)) {
            riskScore += 1.0;
        }

        return riskScore;
    }

    private String determineRiskLevel(double lifetimeRisk) {
        if (lifetimeRisk >= 25) {
            return "High Risk - Consult a Specialist Immediately";
        } else if (lifetimeRisk >= 15) {
            return "Moderate Risk - Regular Screening Recommended";
        } else {
            return "Average Risk - Follow Standard Screening Guidelines";
        }
    }

    private List<String> getRecommendations(String riskLevel) {
        List<String> recommendations = new ArrayList<>();

        if (riskLevel.contains("High Risk")) {
            recommendations.add("Consult a breast specialist or genetic counselor");
            recommendations.add("Consider genetic testing for BRCA mutations");
            recommendations.add("Annual MRI and mammogram starting at age 25-30");
            recommendations.add("Discuss risk-reducing options like medication or surgery");
        } else if (riskLevel.contains("Moderate Risk")) {
            recommendations.add("Annual mammogram starting at age 40");
            recommendations.add("Clinical breast exam every 6-12 months");
            recommendations.add("Consider tomosynthesis (3D mammography)");
            recommendations.add("Maintain healthy lifestyle and weight");
        } else {
            recommendations.add("Follow standard screening guidelines");
            recommendations.add("Annual mammogram starting at age 40-50");
            recommendations.add("Monthly self-breast exams");
            recommendations.add("Report any changes to healthcare provider");
        }

        return recommendations;
    }
}
