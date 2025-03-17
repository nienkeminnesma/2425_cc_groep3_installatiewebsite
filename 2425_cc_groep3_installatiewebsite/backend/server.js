const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DATA_FILE = 'gedichten.json';

app.use(express.json());
app.use(cors());

// Laad bestaande gedichten
app.get('/gedichten', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Kan gedichten niet laden' });
        res.json(JSON.parse(data));
    });
});

// Voeg een nieuw gedicht toe
app.post('/gedichten', (req, res) => {
    const { tekst } = req.body;
    if (!tekst) return res.status(400).json({ error: 'Leeg gedicht' });

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Kan gegevens niet lezen' });
        
        const gedichten = JSON.parse(data);
        gedichten.push({ tekst, datum: new Date().toISOString() });

        fs.writeFile(DATA_FILE, JSON.stringify(gedichten, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Kan gedicht niet opslaan' });
            res.json({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
