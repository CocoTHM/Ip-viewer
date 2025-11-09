async function fetchIpInfo() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        
        // Récupérer les informations géographiques
        const geoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
        const geoData = await geoResponse.json();
        
        displayIpInfo(geoData);
    } catch (error) {
        console.error('Erreur lors de la récupération des informations IP:', error);
        document.getElementById('ip-info').innerHTML = 
            '<div class="card-error">Erreur lors de la récupération des informations IP</div>';
    }
}

function displayIpInfo(data) {
    const ipInfoCard = document.getElementById('ip-info');
    ipInfoCard.innerHTML = `
        <h2>Informations IP</h2>
        <div class="info-row">
            <span class="info-label">Adresse IP:</span>
            <span class="info-value">${data.ip}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Ville:</span>
            <span class="info-value">${data.city}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Pays:</span>
            <span class="info-value">${data.country_name}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Région:</span>
            <span class="info-value">${data.region}</span>
        </div>
        <div class="info-row">
            <span class="info-label">FAI:</span>
            <span class="info-value">${data.org || 'Non disponible'}</span>
        </div>
    `;
}


fetchIpInfo();