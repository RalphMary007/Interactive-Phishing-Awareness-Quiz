// Question bank
const allQuestions = [
    // Easy
    { text: "Email: 'Your account is suspended. Click to verify.' From unknown sender.", isPhishing: true, difficulty: 'easy' },
    { text: "Bank statement from official email.", isPhishing: false, difficulty: 'easy' },
    { text: "Urgent: Tax refund available. Provide details.", isPhishing: true, difficulty: 'easy' },
    { text: "Scheduled maintenance notice from bank.", isPhishing: false, difficulty: 'easy' },
    { text: "Win a prize! Click link.", isPhishing: true, difficulty: 'easy' },
    { text: "Password reset confirmation.", isPhishing: false, difficulty: 'easy' },
    { text: "Update payment info or lose access.", isPhishing: true, difficulty: 'easy' },
    { text: "Transaction alert from app.", isPhishing: false, difficulty: 'easy' },

    // Medium
    { text: "Spoofed bank transfer request with urgent language.", isPhishing: true, difficulty: 'medium' },
    { text: "Legitimate loan offer from known lender.", isPhishing: false, difficulty: 'medium' },
    { text: "Investment opportunity with high returns.", isPhishing: true, difficulty: 'medium' },
    { text: "Account activity summary.", isPhishing: false, difficulty: 'medium' },
    { text: "Verify identity for security.", isPhishing: true, difficulty: 'medium' },
    { text: "Interest rate change notification.", isPhishing: false, difficulty: 'medium' },
    { text: "Charity donation request post-disaster.", isPhishing: true, difficulty: 'medium' },
    { text: "Policy update email.", isPhishing: false, difficulty: 'medium' },

    // Hard
    { text: "AI-generated deepfake voice call requesting transfer.", isPhishing: true, difficulty: 'hard' },
    { text: "Official regulatory compliance email.", isPhishing: false, difficulty: 'hard' },
    { text: "Vishing call mimicking bank fraud dept.", isPhishing: true, difficulty: 'hard' },
    { text: "Quarterly report attachment.", isPhishing: false, difficulty: 'hard' },
    { text: "Reverse proxy link mimicking login page.", isPhishing: true, difficulty: 'hard' },
    { text: "Partner collaboration invite.", isPhishing: false, difficulty: 'hard' },
    { text: "ClickFix prompt to run command.", isPhishing: true, difficulty: 'hard' },
    { text: "System update notification.", isPhishing: false, difficulty: 'hard' }
];

// Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle once
let shuffledQuestions = shuffle([...allQuestions]);

let currentQuestion = 0;
let score = 0;
const totalQuestions = 20; // use first 20

// Load next question
function loadQuestion() {
    if (currentQuestion < totalQuestions) {
        // Adaptive difficulty: after 6 questions, if >70% correct, bias toward hard
        if (currentQuestion >= 6 && score / currentQuestion > 0.7) {
            const remaining = shuffledQuestions.slice(currentQuestion);
            const hardRemaining = remaining.filter(q => q.difficulty === 'hard');
            if (hardRemaining.length > 0 && Math.random() < 0.7) {
                const randomIndex = currentQuestion + Math.floor(Math.random() * remaining.length);
                if (shuffledQuestions[randomIndex].difficulty === 'hard') {
                    document.getElementById('question').textContent = shuffledQuestions[randomIndex].text;
                    // Swap into current position
                    [shuffledQuestions[currentQuestion], shuffledQuestions[randomIndex]] =
                        [shuffledQuestions[randomIndex], shuffledQuestions[currentQuestion]];
                } else {
                    document.getElementById('question').textContent = shuffledQuestions[currentQuestion].text;
                }
            } else {
                document.getElementById('question').textContent = shuffledQuestions[currentQuestion].text;
            }
        } else {
            document.getElementById('question').textContent = shuffledQuestions[currentQuestion].text;
        }
    } else {
        showResults();
    }
    updateProgress();
}

// Update progress bar
function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    const bar = document.getElementById('progress-bar');
    bar.style.width = progress + '%';
    bar.setAttribute('aria-valuenow', progress);
}

// Handle answer
function answer(isPhishing) {
    const current = shuffledQuestions[currentQuestion];
    const correct = current.isPhishing === isPhishing;
    const feedback = document.getElementById('feedback');

    if (correct) {
        score++;
        feedback.textContent = "✅ Correct!";
        feedback.className = "text-success";
    } else {
        feedback.textContent = "❌ Wrong!";
        feedback.className = "text-danger";
    }

    document.getElementById('score').textContent = score;
    currentQuestion++;

    setTimeout(() => {
        feedback.textContent = '';
        feedback.className = '';
        loadQuestion();
    }, 1500);
}

// Show results
function showResults() {
    const container = document.querySelector('.card-body');

    let grade = "";
    let message = "";
    let color = "";

    if (score >= 15) {
        grade = "🏆 Excellent Phishing Awareness";
        message = "Outstanding! You consistently spotted the red flags — excellent awareness and sharp instincts.";
        color = "#28a745"; // green
    } else if (score >= 10) {
        grade = "👍 Average Phishing Awareness";
        message = "Good job — you caught many phishing attempts. There's still room to grow, especially with trickier ones.";
        color = "#ffc107"; // yellow/orange
    } else if (score >= 5) {
        grade = "⚠️ Low Phishing Awareness";
        message = "You've completed the quiz — that's a strong first step! Focus on urgency tricks and spoofed details next time.";
        color = "#fd7e14"; // orange-red
    } else {
        grade = "❌ Poor Phishing Awareness";
        message = "This is a wake-up call. Phishing can be very deceptive — review common signs and retake when ready.";
        color = "#dc3545"; // red
    }

    container.innerHTML = `
        <h1 class="text-center">Quiz Complete!</h1>
        <p class="lead text-center">Your Score: <strong>${score}</strong> out of ${totalQuestions}</p>
        <h3 class="text-center" style="color: ${color};">${grade}</h3>
        <p class="text-center fs-5" style="color: ${color};">${message}</p>
        <div class="text-center mt-4">
            <button class="btn btn-primary btn-lg" onclick="location.reload()">Retake Quiz</button>
        </div>
    `;
}
