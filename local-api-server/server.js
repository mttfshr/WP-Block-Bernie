const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/art-installs', (req, res) => {
    const dataPath = path.join(__dirname, 'art-installs.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Failed to read data' });
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.listen(port, () => {
    console.log(`Local API server is running at http://localhost:${port}`);
});