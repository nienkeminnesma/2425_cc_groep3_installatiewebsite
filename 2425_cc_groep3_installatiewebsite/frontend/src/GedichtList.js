// src/GedichtList.js
import React from 'react';

function GedichtList({ gedichten }) {
    let reverserdArray = gedichten.reverse();
    console.log(reverserdArray);
    return (
        <div className="gedicht-list">
            {reverserdArray.length === 0 ? (
                <p>Geen gedichten beschikbaar.</p>
            ) : (
                reverserdArray.map((gedicht, index) => (
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
