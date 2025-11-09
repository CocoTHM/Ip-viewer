function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let deviceInfo = {
        browser: '',
        os: '',
    };

    // Détection du navigateur
    if (userAgent.indexOf('Chrome') > -1) {
        deviceInfo.browser = 'Chrome';
    } else if (userAgent.indexOf('Firefox') > -1) {
        deviceInfo.browser = 'Firefox';
    } else if (userAgent.indexOf('Safari') > -1) {
        deviceInfo.browser = 'Safari';
    } else if (userAgent.indexOf('Edge') > -1) {
        deviceInfo.browser = 'Edge';
    } else {
        deviceInfo.browser = 'Inconnu';
    }

    // Détection du système d'exploitation
    if (userAgent.indexOf('Win') > -1) {
        deviceInfo.os = 'Windows';
    } else if (userAgent.indexOf('Mac') > -1) {
        deviceInfo.os = 'MacOS';
    } else if (userAgent.indexOf('Linux') > -1) {
        deviceInfo.os = 'Linux';
    } else if (userAgent.indexOf('Android') > -1) {
        deviceInfo.os = 'Android';
    } else if (userAgent.indexOf('like Mac') > -1) {
        deviceInfo.os = 'iOS';
    } else {
        deviceInfo.os = 'Inconnu';
    }

    return deviceInfo;
}

function displayDeviceInfo() {
    const info = getDeviceInfo();
    const deviceInfoElement = document.getElementById('device-info');
    deviceInfoElement.innerHTML = `
        <div class="card-icon">
            <i class="fas fa-laptop"></i>
        </div>
        <h2>Informations de l'Appareil</h2>
        <div class="info-row">
            <span class="info-label">Navigateur</span>
            <span class="info-value">${info.browser}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Système d'exploitation</span>
            <span class="info-value">${info.os}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Langue</span>
            <span class="info-value">${navigator.language}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Résolution</span>
            <span class="info-value">${window.screen.width} x ${window.screen.height}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Plateforme</span>
            <span class="info-value">${navigator.platform}</span>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', displayDeviceInfo);