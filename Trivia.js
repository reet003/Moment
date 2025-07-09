
class TriviaQuiz {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 5;
        this.answers = {};
        this.correctAnswers = {
            1: 'mars',
            2: 'pacific',
            3: 'tokyo',
            4: 'oxygen',
            5: 'davinci'
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
    }

    bindEvents() {
        // Answer selection
        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectAnswer(e.currentTarget);
            });
        });

        // Next button
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });
    }

    selectAnswer(selectedOption) {
        const questionId = this.currentQuestion;
        const questionContainer = document.getElementById(`question-${questionId}`);
        
        // Remove previous selections
        questionContainer.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
            option.querySelector('.answer-radio').classList.remove('selected');
        });

        // Add selection to clicked option
        selectedOption.classList.add('selected');
        selectedOption.querySelector('.answer-radio').classList.add('selected');

        // Store answer
        this.answers[questionId] = selectedOption.dataset.value;
    }

    nextQuestion() {
        // Check if current question is answered
        if (!this.answers[this.currentQuestion]) {
            alert('Please select an answer before continuing.');
            return;
        }

        if (this.currentQuestion < this.totalQuestions) {
            // Hide current question
            document.getElementById(`question-${this.currentQuestion}`).classList.remove('active');
            
            // Move to next question
            this.currentQuestion++;
            
            // Show next question
            document.getElementById(`question-${this.currentQuestion}`).classList.add('active');
            
            // Update progress
            this.updateProgress();
            
            // Update button text for last question
            if (this.currentQuestion === this.totalQuestions) {
                document.getElementById('button-text').textContent = 'Finish Quiz';
            }
        } else {
            // Show results
            this.showResults();
        }
    }

    updateProgress() {
        const percentage = (this.currentQuestion / this.totalQuestions) * 100;
        
        document.getElementById('current-question').textContent = this.currentQuestion;
        document.getElementById('progress-percentage').textContent = percentage.toFixed(0);
        document.getElementById('progress-bar').style.width = `${percentage}%`;
    }

    calculateScore() {
        let score = 0;
        for (let i = 1; i <= this.totalQuestions; i++) {
            if (this.answers[i] === this.correctAnswers[i]) {
                score++;
            }
        }
        return score;
    }

    showResults() {
        // Hide current question
        document.getElementById(`question-${this.currentQuestion}`).classList.remove('active');
        
        // Calculate and show score
        const score = this.calculateScore();
        document.getElementById('final-score').textContent = score;
        document.getElementById('results').classList.add('active');
        
        // Hide next button
        document.querySelector('.next-button-container').style.display = 'none';
        
        // Update progress to 100%
        document.getElementById('progress-percentage').textContent = '100';
        document.getElementById('progress-bar').style.width = '100%';
    }
}

// Initialize the quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TriviaQuiz();
});

// Add some visual feedback animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate decorative flowers
    const flowers = document.querySelectorAll('.decorative-flowers');
    flowers.forEach((flower, index) => {
        flower.style.animationDelay = `${index * 0.2}s`;
    });
});
