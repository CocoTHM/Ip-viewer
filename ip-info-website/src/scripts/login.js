class LoginManager {
    constructor() {
        this.modal = document.getElementById('loginModal');
        this.loginBtn = document.getElementById('loginBtn');
        this.closeBtn = document.querySelector('.close-btn');
        this.loginForm = document.getElementById('loginForm');
        this.errorDiv = document.getElementById('login-error');
        
        this.setupEventListeners();
        this.checkAuthStatus();
    }

    setupEventListeners() {
        // Ouvrir la modal
        this.loginBtn.addEventListener('click', () => this.openModal());

        // Fermer la modal
        this.closeBtn.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Gestion du formulaire
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));

        // Écouter la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    openModal() {
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
        this.loginForm.reset();
        this.errorDiv.style.display = 'none';
    }

    async handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            if (username === 'admin' && password === 'admin123') {
                // Stocker le token d'authentification
                sessionStorage.setItem('adminToken', 'authenticated');
                
                // Mettre à jour l'interface
                this.updateUIForLoggedInUser();
                
                // Fermer la modal
                this.closeModal();
                
                // Rediriger vers le panneau d'administration
                window.location.href = 'admin-panel.html';
            } else {
                throw new Error('Identifiants incorrects');
            }
        } catch (error) {
            this.showError(error.message);
        }
    }

    showError(message) {
        this.errorDiv.textContent = message;
        this.errorDiv.style.display = 'block';
        
        // Animation de secousse
        this.errorDiv.classList.add('show');
        setTimeout(() => {
            this.errorDiv.classList.remove('show');
        }, 300);

        // Cacher le message après 3 secondes
        setTimeout(() => {
            this.errorDiv.style.display = 'none';
        }, 3000);
    }

    checkAuthStatus() {
        const isAuthenticated = sessionStorage.getItem('adminToken');
        if (isAuthenticated) {
            this.updateUIForLoggedInUser();
        }
    }

    updateUIForLoggedInUser() {
        this.loginBtn.innerHTML = `
            <i class="fas fa-user-check"></i> 
            <span>Administration</span>
        `;
        this.loginBtn.addEventListener('click', () => {
            window.location.href = 'admin-panel.html';
        });
    }
}

// Initialiser le gestionnaire de connexion
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
});