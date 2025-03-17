import React, { useState } from 'react';

function InvoerenPage() {
    const [tekst, setTekst] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [geautoriseerd, setGeautoriseerd] = useState(false);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (wachtwoord === 'jouwwachtwoord') {  // Zet hier het juiste wachtwoord in
            setGeautoriseerd(true);
        } else {
            alert('Wachtwoord is onjuist!');
        }
    };

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
            setTekst('');
            alert('Gedicht succesvol toegevoegd!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Er ging iets mis bij het toevoegen van het gedicht.');
        });
    };

    return (
        <div className="container">
            {!geautoriseerd ? (
                <div>
                    <h1>Voer het Wachtwoord in</h1>
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="password"
                            value={wachtwoord}
                            onChange={(e) => setWachtwoord(e.target.value)}
                            placeholder="Voer wachtwoord in"
                        />
                        <button type="submit">Toegang</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Voeg een Gedicht Toe</h1>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={tekst}
                            onChange={(e) => setTekst(e.target.value)}
                            placeholder="Schrijf hier je gedicht..."
                            rows="6"
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}
                        />
                        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                            Verstuur Gedicht
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default InvoerenPage;
