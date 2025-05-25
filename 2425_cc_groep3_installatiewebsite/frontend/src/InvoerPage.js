import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Zorg ervoor dat je de CSS-bestanden hebt geïmporteerd

function InvoerenPage() {
    const [tekst, setTekst] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [geautoriseerd, setGeautoriseerd] = useState(false);
    const [afbeeldingUrl, setAfbeeldingUrl] = useState(null); // URL van de geüploade afbeelding
    const [afbeeldingBestand, setAfbeeldingBestand] = useState(null); // Bewaren van het bestand voor uploaden

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (wachtwoord === 'tabulacaptiva') {
            setGeautoriseerd(true);
        } else {
            alert('Wachtwoord is onjuist!');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Als er geen tekst is, maar er wel een afbeelding is, is het toegestaan om in te dienen
        if (!tekst.trim() && !afbeeldingBestand) {
            alert('Je moet een afbeelding of tekst invoeren!');
            return;
        }

        const formData = new FormData();
        formData.append('tekst', tekst); // Voeg de tekst toe aan de FormData
        if (afbeeldingBestand) {
            formData.append('afbeelding', afbeeldingBestand); // Voeg de afbeelding toe aan de FormData
        }

        console.log('Verzend formulier met FormData:', formData);

        let url = 'https://two425-cc-groep3-installatiewebsite.onrender.com/gedichten';
        if (window.location.hostname === 'localhost') {
            url = 'http://localhost:3001/gedichten';
        }

        // Verzend de FormData naar de server
        axios.post(url, formData)
            .then(() => {
                setTekst('');  // Reset de tekst
                setAfbeeldingUrl(null);  // Reset de afbeelding URL
                setAfbeeldingBestand(null);  // Reset de afbeelding bestand
                alert('Gedicht succesvol toegevoegd!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Er ging iets mis bij het toevoegen van het gedicht.');
            });
    };

    const handleImageUpload = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Alleen afbeeldingen
        fileInput.click();

        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                // Zet het bestand in de state
                setAfbeeldingBestand(file);

                // Optioneel: Toon een preview van de afbeelding
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAfbeeldingUrl(reader.result); // Dit is de base64 encoded URL
                };
                reader.readAsDataURL(file);
            }
        };
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
                        <button type="button" onClick={handleImageUpload}>
                            Voeg Afbeelding Toe
                        </button>
                        {afbeeldingUrl && (
                            <div>
                                <h3>Afbeelding:</h3>
                                <img src={afbeeldingUrl} alt="Geüploade afbeelding" style={{ width: '200px', height: 'auto' }} />
                            </div>
                        )}
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
