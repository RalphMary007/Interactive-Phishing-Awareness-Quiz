function showResults() {
    const container = document.querySelector('.card-body');
    let grade = "";
    let color = "";

    if (score >= 15) {
        grade = "Excellent Phishing Awareness";
        color = "#28a745"; // green
    } else if (score >= 10) {
        grade = "Average Phishing Awareness";
        color = "#ffc107"; // yellow/orange
    } else if (score >= 5) {
        grade = "Low Phishing Awareness";
        color = "#fd7e14"; // orange-red
    } else {
        grade = "Poor Phishing Awareness";
        color = "#dc3545"; // red
    }

    container.innerHTML = `
        <h1 class="text-center">Quiz Complete!</h1>
        <p class="lead text-center">Your Score: <strong>${score}</strong> out of ${totalQuestions}</p>
        <h3 class="text-center" style="color: \( {color};"> \){grade}</h3>
        <div class="text-center mt-4">
            <button class="btn btn-primary btn-lg" onclick="location.reload()">Retake Quiz</button>
        </div>
    `;
}
