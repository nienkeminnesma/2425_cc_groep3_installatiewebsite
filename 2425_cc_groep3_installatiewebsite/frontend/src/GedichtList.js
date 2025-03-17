// src/GedichtList.js
import React from 'react';

function GedichtList({ gedichten }) {
    return (
        <div className="gedicht-list">
            {gedichten.length === 0 ? (
                <p>Geen gedichten beschikbaar.</p>
            ) : (
                gedichten.map((gedicht, index) => (
                    <div key={index} className="gedicht">
                        <p>{gedicht.tekst}</p>
                        <small>{new Date(gedicht.datum).toLocaleDateString()}</small>
                    </div>
                ))
            )}
        </div>
    );
}

export default GedichtList;
