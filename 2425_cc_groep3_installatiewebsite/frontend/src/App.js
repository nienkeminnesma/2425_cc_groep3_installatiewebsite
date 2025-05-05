import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GedichtenPage from './GedichtenPage';
import InvoerenPage from './InvoerPage';  // Zorg ervoor dat InvoerPage hier wordt geïmporteerd

function App() {
    const [gedichten, setGedichten] = useState([]);

    useEffect(() => {
        let url = 'https://two425-cc-groep3-installatiewebsite.onrender.com/gedichten';
        if (window.location.hostname === 'localhost') {
            url = 'http://localhost:3001/gedichten';
        }

        fetch(url)
            .then(res => res.json())
            .then(data => setGedichten(data));
    }, []);

    return (
        <Router>
            <div className="container">
                <nav>
                    <Link to="/" style={{ marginRight: '10px' }}>Gedichten</Link>
                    <Link to="/invoeren">Voeg Gedicht Toe</Link>  {/* Link naar invoeren */}
                </nav>
                <Routes>
                    <Route path="/" element={<GedichtenPage />} />  {/* Gedichten worden hier weergegeven */}
                    <Route path="/invoeren" element={<InvoerenPage />} />  {/* Pagina om gedicht toe te voegen */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
