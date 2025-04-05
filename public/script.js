const aviatorGame = document.getElementById('aviatorGame')
const navbar = document.getElementById('navbar');
const styleAviator = document.createElement('style');  


// Now add script logic programmatically
const multiplierDisplay = document.getElementById("multiplier");
const startButton = document.getElementById("start");
const cashoutButton = document.getElementById("cashout");

let interval;

startButton.addEventListener("click", async () => {
    await fetch("http://localhost:3000/start", { method: "POST" });
    cashoutButton.disabled = false;
    startButton.disabled = true;
    
    interval = setInterval(async () => {
        const response = await fetch("http://localhost:3000/multiplier");
        const data = await response.json();
        multiplierDisplay.textContent = data.multiplier;
        }, 500);
        });
        
        cashoutButton.addEventListener("click", async () => {
            const response = await fetch("http://localhost:3000/cashout", { method: "POST" });
            const data = await response.json();
            alert(data.message);
            clearInterval(interval);
            cashoutButton.disabled = true;
            startButton.disabled = false;
});

const betInput = document.getElementById("betAmount");

startButton.addEventListener("click", async () => {
    const betAmount = parseFloat(betInput.value);

    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    await fetch("http://localhost:3000/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ betAmount })
    });

    cashoutButton.disabled = false;
    startButton.disabled = true;

    interval = setInterval(async () => {
        const response = await fetch("http://localhost:3000/multiplier");
        const data = await response.json();
        multiplierDisplay.textContent = data.multiplier;
    }, 500);
});

cashoutButton.addEventListener("click", async () => {
    const response = await fetch("http://localhost:3000/cashout", { method: "POST" });
    const data = await response.json();

    clearInterval(interval);
    cashoutButton.disabled = true;
    startButton.disabled = false;
});