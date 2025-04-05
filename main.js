const express = require("express");
const router = express.Router();

let multiplier = 1.00;
let isPlaying = false;
let interval;
let intervalSpeed = 1000;

let currentBet = 0; // Store user input
let totalWinnings = 0; // Accumulated winnings

const startGame = (bet) => {
  if (isPlaying) return;

  isPlaying = true;
  multiplier = 1.00;
  intervalSpeed = 1000;
  currentBet = parseFloat(bet); // Save user input bet

  interval = setInterval(() => {
    multiplier = parseFloat((multiplier + 0.05).toFixed(2));
    intervalSpeed = Math.min(intervalSpeed * 1.020, 5000);
  }, intervalSpeed);
};

const stopGame = () => {
  isPlaying = false;
  clearInterval(interval);
};

// POST /start with JSON: { "betAmount": 50 }
router.post("/start", (req, res) => {
  const { betAmount } = req.body;

  if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
    return res.status(400).json({ message: "Invalid bet amount" });
  }

  startGame(betAmount);
  res.json({ message: "Game started", multiplier });
});

// GET current multiplier
router.get("/multiplier", (req, res) => {
  res.json({ multiplier });
});

// POST /cashout
router.post("/cashout", (req, res) => {
  if (isPlaying) {
    stopGame();
    const winnings = parseFloat((currentBet * multiplier).toFixed(2));
    totalWinnings += winnings;

    res.json({
      message: `Cashed out at ${multiplier}x and won $${winnings}`,
      winnings,
      totalWinnings
    });
  } else {
    res.json({ message: "No active game" });
  }
});

// Optional: Get total winnings
router.get("/total", (req, res) => {
  res.json({ totalWinnings });
});

module.exports = router;
