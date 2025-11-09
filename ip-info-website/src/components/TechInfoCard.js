import React from 'react';

const TechInfoCard = ({ techInfo }) => {
    return (
        <div className="tech-info-card">
            <h2>Informations Techniques</h2>
            <ul>
                {Object.entries(techInfo).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TechInfoCard;