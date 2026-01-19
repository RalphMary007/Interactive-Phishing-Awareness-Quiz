const easyQuestions = [
    { text: "Email: 'Your account is suspended. Click to verify.' From unknown sender.", isPhishing: true, difficulty: 'easy' },
    { text: "Bank statement from official email.", isPhishing: false, difficulty: 'easy' },
    { text: "Urgent: Tax refund available. Provide details.", isPhishing: true, difficulty: 'easy' },
    { text: "Scheduled maintenance notice from bank.", isPhishing: false, difficulty: 'easy' },
    { text: "Win a prize! Click link.", isPhishing: true, difficulty: 'easy' },
    { text: "Password reset confirmation.", isPhishing: false, difficulty: 'easy' },
    { text: "Update payment info or lose access.", isPhishing: true, difficulty: 'easy' },
    { text: "Transaction alert from app.", isPhishing: false, difficulty: 'easy' }
];

const mediumQuestions = [
    { text: "Spoofed bank transfer request with urgent language.", isPhishing: true, difficulty: 'medium' },
    { text: "Legitimate loan offer from known lender.", isPhishing: false, difficulty: 'medium' },
    { text: "Investment opportunity with high returns.", isPhishing: true, difficulty: 'medium' },
    { text: "Account activity summary.", isPhishing: false, difficulty: 'medium' },
    { text: "Verify identity for security.", isPhishing: true, difficulty: 'medium' },
    { text: "Interest rate change notification.", isPhishing: false, difficulty: 'medium' },
    { text: "Charity donation request post-disaster.", isPhishing: true, difficulty: 'medium' },
    { text: "Policy update email.", isPhishing: false, difficulty: 'medium' }
];

const hardQuestions = [
    { text: "AI-generated deepfake voice call requesting transfer.", isPhishing: true, difficulty: 'hard' },
    { text: "Official regulatory compliance email.", isPhishing: false, difficulty: 'hard' },
    { text: "Vishing call mimicking bank fraud dept.", isPhishing: true, difficulty: 'hard' },
    { text: "Quarterly report attachment.", isPhishing: false, difficulty: 'hard' },
    { text: "Reverse proxy link mimicking login page.", isPhishing: true, difficulty: 'hard' },
    { text: "Partner collaboration invite.", isPhishing: false, difficulty: 'hard' },
    { text: "ClickFix prompt to run command.", isPhishing: true, difficulty: 'hard' },
    { text: "System update notification.", isPhishing: false, difficulty: 'hard' }
];

let questions = easyQuestions; // Start with easy
let currentQuestion = 0;
let score = 0;
let totalQuestions = 20;

function loadQuestion() {
    if (currentQuestion < totalQuestions) {
        if (score / currentQuestion > 0.7 && currentQuestion > 5) {
            questions = mediumQuestions.concat(hardQuestions);
        }
        const qIndex = currentQuestion % questions.length;
        document.getElementById('question').textContent = questions[qIndex].text;
    } else {
        showResults();
    }
    updateProgress();
}

function updateProgress() {
    document.getElementById('progress-bar').style.width = (currentQuestion / totalQuestions * 100) + '%';
}

function answer(isPhishing) {
    const qIndex = currentQuestion % questions.length;
    const correct = questions[qIndex].isPhishing === isPhishing;
    document.getElementById('feedback').textContent = correct ? 'Correct!' : 'Wrong!';
    if (correct) score++;
    document.getElementById('score').textContent = score;
    currentQuestion++;
    setTimeout(() => {
        document.getElementById('feedback').textContent = '';
        loadQuestion();
    }, 2000);
}

function showResults() {
    const container = document.getElementById('quiz-container') || document.querySelector('.card-body');
    let grade = "";
    let message = "";
    let color = "";

    if (score >= 15) {
        grade = "Excellent Phishing Awareness";
        message = "Well done! You have excellent phishing awareness. Keep staying vigilant!";
        color = "#28a745"; // green
    } else if (score >= 10) {
        grade = "Average Phishing Awareness";
        message = "Well done! You have average phishing awareness. A bit more practice will make you stronger!";
        color = "#ffc107"; // yellow/orange
    } else if (score >= 5) {
        grade = "Low Phishing Awareness";
        message = "Well done for completing the quiz! You have low phishing awareness — consider reviewing the questions and retaking soon.";
        color = "#fd7e14"; // orange-red
    } else {
        grade = "Poor Phishing Awareness";
        message = "Oops! You have poor phishing awareness right now. Don't worry — this is a great starting point to learn and improve. Retake the quiz after reviewing common signs of phishing!";
        color = "#dc3545"; // red
    }

    container.innerHTML = `
        <h1 class="text-center">Quiz Complete!</h1>
        <p class="lead text-center">Your Score: <strong>${score}</strong> / ${totalQuestions}</p>
        <h3 class="text-center" style="color: ${color};">Grade: ${grade}</h3>
        <p class="text-center fs-5" style="color: \( {color};"> \){message}</p>
        <div class="text-center mt-4">
            <button class="btn btn-primary btn-lg" onclick="location.reload()">Retake Quiz</button>
        </div>
    `;
}

loadQuestion();
