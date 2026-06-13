// Localized database matrix of player statistics
const NBA_DATASET = [
    { name: "LeBron James", team: "Lakers", ppg: 25.7, rpg: 7.3, apg: 8.3 },
    { name: "Luka Doncic", team: "Mavericks", ppg: 33.9, rpg: 9.2, apg: 9.8 },
    { name: "Nikola Jokic", team: "Nuggets", ppg: 26.4, rpg: 12.4, apg: 9.0 },
    { name: "Giannis Antetokounmpo", team: "Bucks", ppg: 30.4, rpg: 11.5, apg: 6.5 },
    { name: "Stephen Curry", team: "Warriors", ppg: 26.4, rpg: 4.5, apg: 5.1 },
    { name: "Joel Embiid", team: "76ers", ppg: 34.7, rpg: 11.0, apg: 5.6 },
    { name: "Shai Gilgeous-Alexander", team: "Thunder", ppg: 30.1, rpg: 5.5, apg: 6.2 },
    { name: "Jayson Tatum", team: "Celtics", ppg: 26.9, rpg: 8.1, apg: 4.9 },
    { name: "Kevin Durant", team: "Suns", ppg: 27.1, rpg: 6.6, apg: 5.0 },
    { name: "Anthony Edwards", team: "Timberwolves", ppg: 25.9, rpg: 5.4, apg: 5.1 },
    { name: "Devin Booker", team: "Suns", ppg: 27.1, rpg: 4.5, apg: 6.9 },
    { name: "Donovan Mitchell", team: "Cavaliers", ppg: 26.6, rpg: 5.1, apg: 6.1 }
];

const STAT_TYPES = [
    { key: 'ppg', label: 'PPG (Points Per Game)' },
    { key: 'rpg', label: 'RPG (Rebounds Per Game)' },
    { key: 'apg', label: 'APG (Assists Per Game)' }
];

class HigherOrLowerGame {
    constructor() {
        this.streak = 0;
        this.highScore = parseInt(localStorage.getItem('nba_high_score')) || 0;
        
        this.leftPlayer = null;
        this.rightPlayer = null;
        this.currentStat = null; // Chosen metric configuration
        this.isProcessing = false; // Input lock guard

        this.cacheDOM();
        this.initScores();
        this.generateMatchup();
    }

    cacheDOM() {
        this.domCurrentStreak = document.getElementById('current-streak');
        this.domHighScore = document.getElementById('high-score');
        this.domTargetStat = document.getElementById('target-stat-display');

        // Cards
        this.domLeftCard = document.getElementById('player-left');
        this.domRightCard = document.getElementById('player-right');
        this.domRightInner = document.getElementById('right-card-inner');

        // Dynamic Card Elements
        this.leftName = document.querySelector('#player-left .player-name');
        this.leftTeam = document.querySelector('#player-left .player-team');
        this.leftValue = document.getElementById('left-stat-value');

        this.rightFrontName = document.querySelector('.card-front .player-name');
        this.rightFrontTeam = document.querySelector('.card-front .player-team');
        this.rightBackName = document.querySelector('.card-back .player-name');
        this.rightBackTeam = document.querySelector('.card-back .player-team');
        this.rightValue = document.getElementById('right-stat-value');

        // Modals
        this.domOverlay = document.getElementById('game-over-overlay');
        this.domFinalStreak = document.getElementById('final-streak');
    }

    initScores() {
        this.domCurrentStreak.textContent = this.streak;
        this.domHighScore.textContent = this.highScore;
    }

    generateMatchup() {
        // Reset card flip states cleanly
        this.domRightCard.classList.remove('flipped');

        // Select uniform stat type configuration for the round
        this.currentStat = STAT_TYPES[Math.floor(Math.random() * STAT_TYPES.length)];
        this.domTargetStat.textContent = this.currentStat.label;

        // If a game is active, shift old right player to the left slot
        if (this.rightPlayer) {
            this.leftPlayer = this.rightPlayer;
        } else {
            this.leftPlayer = this.getRandomPlayer();
        }

        // Pull a unique random candidate for the right panel
        do {
            this.rightPlayer = this.getRandomPlayer();
        } while (this.rightPlayer.name === this.leftPlayer.name);

        this.updateUIValues();
    }

    getRandomPlayer() {
        return NBA_DATASET[Math.floor(Math.random() * NBA_DATASET.length)];
    }

    updateUIValues() {
        // Populate Left Panel (Benchmark Data)
        this.leftName.textContent = this.leftPlayer.name;
        this.leftTeam.textContent = this.leftPlayer.team;
        this.leftValue.textContent = this.leftPlayer[this.currentStat.key].toFixed(1);

        // Populate Right Panel (Hidden Guess Configuration)
        this.rightFrontName.textContent = this.rightPlayer.name;
        this.rightFrontTeam.textContent = this.rightPlayer.team;
        
        this.rightBackName.textContent = this.rightPlayer.name;
        this.rightBackTeam.textContent = this.rightPlayer.team;
        this.rightValue.textContent = this.rightPlayer[this.currentStat.key].toFixed(1);
    }

    makeGuess(choice) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        const leftVal = this.leftPlayer[this.currentStat.key];
        const rightVal = this.rightPlayer[this.currentStat.key];

        // Process conditional true-case mathematical evaluation
        let isCorrect = false;
        if (choice === 'higher' && rightVal >= leftVal) isCorrect = true;
        if (choice === 'lower' && rightVal <= leftVal) isCorrect = true;

        // Execute visual flip logic sequence
        this.domRightCard.classList.add('flipped');

        setTimeout(() => {
            if (isCorrect) {
                this.handleCorrectGuess();
            } else {
                this.handleIncorrectGuess();
            }
        }, 600); // Triggers halfway through transition rotation matrix
    }

    handleCorrectGuess() {
        this.streak++;
        this.domCurrentStreak.textContent = this.streak;
        
        if (this.streak > this.highScore) {
            this.highScore = this.streak;
            this.domHighScore.textContent = this.highScore;
            localStorage.setItem('nba_high_score', this.highScore);
        }

        // Apply Green Flash Animation to screen sides
        this.domLeftCard.classList.add('flash-correct');
        this.domRightInner.classList.add('flash-correct');

        setTimeout(() => {
            // Cleanup CSS Animations and cycle to next loop iteration
            this.domLeftCard.classList.remove('flash-correct');
            this.domRightInner.classList.remove('flash-correct');
            this.generateMatchup();
            this.isProcessing = false;
        }, 1200);
    }

    handleIncorrectGuess() {
        this.domLeftCard.classList.add('flash-incorrect');
        this.domRightInner.classList.add('flash-incorrect');

        setTimeout(() => {
            this.domLeftCard.classList.remove('flash-incorrect');
            this.domRightInner.classList.remove('flash-incorrect');
            
            // Invoke Modal Terminal State Screen View Window Layer
            this.domFinalStreak.textContent = this.streak;
            this.domOverlay.classList.add('active');
        }, 1200);
    }

    restartGame() {
        this.streak = 0;
        this.domCurrentStreak.textContent = this.streak;
        this.leftPlayer = null;
        this.rightPlayer = null;
        this.domOverlay.classList.remove('active');
        this.generateMatchup();
        this.isProcessing = false;
    }
}

// Initial Run Initialization Instance
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new HigherOrLowerGame();
});