// ================================
// Reactive Background Effect with Spaceship Game
// ================================
class ReactiveBackground {
    constructor() {
        this.canvas = document.getElementById('reactive-bg');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.gridSize = 50;
        this.lines = [];
        
        // Spaceship properties with physics
        this.spaceship = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: 0,
            vy: 0,
            targetX: window.innerWidth / 2,
            targetY: window.innerHeight / 2,
            angle: 0,
            size: 25,
            acceleration: 0.15,
            friction: 0.99,
            maxSpeed: 12,
            trail: []
        };
        
        // Planets
        this.planets = [];
        this.score = 0;
        this.planetsExplored = 0;
        this.maxPlanets = 3;
        this.stars = [];
        
        // Game mode
        this.gameMode = false;
        this.gameTime = 60;
        this.gameTimer = null;
        this.gamePaused = false;
        this.targetScore = 10000;
        this.gameWon = false;
        
        this.init();
        this.animate();
        this.addEventListeners();
        this.initGameControls();
    }
    
    initGameControls() {
        const startBtn = document.getElementById('start-game');
        const exitBtn = document.getElementById('exit-game');
        const playAgainBtn = document.getElementById('play-again');
        const closeBtn = document.getElementById('close-game');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startGame());
        }
        
        if (exitBtn) {
            exitBtn.addEventListener('click', () => this.endGame());
        }
        
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => {
                document.getElementById('game-over').classList.add('hidden');
                this.startGame();
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.getElementById('game-over').classList.add('hidden');
            });
        }
    }
    
    startGame() {
        this.gameMode = true;
        this.score = 0;
        this.planetsExplored = 0;
        this.gameTime = 60;
        this.targetScore = 2500;
        this.gameWon = false;
        
        // Reset planets
        this.planets = [];
        this.maxPlanets = 4;
        this.spawnPlanets();
        
        // Show game UI
        const overlay = document.getElementById('game-overlay');
        overlay.classList.remove('hidden');
        overlay.classList.add('active');
        
        // Hide page content for full immersion
        document.body.style.overflow = 'hidden';
        document.querySelectorAll('section, .navbar, .footer').forEach(el => {
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
        });
        
        // Make canvas interactive
        this.canvas.style.pointerEvents = 'auto';
        this.canvas.style.zIndex = '100';
        
        // Update HUD
        this.updateHUD();
        
        // Start timer
        this.gameTimer = setInterval(() => {
            if (!this.gamePaused) {
                this.gameTime--;
                this.updateHUD();
                
                if (this.gameTime <= 0) {
                    this.endGame();
                }
            }
        }, 1000);
    }
    
    endGame() {
        this.gameMode = false;
        
        // Clear timer
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        
        // Hide game UI
        const overlay = document.getElementById('game-overlay');
        overlay.classList.add('hidden');
        overlay.classList.remove('active');
        
        // Restore page content
        document.body.style.overflow = '';
        document.querySelectorAll('section, .navbar, .footer').forEach(el => {
            el.style.opacity = '1';
            el.style.pointerEvents = '';
        });
        
        // Reset canvas
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        
        // Reset planets
        this.maxPlanets = 3;
        this.planets = [];
        this.spawnPlanets();
        
        // Show game over screen
        this.showGameOver();
    }
    
    showGameOver() {
        const gameOverScreen = document.getElementById('game-over');
        const gameOverTitle = document.getElementById('game-over-title');
        const finalScore = document.getElementById('final-score');
        const finalPlanets = document.getElementById('final-planets');
        const resultMessage = document.getElementById('result-message');
        
        // Set win/lose title
        if (gameOverTitle) {
            gameOverTitle.textContent = this.gameWon ? 'MISSION COMPLETE' : 'MISSION FAILED';
        }
        
        // Set result message
        if (resultMessage) {
            if (this.gameWon) {
                const timeBonus = this.gameTime * 5;
                this.score += timeBonus;
                resultMessage.textContent = `TARGET REACHED! +${timeBonus} TIME BONUS`;
            } else {
                resultMessage.textContent = `NEEDED ${this.targetScore - this.score} MORE POINTS`;
            }
        }
        
        finalScore.textContent = this.score;
        finalPlanets.textContent = this.planetsExplored;
        
        gameOverScreen.classList.remove('hidden');
    }
    
    updateHUD() {
        const timerEl = document.getElementById('game-timer');
        const scoreEl = document.getElementById('game-score');
        const planetsEl = document.getElementById('game-planets');
        const targetEl = document.getElementById('game-target');
        
        if (timerEl) timerEl.textContent = this.gameTime;
        if (scoreEl) scoreEl.textContent = this.score;
        if (planetsEl) planetsEl.textContent = this.planetsExplored;
        if (targetEl) targetEl.textContent = this.targetScore;
        
        // Check win condition
        if (this.score >= this.targetScore && !this.gameWon) {
            this.gameWon = true;
            this.endGame();
        }
    }
    
    init() {
        this.resize();
        this.createGrid();
        this.createStars();
        this.spawnPlanets();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createGrid();
        this.createStars();
    }
    
    createStars() {
        this.stars = [];
        const numStars = Math.floor((this.canvas.width * this.canvas.height) / 8000);
        for (let i = 0; i < numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5,
                twinkle: Math.random() * Math.PI * 2
            });
        }
    }
    
    spawnPlanets() {
        while (this.planets.length < this.maxPlanets) {
            this.spawnPlanet();
        }
    }
    
    spawnPlanet() {
        const types = [
            { name: 'Mercury', size: 12, rings: false, pattern: 'solid' },
            { name: 'Venus', size: 15, rings: false, pattern: 'striped' },
            { name: 'Mars', size: 14, rings: false, pattern: 'dotted' },
            { name: 'Jupiter', size: 22, rings: false, pattern: 'banded' },
            { name: 'Saturn', size: 20, rings: true, pattern: 'banded' },
            { name: 'Neptune', size: 18, rings: false, pattern: 'solid' }
        ];
        
        const type = types[Math.floor(Math.random() * types.length)];
        const padding = 150;
        
        this.planets.push({
            x: padding + Math.random() * (this.canvas.width - padding * 2),
            y: padding + Math.random() * (this.canvas.height - padding * 2),
            vx: 0,
            vy: 0,
            size: type.size,
            rings: type.rings,
            pattern: type.pattern,
            name: type.name,
            rotation: Math.random() * Math.PI * 2,
            orbitAngle: Math.random() * Math.PI * 2,
            orbitSpeed: 0.001 + Math.random() * 0.002,
            discovered: false,
            pulsePhase: Math.random() * Math.PI * 2,
            points: Math.floor(type.size * 4),
            evasionSpeed: 0.2 + Math.random() * 0.15,
            evasionRange: 150 + Math.random() * 50,
            spawnTime: Date.now(),
            lifespan: 5000,
            fadeOut: false
        });
    }
    
    createGrid() {
        this.particles = [];
        const cols = Math.ceil(this.canvas.width / this.gridSize) + 1;
        const rows = Math.ceil(this.canvas.height / this.gridSize) + 1;
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                this.particles.push({
                    x: i * this.gridSize,
                    y: j * this.gridSize,
                    baseX: i * this.gridSize,
                    baseY: j * this.gridSize,
                    size: 1,
                    baseSize: 1
                });
            }
        }
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.spaceship.targetX = e.clientX;
            this.spaceship.targetY = e.clientY;
        });
        
        document.addEventListener('mouseleave', () => {
            this.mouse.x = this.spaceship.x;
            this.mouse.y = this.spaceship.y;
        });
    }
    
    updateSpaceship() {
        // Calculate direction to target
        const dx = this.spaceship.targetX - this.spaceship.x;
        const dy = this.spaceship.targetY - this.spaceship.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply acceleration towards cursor
        if (distance > 5) {
            // Normalize direction and apply acceleration
            const ax = (dx / distance) * this.spaceship.acceleration;
            const ay = (dy / distance) * this.spaceship.acceleration;
            
            this.spaceship.vx += ax;
            this.spaceship.vy += ay;
        }
        
        // Apply friction
        this.spaceship.vx *= this.spaceship.friction;
        this.spaceship.vy *= this.spaceship.friction;
        
        // Clamp to max speed
        const speed = Math.sqrt(this.spaceship.vx * this.spaceship.vx + this.spaceship.vy * this.spaceship.vy);
        if (speed > this.spaceship.maxSpeed) {
            this.spaceship.vx = (this.spaceship.vx / speed) * this.spaceship.maxSpeed;
            this.spaceship.vy = (this.spaceship.vy / speed) * this.spaceship.maxSpeed;
        }
        
        // Update position
        this.spaceship.x += this.spaceship.vx;
        this.spaceship.y += this.spaceship.vy;
        
        // Keep spaceship within bounds
        this.spaceship.x = Math.max(this.spaceship.size, Math.min(this.canvas.width - this.spaceship.size, this.spaceship.x));
        this.spaceship.y = Math.max(this.spaceship.size, Math.min(this.canvas.height - this.spaceship.size, this.spaceship.y));
        
        // Calculate angle based on velocity (direction of movement)
        if (speed > 0.5) {
            this.spaceship.angle = Math.atan2(this.spaceship.vy, this.spaceship.vx);
        }
        
        // Add to trail (more points when moving fast)
        if (speed > 1) {
            this.spaceship.trail.unshift({ 
                x: this.spaceship.x, 
                y: this.spaceship.y,
                speed: speed
            });
        }
        if (this.spaceship.trail.length > 25) {
            this.spaceship.trail.pop();
        }
        
        // Check planet collision
        this.planets.forEach((planet, index) => {
            const distToPlanet = Math.sqrt(
                Math.pow(this.spaceship.x - planet.x, 2) + 
                Math.pow(this.spaceship.y - planet.y, 2)
            );
            
            if (distToPlanet < planet.size + this.spaceship.size) {
                if (!planet.discovered) {
                    planet.discovered = true;
                    this.score += planet.points;
                    this.planetsExplored++;
                    
                    // Update HUD in game mode
                    if (this.gameMode) {
                        this.updateHUD();
                    }
                    
                    // Create explosion effect
                    this.createExplosion(planet.x, planet.y);
                    
                    // Remove and spawn new planet
                    setTimeout(() => {
                        const idx = this.planets.indexOf(planet);
                        if (idx > -1) {
                            this.planets.splice(idx, 1);
                            this.spawnPlanet();
                        }
                    }, 500);
                }
            }
        });
    }
    
    explosions = [];
    
    createExplosion(x, y) {
        const particles = [];
        for (let i = 0; i < 15; i++) {
            const angle = (Math.PI * 2 / 15) * i;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * (2 + Math.random() * 3),
                vy: Math.sin(angle) * (2 + Math.random() * 3),
                life: 1
            });
        }
        this.explosions.push(particles);
    }
    
    drawSpaceship() {
        const { x, y, angle, size, trail, vx, vy } = this.spaceship;
        const speed = Math.sqrt(vx * vx + vy * vy);
        
        // Draw trail
        trail.forEach((point, i) => {
            const alpha = (1 - i / trail.length) * 0.5;
            const trailSize = (1 - i / trail.length) * (6 + (point.speed || 0) * 0.5);
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.fill();
        });
        
        // Draw spaceship (half circle facing direction of movement)
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        
        // Main body (half circle)
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size, -Math.PI / 2, Math.PI / 2, false);
        this.ctx.closePath();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Cockpit window
        this.ctx.beginPath();
        this.ctx.arc(5, 0, size * 0.35, -Math.PI / 2, Math.PI / 2, false);
        this.ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
        this.ctx.fill();
        
        // Engine glow (scales with speed)
        const engineLength = 15 + speed * 2 + Math.random() * 10;
        const engineWidth = 0.4 + speed * 0.02;
        this.ctx.beginPath();
        this.ctx.moveTo(-size, -size * engineWidth);
        this.ctx.lineTo(-size - engineLength, 0);
        this.ctx.lineTo(-size, size * engineWidth);
        this.ctx.closePath();
        this.ctx.fillStyle = `rgba(200, 200, 200, ${0.4 + speed * 0.04 + Math.random() * 0.2})`;
        this.ctx.fill();
        
        // Secondary engine flames at high speed
        if (speed > 5) {
            this.ctx.beginPath();
            this.ctx.moveTo(-size - 5, -size * 0.2);
            this.ctx.lineTo(-size - engineLength * 0.7 - Math.random() * 8, 0);
            this.ctx.lineTo(-size - 5, size * 0.2);
            this.ctx.closePath();
            this.ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.3})`;
            this.ctx.fill();
        }
        
        this.ctx.restore();
    }
    
    drawPlanets() {
        const now = Date.now();
        
        // Check for expired planets and remove them
        this.planets = this.planets.filter(planet => {
            if (planet.discovered) return true;
            const age = now - planet.spawnTime;
            if (age >= planet.lifespan) {
                // Spawn a new planet to replace
                setTimeout(() => this.spawnPlanet(), 500);
                return false;
            }
            return true;
        });
        
        // Planet-to-planet collision detection
        for (let i = 0; i < this.planets.length; i++) {
            for (let j = i + 1; j < this.planets.length; j++) {
                const p1 = this.planets[i];
                const p2 = this.planets[j];
                
                if (p1.discovered || p2.discovered) continue;
                
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDist = p1.size + p2.size;
                
                if (distance < minDist && distance > 0) {
                    // Collision detected - elastic collision
                    const angle = Math.atan2(dy, dx);
                    const overlap = minDist - distance;
                    
                    // Separate planets
                    const separateX = Math.cos(angle) * overlap * 0.5;
                    const separateY = Math.sin(angle) * overlap * 0.5;
                    p1.x -= separateX;
                    p1.y -= separateY;
                    p2.x += separateX;
                    p2.y += separateY;
                    
                    // Calculate collision response (elastic)
                    const m1 = p1.size;
                    const m2 = p2.size;
                    
                    // Relative velocity
                    const dvx = p1.vx - p2.vx;
                    const dvy = p1.vy - p2.vy;
                    
                    // Relative velocity in collision normal direction
                    const dvNormal = dvx * Math.cos(angle) + dvy * Math.sin(angle);
                    
                    // Don't resolve if velocities are separating
                    if (dvNormal > 0) continue;
                    
                    // Calculate impulse
                    const restitution = 0.8;
                    const impulse = (-(1 + restitution) * dvNormal) / (1/m1 + 1/m2);
                    
                    // Apply impulse
                    p1.vx += (impulse / m1) * Math.cos(angle);
                    p1.vy += (impulse / m1) * Math.sin(angle);
                    p2.vx -= (impulse / m2) * Math.cos(angle);
                    p2.vy -= (impulse / m2) * Math.sin(angle);
                }
            }
        }
        
        this.planets.forEach(planet => {
            // Calculate age and opacity
            const age = now - planet.spawnTime;
            const remainingTime = planet.lifespan - age;
            let opacity = 1;
            
            // Fade out in last 1.5 seconds
            if (remainingTime < 1500 && !planet.discovered) {
                opacity = remainingTime / 1500;
                planet.fadeOut = true;
            }
            
            // Evasion behavior - planets flee from spaceship (gentle)
            const dx = planet.x - this.spaceship.x;
            const dy = planet.y - this.spaceship.y;
            const distToShip = Math.sqrt(dx * dx + dy * dy);
            
            if (distToShip < planet.evasionRange && !planet.discovered) {
                const evasionForce = (planet.evasionRange - distToShip) / planet.evasionRange;
                const angle = Math.atan2(dy, dx);
                planet.vx += Math.cos(angle) * evasionForce * planet.evasionSpeed;
                planet.vy += Math.sin(angle) * evasionForce * planet.evasionSpeed;
            }
            
            // Apply friction to planet velocity
            planet.vx *= 0.95;
            planet.vy *= 0.95;
            
            // Update planet position
            planet.x += planet.vx;
            planet.y += planet.vy;
            
            // Keep planets in bounds
            const padding = 80;
            if (planet.x < padding) { planet.x = padding; planet.vx *= -0.5; }
            if (planet.x > this.canvas.width - padding) { planet.x = this.canvas.width - padding; planet.vx *= -0.5; }
            if (planet.y < padding) { planet.y = padding; planet.vy *= -0.5; }
            if (planet.y > this.canvas.height - padding) { planet.y = this.canvas.height - padding; planet.vy *= -0.5; }
            
            // Subtle orbit animation
            planet.orbitAngle += planet.orbitSpeed;
            const wobbleX = Math.cos(planet.orbitAngle) * 2;
            const wobbleY = Math.sin(planet.orbitAngle) * 2;
            
            const px = planet.x + wobbleX;
            const py = planet.y + wobbleY;
            
            // Pulse effect when not discovered
            const pulse = planet.discovered ? 0 : Math.sin(planet.pulsePhase += 0.05) * 3;
            const currentSize = planet.size + pulse;
            
            this.ctx.save();
            this.ctx.translate(px, py);
            
            // Draw rings for Saturn-like planets
            if (planet.rings && !planet.discovered) {
                this.ctx.beginPath();
                this.ctx.ellipse(0, 0, currentSize * 1.8, currentSize * 0.4, Math.PI / 6, 0, Math.PI * 2);
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                this.ctx.lineWidth = 3;
                this.ctx.stroke();
            }
            
            // Planet body
            this.ctx.beginPath();
            this.ctx.arc(0, 0, currentSize, 0, Math.PI * 2);
            
            if (planet.discovered) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${0.2 * opacity})`;
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * opacity})`;
            } else {
                this.ctx.fillStyle = `rgba(40, 40, 40, ${0.9 * opacity})`;
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * opacity})`;
            }
            
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Planet patterns
            if (!planet.discovered) {
                if (planet.pattern === 'banded') {
                    for (let i = -2; i <= 2; i++) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(-currentSize * 0.8, i * currentSize * 0.3);
                        this.ctx.lineTo(currentSize * 0.8, i * currentSize * 0.3);
                        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * opacity})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                } else if (planet.pattern === 'dotted') {
                    for (let i = 0; i < 5; i++) {
                        const dotAngle = (Math.PI * 2 / 5) * i + planet.rotation;
                        const dotDist = currentSize * 0.5;
                        this.ctx.beginPath();
                        this.ctx.arc(
                            Math.cos(dotAngle) * dotDist,
                            Math.sin(dotAngle) * dotDist,
                            3, 0, Math.PI * 2
                        );
                        this.ctx.fillStyle = `rgba(255, 255, 255, ${0.4 * opacity})`;
                        this.ctx.fill();
                    }
                }
            }
            
            this.ctx.restore();
            
            // Draw timer bar and "EXPLORE" hint near undiscovered planets
            if (!planet.discovered) {
                // Timer bar
                const age = now - planet.spawnTime;
                const timeLeft = 1 - (age / planet.lifespan);
                const barWidth = 40;
                const barHeight = 3;
                
                this.ctx.fillStyle = `rgba(255, 255, 255, ${0.2 * opacity})`;
                this.ctx.fillRect(px - barWidth / 2, py + currentSize + 8, barWidth, barHeight);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * opacity})`;
                this.ctx.fillRect(px - barWidth / 2, py + currentSize + 8, barWidth * timeLeft, barHeight);
                
                const distToShipDisplay = Math.sqrt(
                    Math.pow(this.spaceship.x - px, 2) + 
                    Math.pow(this.spaceship.y - py, 2)
                );
                
                if (distToShipDisplay < 150) {
                    const alpha = (150 - distToShipDisplay) / 150;
                    this.ctx.font = '10px "Space Mono", monospace';
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7 * opacity})`;
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(planet.name.toUpperCase(), px, py - currentSize - 15);
                    this.ctx.fillText(`+${planet.points}`, px, py - currentSize - 5);
                }
            }
        });
    }
    
    drawStars() {
        this.stars.forEach(star => {
            star.twinkle += 0.02;
            const alpha = 0.3 + Math.sin(star.twinkle) * 0.2;
            
            this.ctx.beginPath();
            this.ctx.rect(star.x, star.y, star.size, star.size);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.fill();
        });
    }
    
    drawExplosions() {
        this.explosions = this.explosions.filter(particles => {
            let alive = false;
            particles.forEach(p => {
                if (p.life > 0) {
                    alive = true;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.03;
                    
                    this.ctx.beginPath();
                    this.ctx.rect(p.x - 2, p.y - 2, 4, 4);
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
                    this.ctx.fill();
                }
            });
            return alive;
        });
    }
    
    drawScore() {
        // Only show simple score in non-game mode
        if (!this.gameMode) {
            this.ctx.font = '12px "Space Mono", monospace';
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`EXPLORED: ${this.score} PTS`, 20, 30);
            this.ctx.fillText(`PLANETS: ${this.planets.filter(p => !p.discovered).length}/${this.maxPlanets}`, 20, 50);
        } else {
            // Progress bar to target
            const progress = Math.min(this.score / this.targetScore, 1);
            const barWidth = 200;
            const barHeight = 8;
            const barX = (this.canvas.width - barWidth) / 2;
            const barY = 30;
            
            // Background
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            this.ctx.fillRect(barX, barY, barWidth, barHeight);
            
            // Progress
            this.ctx.fillStyle = progress >= 1 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)';
            this.ctx.fillRect(barX, barY, barWidth * progress, barHeight);
            
            // Target text
            this.ctx.font = '12px "Space Mono", monospace';
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`${this.score} / ${this.targetScore}`, this.canvas.width / 2, barY + 25);
            
            // In game mode, show countdown warning
            if (this.gameTime <= 10) {
                this.ctx.font = 'bold 60px "Space Mono", monospace';
                this.ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(Date.now() / 100) * 0.2})`;
                this.ctx.textAlign = 'center';
                this.ctx.fillText(this.gameTime, this.canvas.width / 2, this.canvas.height / 2);
            }
            
            // Show combo/streak messages
            if (this.planetsExplored > 0 && this.planetsExplored % 5 === 0) {
                const timeSinceLastMilestone = Date.now() % 3000;
                if (timeSinceLastMilestone < 2000) {
                    this.ctx.font = 'bold 24px "Space Mono", monospace';
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${1 - timeSinceLastMilestone / 2000})`;
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(`${this.planetsExplored} PLANETS!`, this.canvas.width / 2, 100);
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars
        this.drawStars();
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            const dx = this.spaceship.x - particle.x;
            const dy = this.spaceship.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);
                const moveX = Math.cos(angle) * force * 20;
                const moveY = Math.sin(angle) * force * 20;
                
                particle.x = particle.baseX - moveX;
                particle.y = particle.baseY - moveY;
                particle.size = particle.baseSize + force * 3;
            } else {
                particle.x += (particle.baseX - particle.x) * 0.1;
                particle.y += (particle.baseY - particle.y) * 0.1;
                particle.size += (particle.baseSize - particle.size) * 0.1;
            }
            
            // Draw particle
            const alpha = 0.1 + (particle.size - particle.baseSize) * 0.1;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(alpha, 0.5)})`;
            this.ctx.fillRect(
                particle.x - particle.size / 2,
                particle.y - particle.size / 2,
                particle.size,
                particle.size
            );
        });
        
        // Draw connecting lines
        this.drawLines();
        
        // Draw planets
        this.drawPlanets();
        
        // Draw explosions
        this.drawExplosions();
        
        // Update and draw spaceship
        this.updateSpaceship();
        this.drawSpaceship();
        
        // Draw score
        this.drawScore();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawLines() {
        const cols = Math.ceil(this.canvas.width / this.gridSize) + 1;
        const rows = Math.ceil(this.canvas.height / this.gridSize) + 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            const col = Math.floor(i / rows);
            const row = i % rows;
            
            // Connect to right neighbor
            if (col < cols - 1) {
                const rightNeighbor = this.particles[i + rows];
                if (rightNeighbor) {
                    this.drawLine(particle, rightNeighbor);
                }
            }
            
            // Connect to bottom neighbor
            if (row < rows - 1) {
                const bottomNeighbor = this.particles[i + 1];
                if (bottomNeighbor) {
                    this.drawLine(particle, bottomNeighbor);
                }
            }
        }
    }
    
    drawLine(p1, p2) {
        const dx = this.spaceship.x - (p1.x + p2.x) / 2;
        const dy = this.spaceship.y - (p1.y + p2.y) / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        let alpha = 0.03;
        if (distance < maxDistance) {
            alpha = 0.03 + ((maxDistance - distance) / maxDistance) * 0.15;
        }
        
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
}

// ================================
// Navigation
// ================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.links = document.querySelectorAll('.nav-links a');
        
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        this.menuToggle.addEventListener('click', () => {
            this.menuToggle.classList.toggle('active');
            this.navLinks.classList.toggle('active');
        });
        
        // Close menu on link click
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.menuToggle.classList.remove('active');
                this.navLinks.classList.remove('active');
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.padding = '15px 40px';
                this.navbar.style.background = 'rgba(23, 23, 23, 0.98)';
            } else {
                this.navbar.style.padding = '20px 40px';
                this.navbar.style.background = 'rgba(23, 23, 23, 0.9)';
            }
        });
        
        // Active link highlighting
        this.highlightActiveLink();
        window.addEventListener('scroll', () => this.highlightActiveLink());
    }
    
    highlightActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                this.links.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--white)';
                    }
                });
            }
        });
    }
}

// ================================
// Scroll Animations
// ================================
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll(
            '.section-header, .about-content, .skill-category, .project-card, .contact-content'
        );
        
        this.init();
    }
    
    init() {
        // Add initial hidden state
        this.animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.animatedElements.forEach(el => observer.observe(el));
    }
}

// ================================
// Skill Bar Animations
// ================================
class SkillBars {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.init();
    }
    
    init() {
        // Store original widths and set to 0
        this.skillBars.forEach(bar => {
            bar.dataset.width = bar.style.width;
            bar.style.width = '0';
        });
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    setTimeout(() => {
                        bar.style.width = bar.dataset.width;
                    }, 200);
                }
            });
        }, {
            threshold: 0.5
        });
        
        this.skillBars.forEach(bar => observer.observe(bar));
    }
}

// ================================
// Form Handling with EmailJS
// ================================
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        
        // Initialize EmailJS with your Public Key
        // Get this from: https://dashboard.emailjs.com/admin/account
        emailjs.init('HF1Iy5QXAZkzzKB0v'); // <-- Replace with your EmailJS Public Key
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                this.showStatus('Please fill in all fields', 'error');
                return;
            }
            
            // Update button state
            const btn = this.form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'SENDING...';
            btn.disabled = true;
            
            // Send email via EmailJS
            // Get Service ID and Template ID from: https://dashboard.emailjs.com/admin
            emailjs.send(
                'service_qdefpsn',    // <-- Replace with your EmailJS Service ID
                'template_arp3xwf',   // <-- Replace with your EmailJS Template ID
                {
                    from_name: data.name,
                    from_email: data.email,
                    message: data.message,
                    to_name: 'Portfolio Owner', // Your name
                }
            )
            .then(() => {
                btn.textContent = 'MESSAGE SENT!';
                this.form.reset();
                this.showStatus('Thank you! Your message has been sent.', 'success');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 3000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                btn.textContent = 'FAILED TO SEND';
                this.showStatus('Failed to send message. Please try again.', 'error');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 3000);
            });
        });
    }
    
    showStatus(message, type) {
        // Remove existing status
        const existingStatus = this.form.querySelector('.form-status');
        if (existingStatus) existingStatus.remove();
        
        // Create status element
        const status = document.createElement('div');
        status.className = `form-status ${type}`;
        status.textContent = message;
        status.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            font-family: 'Space Mono', monospace;
            font-size: 0.85rem;
            letter-spacing: 1px;
            text-align: center;
            border: 1px solid ${type === 'success' ? 'rgba(255,255,255,0.5)' : 'rgba(255,100,100,0.5)'};
            color: ${type === 'success' ? '#fff' : '#ff6b6b'};
            background: ${type === 'success' ? 'rgba(255,255,255,0.1)' : 'rgba(255,100,100,0.1)'};
        `;
        
        this.form.appendChild(status);
        
        // Remove after 5 seconds
        setTimeout(() => status.remove(), 5000);
    }
}

