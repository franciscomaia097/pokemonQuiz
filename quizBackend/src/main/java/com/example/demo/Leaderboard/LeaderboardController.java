package com.example.demo.Leaderboard;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @Autowired
    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @PostMapping("/score")
    public ResponseEntity<Map<String, String>> saveScore(@RequestBody LeaderboardEntry request){
        leaderboardService.saveScore(request.getUsername(), request.getScore());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Score saved");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetLeaderboard() {
        leaderboardService.resetLeaderboard();
        return new ResponseEntity<>("Leaderboard reset successfully", HttpStatus.OK);
    }

    @GetMapping("/top-scores")
    public ResponseEntity<List<LeaderboardEntry>> getTopScores(@RequestParam("count") int count) {
        List<LeaderboardEntry> topScores = leaderboardService.getTopScores(count);
        return ResponseEntity.ok(topScores);
    }
}
