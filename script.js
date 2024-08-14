import { questions} from 'questions.js'; //importing the qustions array from questions.js

const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-button');
const nextButton = document.getElementById('nex-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');


let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    setNextQuestion();
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
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    nextButton.classList.remove('hide');
    if (currentQuestionIndex >= questions.length - 1) {
        nextButton.innerText = 'Finish';
        nextButton.addEventListener('click', showScore);
    }
}

function showScore() {
    scoreContainer.style.display = 'block';
    scoreElement.innerText = score;
    nextButton.style.display = 'none';
    questionElement.style.display = 'none';
    answerButtonsElement.style.display = 'none';
}

startQuiz();
