// src/GedichtForm.js
import React, { useState } from 'react';

function GedichtForm({ onNewGedicht }) {
    const [tekst, setTekst] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tekst.trim()) return;

        fetch('http://localhost:3001/gedichten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tekst })
        })
        .then(res => res.json())
        .then(() => {
            // Hier roep je onNewGedicht aan om het nieuwe gedicht toe te voegen
            onNewGedicht({ tekst, datum: new Date().toISOString() });
            setTekst('');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="gedicht-form">
            <textarea
                value={tekst}
                onChange={(e) => setTekst(e.target.value)}
                placeholder="Schrijf hier je gedicht..."
            />
            <button type="submit">Verstuur</button>
        </form>
    );
}

export default GedichtForm;
