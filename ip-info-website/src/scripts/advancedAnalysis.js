class DeviceAnalyzer {
    constructor() {
        this.initializeButtons();
        this.analyzeBrowserFeatures();
    }

    initializeButtons() {
        document.getElementById('checkCamera').addEventListener('click', () => this.checkPermission('camera'));
        document.getElementById('checkMicrophone').addEventListener('click', () => this.checkPermission('microphone'));
        document.getElementById('checkLocation').addEventListener('click', () => this.checkPermission('geolocation'));
    }

    async checkPermission(type) {
        const statusDiv = document.getElementById('permissions-status');
        try {
            let result;
            switch(type) {
                case 'camera':
                    result = await navigator.mediaDevices.getUserMedia({ video: true });
                    result.getTracks().forEach(track => track.stop());
                    this.updatePermissionStatus(type, true);
                    break;
                case 'microphone':
                    result = await navigator.mediaDevices.getUserMedia({ audio: true });
                    result.getTracks().forEach(track => track.stop());
                    this.updatePermissionStatus(type, true);
                    break;
                case 'geolocation':
                    await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    this.updatePermissionStatus(type, true);
                    break;
            }
        } catch (error) {
            this.updatePermissionStatus(type, false, error.message);
        }
    }

    updatePermissionStatus(type, granted, error = null) {
        const statusDiv = document.getElementById('permissions-status');
        const status = granted ? 'permission-granted' : 'permission-denied';
        const message = granted 
            ? `✓ Accès ${type} autorisé`
            : `✗ Accès ${type} refusé${error ? ': ' + error : ''}`;
        
        statusDiv.innerHTML += `
            <div class="permission-status ${status}">
                ${message}
            </div>
        `;
    }

    analyzeBrowserFeatures() {
        const advancedStatus = document.getElementById('advanced-status');
        const features = {
            'Processeurs logiques': navigator.hardwareConcurrency || 'Non disponible',
            'Mémoire RAM': navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Non disponible',
            'Mode batterie': 'En cours de vérification...',
            'Type de connexion': 'En cours de vérification...',
            'Capacités graphiques': this.getGPUInfo(),
            'Capacités de stockage': 'En cours de vérification...'
        };

        // Vérification de la batterie
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                features['Mode batterie'] = `${Math.round(battery.level * 100)}% - ${battery.charging ? 'En charge' : 'Sur batterie'}`;
                this.updateAdvancedInfo(features);
            });
        } else {
            features['Mode batterie'] = 'Non disponible';
        }

        // Vérification de la connexion
        if ('connection' in navigator) {
            const conn = navigator.connection;
            features['Type de connexion'] = `${conn.effectiveType} - ${conn.saveData ? 'Mode économie de données activé' : 'Mode normal'}`;
        } else {
            features['Type de connexion'] = 'Non disponible';
        }

        // Vérification du stockage
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            navigator.storage.estimate().then(estimate => {
                const usedSpace = Math.round(estimate.usage / (1024 * 1024));
                const totalSpace = Math.round(estimate.quota / (1024 * 1024));
                features['Capacités de stockage'] = `${usedSpace}MB utilisés sur ${totalSpace}MB`;
                this.updateAdvancedInfo(features);
            });
        } else {
            features['Capacités de stockage'] = 'Non disponible';
        }

        this.updateAdvancedInfo(features);
    }

    getGPUInfo() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
            return 'WebGL non supporté';
        }

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            return {
                renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
            };
        }

        return 'Information GPU non disponible';
    }

    updateAdvancedInfo(features) {
        const advancedStatus = document.getElementById('advanced-status');
        advancedStatus.innerHTML = Object.entries(features)
            .map(([key, value]) => `
                <div class="advanced-feature">
                    <strong>${key}:</strong> 
                    ${typeof value === 'object' ? JSON.stringify(value) : value}
                </div>
            `).join('');
    }
}

// Initialiser l'analyseur quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les animations AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Initialiser l'analyseur
    new DeviceAnalyzer();
});