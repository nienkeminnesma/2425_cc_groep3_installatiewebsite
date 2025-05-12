import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GedichtenPage from './GedichtenPage';
import InvoerenPage from './InvoerPage';  // Zorg ervoor dat InvoerPage hier wordt geïmporteerd
import './App.css';  // Zorg ervoor dat je de CSS-bestanden hebt geïmporteerd

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
                    <Link to="/verhalen.html" className="nav-link" style={{ marginRight: '10px' }}>Gedichten</Link>
                     <Link to="/verhalen.html/invoeren" className="nav-link">Voeg Gedicht Toe</Link>
                </nav>
                <Routes>
                    <Route  path="/verhalen.html" element={<GedichtenPage />} />  {/* Gedichten worden hier weergegeven */}
                    <Route path="/verhalen.html/invoeren" element={<InvoerenPage />} />  {/* Pagina om gedicht toe te voegen */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
