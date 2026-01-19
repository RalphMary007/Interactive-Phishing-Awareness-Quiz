// --- Question Pools (unchanged) ---
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

// --- Combine all questions into one pool and shuffle ---
let allQuestions = [
    ...easyQuestions,
    ...mediumQuestions,
    ...hardQuestions
];

// Fisher-Yates (Knuth) shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle once at the beginning
allQuestions = shuffle(allQuestions);

let currentQuestion = 0;
let score = 0;
let totalQuestions = 20; // still 20 questions (you can increase if you want)

// Adaptive threshold: after question 6, if performance is strong, pull more from harder questions
const adaptiveThreshold = 0.7;
const adaptiveStartAfter = 6;

function loadQuestion() {
    if (currentQuestion < totalQuestions) {
        // Adaptive logic: if user is doing well early, increase chance of harder questions
        if (currentQuestion >= adaptiveStartAfter && score / currentQuestion > adaptiveThreshold) {
            // Filter remaining questions to prefer harder ones
            const remaining = allQuestions.slice(currentQuestion);
            const hardRemaining = remaining.filter(q => q.difficulty === 'hard');
            if (hardRemaining.length > 0 && Math.random() < 0.7) { // 70% chance to pick hard
                const randomHard = hardRemaining[Math.floor(Math.random() * hardRemaining.length)];
                document.getElementById('question').textContent = randomHard.text;
                // Note: we don't remove it here to keep it simple — real apps would splice
            } else {
                document.getElementById('question').textContent = allQuestions[currentQuestion].text;
            }
        } else {
            document.getElementById('question').textContent = allQuestions[currentQuestion].text;
        }
    } else {
        showResults();
    }
    updateProgress();
}

function updateProgress() {
    document.getElementById('progress-bar').style.width = (currentQuestion / totalQuestions * 100) + '%';
}

function answer(isPhishing) {
    const current = allQuestions[currentQuestion];
    const correct = current.isPhishing === isPhishing;
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
    const container = document.querySelector('.card-body');
    let grade = "";
    let message = "";
    let color = "";

    if (score >= 15) {
        grade = "Excellent Phishing Awareness";
        message = "Outstanding! You demonstrated strong awareness and sharp detection skills. You're well-equipped to stay safe online.";
        color = "#28a745"; // green
    } else if (score >= 10) {
        grade = "Average Phishing Awareness";
        message = "Solid effort! You spotted many signs, but there's still room to sharpen your skills. Review the tougher examples and try again.";
        color = "#ffc107"; // yellow/orange
    } else if (score >= 5) {
        grade = "Low Phishing Awareness";
        message = "Good start — you've completed the quiz! Your current awareness is still developing. Focus on spotting urgency and spoofed details next time.";
        color = "#fd7e14"; // orange-red
    } else {
        grade = "Poor Phishing Awareness";
        message = "This is a valuable wake-up call. Phishing tactics can be very deceptive — take time to study the common signs and retake the quiz when ready.";
        color = "#dc3545"; // red
    }

    container.innerHTML = `
        <h1 class="text-center">Quiz Complete!</h1>
        <p class="lead text-center">Your Score: <strong>${score}</strong> out of ${totalQuestions}</p>
        <h3 class="text-center" style="color: \( {color};"> \){grade}</h3>
        <p class="text-center fs-5" style="color: \( {color};"> \){message}</p>
        <div class="text-center mt-4">
            <button class="btn btn-primary btn-lg" onclick="location.reload()">Retake Quiz</button>
        </div>
    `;
}

loadQuestion();
