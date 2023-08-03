package com.example.demo.Leaderboard;

import jakarta.persistence.*;


import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class LeaderboardEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private int score;
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;


    public LeaderboardEntry() {

    }

    public LeaderboardEntry(Long id, String username, int score, Date date) {
        this.id = id;
        this.username = username;
        this.score = score;
        this.date = date;
    }

    public LeaderboardEntry(String username, int score, Date date) {
        this.username = username;
        this.score = score;
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }


}
