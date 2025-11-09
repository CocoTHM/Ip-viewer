// Stockage des appareils connectés
let connectedDevices = [];

// Fonction pour récupérer les appareils
async function fetchConnectedDevices() {
    try {
        // Simulation d'une requête API (à remplacer par votre véritable endpoint)
        const response = await fetch('/api/connected-devices');
        const devices = await response.json();
        connectedDevices = devices;
        displayDevices();
    } catch (error) {
        console.error('Erreur lors de la récupération des appareils:', error);
    }
}

// Fonction pour afficher les appareils
function displayDevices() {
    const devicesContainer = document.getElementById('connectedDevices');
    if (!devicesContainer) return;

    const table = document.createElement('table');
    table.className = 'devices-table';
    
    // En-tête du tableau
    table.innerHTML = `
        <thead>
            <tr>
                <th>Date de connexion</th>
                <th>Adresse IP</th>
                <th>Appareil</th>
                <th>Navigateur</th>
                <th>Caméra</th>
                <th>Microphone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector('tbody');
    
    // Remplir le tableau avec les données des appareils
    connectedDevices.forEach(device => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(device.connectionTime).toLocaleString()}</td>
            <td>${device.ip}</td>
            <td>${device.deviceInfo}</td>
            <td>${device.browser}</td>
            <td>
                <span class="device-status ${device.camera ? 'active' : 'inactive'}">
                    <i class="fas fa-video"></i>
                </span>
            </td>
            <td>
                <span class="device-status ${device.microphone ? 'active' : 'inactive'}">
                    <i class="fas fa-microphone"></i>
                </span>
            </td>
            <td>
                <button class="btn-details" onclick="showDeviceDetails('${device.id}')">
                    <i class="fas fa-info-circle"></i> Détails
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    devicesContainer.innerHTML = '';
    devicesContainer.appendChild(table);
}

// Fonction pour afficher les détails d'un appareil
function showDeviceDetails(deviceId) {
    const device = connectedDevices.find(d => d.id === deviceId);
    if (!device) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Détails de l'appareil</h2>
            <div class="device-details">
                <h3>Informations générales</h3>
                <p><strong>IP:</strong> ${device.ip}</p>
                <p><strong>Appareil:</strong> ${device.deviceInfo}</p>
                <p><strong>Navigateur:</strong> ${device.browser}</p>
                <p><strong>Système d'exploitation:</strong> ${device.os}</p>
                
                <h3>Périphériques</h3>
                <div class="device-peripherals">
                    <div class="peripheral-item">
                        <i class="fas fa-video ${device.camera ? 'active' : 'inactive'}"></i>
                        <span>Caméra: ${device.camera ? 'Disponible' : 'Non disponible'}</span>
                    </div>
                    <div class="peripheral-item">
                        <i class="fas fa-microphone ${device.microphone ? 'active' : 'inactive'}"></i>
                        <span>Microphone: ${device.microphone ? 'Disponible' : 'Non disponible'}</span>
                    </div>
                </div>

                <h3>Historique de connexion</h3>
                <p><strong>Première connexion:</strong> ${new Date(device.firstConnection).toLocaleString()}</p>
                <p><strong>Dernière connexion:</strong> ${new Date(device.lastConnection).toLocaleString()}</p>
                <p><strong>Nombre de visites:</strong> ${device.visitCount}</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Fermeture du modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    window.onclick = (event) => {
        if (event.target === modal) modal.remove();
    };
}

// Rafraîchissement automatique des données
let refreshInterval;
function startAutoRefresh() {
    fetchConnectedDevices();
    refreshInterval = setInterval(fetchConnectedDevices, 30000); // Rafraîchir toutes les 30 secondes
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', startAutoRefresh);