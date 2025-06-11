// Define the quiz questions
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "Hot Mail",
      "How To Make Landingpage",
    ],
    correct: 0, // Index of correct answer
  },
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3,
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style System",
    ],
    correct: 0,
  },
  {
    question: "What does HTTP stand for?",
    answers: [
      "Hyper Transfer Text Protocol",
      "HyperText Transfer Protocol",
      "HighText Transfer Protocol",
      "None of the above",
    ],
    correct: 1,
  },
  {
    question: "Which of the following is a JavaScript framework?",
    answers: ["Django", "React", "Laravel", "Flask"],
    correct: 1,
  },
];

// Track current question index and user score
let currentQuestionIndex = 0;
let score = 0;

// Get DOM elements
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreSpan = document.getElementById("score");

// Load a question and display its options
function loadQuestion() {
  resetState(); // Clear previous question and answers

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  // Create a button for each answer
  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(index); // Handle click
    answersEl.appendChild(btn); // Add button to page
  });
}

// Reset the state before loading a new question
function resetState() {
  answersEl.innerHTML = ""; // Clear old answer buttons
  nextBtn.style.display = "none"; // Hide the "Next" button
}

// Handle user's answer selection
function selectAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correct;
  const buttons = answersEl.querySelectorAll("button");

  // Show correct (green) and incorrect (red) feedback
  buttons.forEach((btn, idx) => {
    btn.disabled = true; // Prevent further clicking
    if (idx === correctIndex) {
      btn.style.backgroundColor = "green";
    } else if (idx === selectedIndex) {
      btn.style.backgroundColor = "red";
    }
  });

  // Update score if answer is correct
  if (selectedIndex === correctIndex) {
    score++;
  }

  // Show "Next" button
  nextBtn.style.display = "block";
}

// When user clicks "Next"
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++; // Go to next question
  if (currentQuestionIndex < questions.length) {
    loadQuestion(); // Load next question
  } else {
    showResult(); // Show final score
  }
});

// Display the user's final score
function showResult() {
  document.getElementById("quiz-box").classList.add("hidden"); // Hide quiz area
  resultBox.classList.remove("hidden"); // Show result area
  scoreSpan.textContent = `${score} / ${questions.length}`; // Display score
}

// Allow user to download a certificate as .txt file
function downloadCertificate() {
  const endDate = new Date(); // Current date for certificate
  const certificateText = `
  ============================
       CODTECH CERTIFICATE
  ============================

  Congratulations!

  You have successfully completed the internship quiz
  with a score of ${score}/${questions.length}.

  Issued on: ${endDate.toDateString()}

  Thank you for learning with CODTECH!
  `;

  // Create a downloadable text file
  const blob = new Blob([certificateText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "CODTECH_Certificate.txt";
  link.click();
}

// Initialize the quiz
loadQuestion();
