const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text')); //this was returning an html collection that had to be converted into an array

//const questionCounterText = document.getElementById('questionCounter');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = []

// CONSTANTS 

fetch("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple")
   
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);
      
        questions = loadedQuestions.results.map(loadedQuestions => {
            const formattedQuestion = {
                question: loadedQuestions.question
           };
           const answerChoices = [...loadedQuestions.incorrect_answers];
           formattedQuestion.answer = Math.floor(Math.random() * 3) +1;
           answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestions.incorrect_answers);

           answerChoices.forEach((choice, index) => {
               formattedQuestion["choice" + (index + 1)] = choice;
           });

           return formattedQuestion;
        });
       
        startGame();
    })
    .catch(err => {
        console.log(err);
    })
  

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        console.log(score)
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
    questionCounter++;
    progressText.innerText = 'Question'+ questionCounter + '/' + MAX_QUESTIONS;
   
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
   
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

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion(); 
        }, 1000);
       
        
        
        

    })
})

incrementScore = num => {
    score += num;
    console.log(score);
    scoreText.innerText = score;
}

