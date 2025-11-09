class ParticleBackground {
    constructor() {
        this.particlesContainer = document.createElement('div');
        this.particlesContainer.className = 'particles';
        document.body.appendChild(this.particlesContainer);
        
        this.createParticles();
        this.startParticleCreation();
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Taille aléatoire
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position aléatoire
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Durée d'animation aléatoire
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite`;
        
        this.particlesContainer.appendChild(particle);
        
        // Supprimer la particule après l'animation
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    startParticleCreation() {
        setInterval(() => {
            this.createParticle();
        }, 300);
    }
}

class DynamicGradient {
    constructor() {
        this.gradientBg = document.querySelector('.gradient-bg');
        this.addMouseInteraction();
    }

    addMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Ajuster légèrement les couleurs en fonction de la position de la souris
            this.gradientBg.style.backgroundImage = `
                linear-gradient(
                    ${45 + x * 30}deg,
                    hsl(${354 + y * 20}, 100%, 70%),
                    hsl(${174 + x * 20}, 63%, 55%),
                    hsl(${195 + y * 20}, 58%, 55%),
                    hsl(${246 + x * 20}, 100%, 79%),
                    hsl(${12 + y * 20}, 100%, 77%)
                )
            `;
        });
    }
}

// Initialiser les effets de fond
document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground();
    new DynamicGradient();
});