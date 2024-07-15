const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

console.log('Starting server...');
console.log('Environment variables:', JSON.stringify(process.env, null, 2)); // Pretty print all environment variables
console.log('PORT environment variable:', process.env.PORT); // Specifically print the PORT variable
console.log('Using port:', port); // Print the port being used

app.use(cors());

app.get('/api/art-installs', (req, res) => {
    console.log('Received request for /api/art-installs');
    const dataPath = path.join(__dirname, 'art-installs.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send({ error: 'Failed to read data' });
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.listen(port, () => {
    console.log(`Local API server is running at http://localhost:${port}`);
});