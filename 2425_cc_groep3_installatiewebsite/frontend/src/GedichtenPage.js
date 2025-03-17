import React, { useState, useEffect } from 'react';

function GedichtenPage() {
    const [gedichten, setGedichten] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/gedichten')
            .then(res => res.json())
            .then(data => setGedichten(data));
    }, []);

    return (
        <div className="gedichten-container">
            <h3>Gedichten</h3>
            <div className="gedichten-list">
                {gedichten.length === 0 ? (
                    <p>Er zijn nog geen gedichten toegevoegd.</p>
                ) : (
                    gedichten.map((gedicht, index) => (
                        <div key={index} className="gedicht">
                            <p>{gedicht.tekst}</p>
                            <small>{new Date(gedicht.datum).toLocaleDateString()}</small>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default GedichtenPage;
