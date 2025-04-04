const navbar = document.getElementById('navbar');
const aviatorGame = document.getElementById('aviatorGame')

// Create nav HTML
navbar.innerHTML = `
    <nav class="nav">
        <a href="/" class="nav-link">Home</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/contact" class="nav-link">Contact</a>
    </nav>
`;

aviatorGame.innerHTML = `
    <body>
        <h1>Aviator Game</h1>
        <p>Multiplier: <span id="multiplier">1.0</span>x</p>
    
        <div class="button-container">
            <button id="start">Start Game</button>
            <button id="cashout" disabled>Cash Out</button>
        </div>
    
        <div class="info-text">
            <p>Press "Start Game" to begin. Once the game starts, you can choose to "Cash Out" at any time!</p>
        </div>
    </body>
`;

// Now add script logic programmatically
const script = document.createElement("script");
script.textContent = `
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
`;

aviatorGame.appendChild(script);