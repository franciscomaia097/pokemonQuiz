package com.example.demo.Leaderboard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LeaderboardEntryRepository extends JpaRepository<LeaderboardEntry, Long> {


    @Query("SELECT le FROM LeaderboardEntry le ORDER BY le.score DESC")
    List<LeaderboardEntry> findTopNByOrderByScoreDesc(int numberOfScores);
}
