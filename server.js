const express = require('express');
const path = require('path');
const fs = require('fs'); // We need this for Task 2 later

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// --- ROUTES ---

// Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// About Page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Contact Page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// --- TASK 2: BLOG LOGIC START ---

// 1. Route to serve the Blog HTML page
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

// 2. API Endpoint: This reads the JSON file and sends data to the frontend
app.get('/api/posts', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'posts.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading data');
        }
        res.json(JSON.parse(data));
    });
});

// --- TASK 2 END ---

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});