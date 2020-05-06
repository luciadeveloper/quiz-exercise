const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

console.log(mostRecentScore)

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score); // adds the item to the end of the array
    highScores.sort((a, b) => b.score - a.score); //orders an array of objects, depending on one of the values
    highScores.splice(5); // removes from array what is after position 4

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
};