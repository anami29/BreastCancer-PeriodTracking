package com.example.healthappbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
// --- NEW: Inner class to represent a Menstrual Cycle ---
class MenstrualCycle {
    private Date startDate;
    private int durationDays; // Duration in days

    public MenstrualCycle(Date startDate, int durationDays) {
        this.startDate = startDate;
        this.durationDays = durationDays;
    }

    // Getters and Setters
    public Date getStartDate() { return startDate; }
    public void setStartDate(Date startDate) { this.startDate = startDate; }
    public int getDurationDays() { return durationDays; }
    public void setDurationDays(int durationDays) { this.durationDays = durationDays; }

    // Override equals and hashCode if needed for duplicate checks based on startDate
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MenstrualCycle that = (MenstrualCycle) o;
        return startDate != null ? startDate.equals(that.startDate) : that.startDate == null;
    }
    @Override
    public int hashCode() {
        return startDate != null ? startDate.hashCode() : 0;
    }
}
@Document(collection = "users")
public class User {

    @Id private String id;
    private String name;
    @Indexed(unique = true) private String email;
    private String dateOfBirth;
    private String password;
    @Indexed(unique = true, sparse = true) private String phone;

    // Streak Fields
    private int loginStreak = 0;
    private int longestLoginStreak = 0;
    private Date lastLoginDate;
    private int menstruationStreak = 0;
    private int longestMenstruationStreak = 0;
    private Date lastMenstruationActivity;
    private int breastCancerStreak = 0;
    private int longestBreastCancerStreak = 0;
    private Date lastBreastCancerActivity;
    private List<Date> periodStartDates = new ArrayList<>();
    private List<MenstrualCycle> cycles = new ArrayList<>();

    // Profile Fields
    private String lastName;
    private String fatherName;
    private String age;
    private String gender;
    private String address;
    private String bloodGroup;
    private String maritalStatus;
    private String primaryPhysician;
    private String knownAllergies;
    private String chronicConditions;
    private String currentMedication;
    private String previousSurgeries;
    private int totalPosts = 0;

    // Constructor
    public User(String name, String email, String dateOfBirth, String password) {
        this.name = name; this.email = email; this.dateOfBirth = dateOfBirth; this.password = password;
    }

    // --- GETTERS AND SETTERS FOR ALL FIELDS ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public int getLoginStreak() { return loginStreak; }
    public void setLoginStreak(int loginStreak) { this.loginStreak = loginStreak; }
    public int getLongestLoginStreak() { return longestLoginStreak; }
    public void setLongestLoginStreak(int longestLoginStreak) { this.longestLoginStreak = longestLoginStreak; }
    public Date getLastLoginDate() { return lastLoginDate; }
    public void setLastLoginDate(Date lastLoginDate) { this.lastLoginDate = lastLoginDate; }
    public int getMenstruationStreak() { return menstruationStreak; }
    public void setMenstruationStreak(int menstruationStreak) { this.menstruationStreak = menstruationStreak; }
    public int getLongestMenstruationStreak() { return longestMenstruationStreak; }
    public void setLongestMenstruationStreak(int longestMenstruationStreak) { this.longestMenstruationStreak = longestMenstruationStreak; }
    public Date getLastMenstruationActivity() { return lastMenstruationActivity; }
    public void setLastMenstruationActivity(Date lastMenstruationActivity) { this.lastMenstruationActivity = lastMenstruationActivity; }
    public int getBreastCancerStreak() { return breastCancerStreak; }
    public void setBreastCancerStreak(int breastCancerStreak) { this.breastCancerStreak = breastCancerStreak; }
    public int getLongestBreastCancerStreak() { return longestBreastCancerStreak; }
    public void setLongestBreastCancerStreak(int longestBreastCancerStreak) { this.longestBreastCancerStreak = longestBreastCancerStreak; }
    public Date getLastBreastCancerActivity() { return lastBreastCancerActivity; }
    public void setLastBreastCancerActivity(Date lastBreastCancerActivity) { this.lastBreastCancerActivity = lastBreastCancerActivity; }
    public List<Date> getPeriodStartDates() { return periodStartDates; }
    public void setPeriodStartDates(List<Date> periodStartDates) { this.periodStartDates = periodStartDates; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getFatherName() { return fatherName; }
    public void setFatherName(String fatherName) { this.fatherName = fatherName; }
    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }
    public String getPrimaryPhysician() { return primaryPhysician; }
    public void setPrimaryPhysician(String primaryPhysician) { this.primaryPhysician = primaryPhysician; }
    public String getKnownAllergies() { return knownAllergies; }
    public void setKnownAllergies(String knownAllergies) { this.knownAllergies = knownAllergies; }
    public String getChronicConditions() { return chronicConditions; }
    public void setChronicConditions(String chronicConditions) { this.chronicConditions = chronicConditions; }
    public String getCurrentMedication() { return currentMedication; }
    public void setCurrentMedication(String currentMedication) { this.currentMedication = currentMedication; }
    public String getPreviousSurgeries() { return previousSurgeries; }
    public void setPreviousSurgeries(String previousSurgeries) { this.previousSurgeries = previousSurgeries; }
    public int getTotalPosts() { return totalPosts; }
    public void setTotalPosts(int totalPosts) { this.totalPosts = totalPosts; }
    public List<MenstrualCycle> getCycles() { return cycles; }
    public void setCycles(List<MenstrualCycle> cycles) { this.cycles = cycles; }
}