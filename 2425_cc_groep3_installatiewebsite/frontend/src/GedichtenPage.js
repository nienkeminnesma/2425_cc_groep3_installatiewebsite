import React, { useState, useEffect } from 'react';

function GedichtenPage() {
    const [gedichten, setGedichten] = useState([]);
    let url = 'https://two425-cc-groep3-installatiewebsite.onrender.com';
    if (window.location.hostname === 'localhost') {
        url = 'http://localhost:3001';
    }
    useEffect(() => {
        

        fetch(`${url}/gedichten`)
            .then(res => res.json())
            .then(data => setGedichten(data));
    }, []);

    let reversedArray = [...gedichten].reverse();
    const columnPattern = [2, 3]; // Alternating pattern

    let rows = [];
    let rowIndex = 0;
    let tempRow = [];

    reversedArray.forEach((gedicht, index) => {
        let columns = columnPattern[rowIndex % columnPattern.length];
        
        const hasText = gedicht.tekst && gedicht.tekst.trim() !== '';
        
        tempRow.push(
            <div key={index} className="gedicht">
                {hasText && <p>{gedicht.tekst}</p>}
                {gedicht.afbeelding && (
                    <img 
                        src={`${url}/uploads/${gedicht.afbeelding}`} 
                        alt="Gedicht afbeelding" 
                        className={hasText ? "gedicht-img" : "gedicht-img full-image"}
                    />
                )}
                {hasText && <small>{new Date(gedicht.datum).toLocaleDateString()}</small>}
            </div>
        );
        
        if (tempRow.length === columns) {
            rows.push(<div key={rowIndex} className="gedichten-row">{tempRow}</div>);
            tempRow = [];
            rowIndex++;
        }
    });

    if (tempRow.length > 0) {
        rows.push(<div key={rowIndex} className="gedichten-row">{tempRow}</div>);
    }

    return (
        <div className="gedichten-container">
            <div className="gedichten-grid">
                {rows.length === 0 ? (
                    <p>Er zijn nog geen gedichten toegevoegd.</p>
                ) : (
                    rows
                )}
            </div>
        </div>
    );
}

export default GedichtenPage;
