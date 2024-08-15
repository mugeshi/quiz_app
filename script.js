import { questions } from './questions.js'; 

const questionElement = document.getElementById('questions'); 
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    scoreContainer.style.display = 'none'; // Hide score container at the start
    setNextQuestion();

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
        } else {
            showScore();
        }
    });
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide'); // Hide the "Next" button at the start of a new question
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(button, answer) {
    Array.from(answerButtonsElement.children).forEach(btn => {
        btn.disabled = true; // Disable all buttons after selecting an answer
    });

    const correctAnswer = questions[currentQuestionIndex].answers.find(ans => ans.correct);
    
    if (answer.correct) {
        score++;
        button.classList.add('correct');
        button.innerHTML += ' &#10004;'; // Add tick sign to correct answer
    } else {
        button.classList.add('incorrect');
        button.innerHTML += ' &#10060;'; // Add wrong sign to incorrect answer
    }

    // Highlight the correct answer if the selected answer was incorrect
    Array.from(answerButtonsElement.children).forEach(btn => {
        if (btn.innerText === correctAnswer.text && !answer.correct) {
            btn.classList.add('correct');
            btn.innerHTML += ' &#10004;';
        }
    });

    nextButton.classList.remove('hide'); // Show the "Next" button
}

function showScore() {
    scoreContainer.style.display = 'block';
    scoreElement.innerText = `${score} out of ${questions.length}`;
    nextButton.style.display = 'none';
    questionElement.style.display = 'none';
    answerButtonsElement.style.display = 'none';
}

startQuiz();
