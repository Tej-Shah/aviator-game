const express = require("express");
const router = express.Router();

let multiplier = 1.0;
let isPlaying = false;
let interval;
let intervalSpeed = 700;

const startGame = () => {
  if (isPlaying) return; // Prevent multiple games from starting

  isPlaying = true;
  multiplier = 1.0;
  intervalSpeed = 700;

  interval = setInterval(() => {
    multiplier = parseFloat((multiplier + 0.1).toFixed(2));
    intervalSpeed = Math.min(intervalSpeed * 1.015, 2000);
  }, intervalSpeed);
};

const stopGame = () => {
  isPlaying = false;
  clearInterval(interval);
};

// API Endpoint to Start the Game
router.post("/start", (req, res) => {
  startGame();
  res.json({ message: "Game started", multiplier });
});

// API Endpoint to Get the Current Multiplier
router.get("/multiplier", (req, res) => {
  res.json({ multiplier });
});

// API Endpoint to Cash Out
router.post("/cashout", (req, res) => {
  if (isPlaying) {
    stopGame();
    res.json({ message: `Cashed out at ${multiplier}x`, multiplier });
  } else {
    res.json({ message: "No active game" });
  }
});

module.exports = router;
