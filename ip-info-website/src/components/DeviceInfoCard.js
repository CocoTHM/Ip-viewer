import React from 'react';

const DeviceInfoCard = ({ deviceInfo }) => {
    return (
        <div className="device-info-card">
            <h2>Informations sur l'appareil</h2>
            <p><strong>Système d'exploitation:</strong> {deviceInfo.os}</p>
            <p><strong>Navigateur:</strong> {deviceInfo.browser}</p>
            <p><strong>Version:</strong> {deviceInfo.version}</p>
        </div>
    );
};

export default DeviceInfoCard;