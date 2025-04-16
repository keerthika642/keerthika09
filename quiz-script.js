const quizData = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the text size?",
        answers: [
            { text: "text-style", correct: false },
            { text: "font-size", correct: true },
            { text: "text-size", correct: false },
            { text: "font-style", correct: false }
        ]
    },
    {
        question: "What is the smallest header in HTML by default?",
        answers: [
            { text: "h1", correct: false },
            { text: "h2", correct: false },
            { text: "h6", correct: true },
            { text: "h4", correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const feedbackElement = document.getElementById('feedback');
const resultsContainer = document.getElementById('results-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false; // Flag to track if an answer was selected

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;
    feedbackElement.textContent = '';
    nextButton.classList.add('hide');
    resultsContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    nextButton.disabled = false; // Re-enable next button if disabled
    totalQuestionsElement.textContent = quizData.length;
    showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(question) {
    answerSelected = false; // Reset selection flag for new question
    feedbackElement.textContent = ''; // Clear feedback
    questionElement.textContent = question.question;
    answerButtonsElement.innerHTML = ''; // Clear previous buttons

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Add data attribute for correct answer
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    nextButton.classList.add('hide'); // Hide next button until an answer is selected
}

function selectAnswer(e) {
    if (answerSelected) return; // Prevent changing answer after selection
    answerSelected = true;

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    // Disable all buttons after selection
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct === "true");
    });

    if (correct) {
        score++;
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = '#28a745';
    } else {
        feedbackElement.textContent = "Wrong!";
        feedbackElement.style.color = '#dc3545';
        // Optionally highlight the correct answer
        Array.from(answerButtonsElement.children).find(button => button.dataset.correct === "true").classList.add('correct');
    }

    // Show next button or finish button
    if (quizData.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.textContent = 'Finish'; // Change text for the last question
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, isCorrect) {
    clearStatusClass(element);
    if (isCorrect) {
        element.classList.add('correct');
    } else {
         // Only add 'wrong' to the one actually clicked if it was wrong
         if(element.disabled && element.dataset.correct !== "true" && element === event.target) {
              element.classList.add('wrong');
         }
    }
}


function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResults() {
    questionContainer.classList.add('hide');
    controls.classList.add('hide'); // Hide controls div containing feedback and next button
    resultsContainer.classList.remove('hide');
    scoreElement.textContent = score;
}


nextButton.addEventListener('click', () => {
    if (quizData.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion(quizData[currentQuestionIndex]);
    } else {
        // End of Quiz
        showResults();
    }
});

restartButton.addEventListener('click', startQuiz);

// Start the quiz on page load
startQuiz();