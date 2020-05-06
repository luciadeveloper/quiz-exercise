const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text')); //this was returning an html collection that had to be converted into an array

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        "question": "Inside which HTML element do we put the JavaScript??",
        "choice1": "&ltscript&gt",
        "choice2": "&ltjavascript&gt",
        "choice3": "&ltjs&gt",
        "choice4": "&ltscripting&gt",
        "answer": 1
    },
    {
        "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
        "choice1": "&ltscript href='xxx.js'&gt",
        "choice2": "&ltscript name='xxx.js'&gt",
        "choice3": "&ltscript src='xxx.js'&gt",
        "choice4": "&ltscript file='xxx.js'&gt",
        "answer": 3
    },
    {
        "question": " How do you write 'Hello World' in an alert box?",
        "choice1": "msgBox('Hello World');",
        "choice2": "alertBox('Hello World');",
        "choice3": "msg('Hello World');",
        "choice4": "alert('Hello World');",
        "answer": 4
    }
]

// CONSTANTS 

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCountr = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign('/end.html')
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() + availableQuestions.length -1);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
   
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach( choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer =  selectedChoice.dataset['number'] ;
       
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(classToApply);
        
        //selectedChoice.parentElement.classList.remove(classToApply);
        
        
        getNewQuestion(); 

    })
})

startGame();