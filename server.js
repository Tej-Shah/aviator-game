const express = require('express');
const cors = require('cors');
const path = require('path');
const main = require('./public/avaitorMain'); // Import game logic

const app = express();
const PORT = 3000;

app.use(cors()); // Allow frontend to connect
app.use(express.json());
app.use('/', main); // Use game logic routes

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
