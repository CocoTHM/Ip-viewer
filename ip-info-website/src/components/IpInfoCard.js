import React from 'react';

const IpInfoCard = ({ ipAddress }) => {
    return (
        <div className="ip-info-card">
            <h2>Adresse IP Publique</h2>
            <p>{ipAddress}</p>
        </div>
    );
};

export default IpInfoCard;