// ================================
// Cursor Effect
// ================================
class CursorEffect {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorDot = document.createElement('div');
        
        this.init();
    }
    
    init() {
        // Style custom cursor (circular)
        Object.assign(this.cursor.style, {
            position: 'fixed',
            width: '40px',
            height: '40px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transition: 'transform 0.15s ease, width 0.2s ease, height 0.2s ease',
            transform: 'translate(-50%, -50%)'
        });
        
        Object.assign(this.cursorDot.style, {
            position: 'fixed',
            width: '4px',
            height: '4px',
            background: 'white',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'translate(-50%, -50%)'
        });
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);
        
        // Move cursor
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            this.cursorDot.style.left = e.clientX + 'px';
            this.cursorDot.style.top = e.clientY + 'px';
        });
        
        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.width = '60px';
                this.cursor.style.height = '60px';
                this.cursor.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.width = '40px';
                this.cursor.style.height = '40px';
                this.cursor.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            });
        });
        
        // Hide on mobile
        if ('ontouchstart' in window) {
            this.cursor.style.display = 'none';
            this.cursorDot.style.display = 'none';
        }
    }
}

// ================================
// Initialize Everything
// ================================
document.addEventListener('DOMContentLoaded', () => {
    new ReactiveBackground();
    new Navigation();
    new ScrollAnimations();
    new SkillBars();
    new ContactForm();
    new CursorEffect();
});

// Smooth scroll polyfill for older browsers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
