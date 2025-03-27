const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = 'gedichten.json';

// Setup voor Multer (om afbeeldingen te uploaden)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Zorg ervoor dat je de 'uploads' directory hebt
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Maak een unieke naam voor de afbeelding
    }
});

const upload = multer({ storage: storage });

// Middelware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Zorg ervoor dat de uploads-map statisch beschikbaar is

// Laad bestaande gedichten
app.get('/gedichten', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Kan gedichten niet laden' });
        res.json(JSON.parse(data));
    });
});

// Voeg een nieuw gedicht toe
app.post('/gedichten', upload.single('afbeelding'), (req, res) => {
    const { tekst } = req.body;
    let afbeeldingUrl = null;

    if (req.file) {
        afbeeldingUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    }

    // Als er geen tekst is, maar er wel een afbeelding is, mag het wel
    if (!tekst.trim() && !afbeeldingUrl) {
        return res.status(400).json({ error: 'Je moet een afbeelding of tekst invoeren!' });
    }

    // Voeg het gedicht toe aan de lijst
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Fout bij het lezen van gegevens:", err);
            return res.status(500).json({ error: 'Kan gegevens niet lezen' });
        }

        const gedichten = JSON.parse(data);
        gedichten.push({
            tekst,
            datum: new Date().toISOString(),
            afbeelding: afbeeldingUrl,
        });

        // Sla de gedichten op
        fs.writeFile(DATA_FILE, JSON.stringify(gedichten, null, 2), (err) => {
            if (err) {
                console.error("Fout bij het opslaan van het gedicht:", err);
                return res.status(500).json({ error: 'Kan gedicht niet opslaan' });
            }
            res.json({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
