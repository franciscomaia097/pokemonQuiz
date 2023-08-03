package com.example.demo.Leaderboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class LeaderboardService {

    private final LeaderboardEntryRepository leaderboardEntryRepository;


    // Constructor-based dependency injection using @Autowired
    @Autowired
    public LeaderboardService(LeaderboardEntryRepository leaderboardEntryRepository) {
        this.leaderboardEntryRepository = leaderboardEntryRepository;
    }

    // Method to save a user's score to the leaderboard
    public void saveScore(String username, int score){

        LeaderboardEntry entry = new LeaderboardEntry();
        entry.setUsername(username);
        entry.setScore(score);
        entry.setDate(new Date());
        leaderboardEntryRepository.save(entry);

    }

    public List<LeaderboardEntry> getTopScores(int numberOfScores) {
        // Retrieve the top N leaderboard entries ordered by score in descending order
        return leaderboardEntryRepository.findTopNByOrderByScoreDesc(numberOfScores);
    }

    public void resetLeaderboard() {
        leaderboardEntryRepository.deleteAll();
    }
}
