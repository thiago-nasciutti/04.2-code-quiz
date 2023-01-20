//Selectors
var homeEl = document.querySelector("#home");
var startBtnEl = document.querySelector("#startBtn");
var questionCardEl = document.querySelector("#questionCard");
var questionEl = document.querySelector("#question");
var choiceAEl = document.querySelector("#choiceA");
var choiceBEl = document.querySelector("#choiceB");
var choiceCEl = document.querySelector("#choiceC");
var choiceDEl = document.querySelector("#choiceD");
var resultCardEl = document.querySelector("#resultCard");
var resultEl = document.querySelector("#result");
var scoreCardEl = document.querySelector("#scoreCard");
var yourScoreEl = document.querySelector("#yourScore");
var countdownEl = document.querySelector("#countdown");
var nameEl = document.querySelector("#name");
var saveBtnEl = document.querySelector("#saveBtn");
var rankingBtnEl = document.querySelector("#rankingBtn");
var rankingCardEl = document.querySelector("#rankingCard");
var orderedListEl = document.querySelector("#orderedList");
var goBackBtnEl = document.querySelector("#goBackBtn");
var headerEl = document.querySelector("header");
var clearScoresBtnEl = document.querySelector("#clearScoresBtn");

//Global Variable
var questionIndex = 0;
var time = 75;
var scoresArr = [];
if (localStorage.getItem("storageString")) {
  scoresArr = JSON.parse(localStorage.getItem("storageString"));
}
var myInterval;

//Questions
var arr = [
  {
    question: "Commonly used data types DO Not Include:",
    choices: [
      "Strings",
      "Booleans",
      "Alerts",
      "Numbers"],
    answer: "Alerts"
  },
  {
    question:
      "The condition in an if/else statement is enclosed with__________.",
    choices: [
      "Quotes",
      "Curly brackets",
      "Parenthesis",
      "Square brackets"
    ],
    answer: "Parenthesis"
  },
  {
    question: "Arrays in javaScript can be used to store__________.",
    choices: [
      "Numbers and strings",
      "Other arrays",
      "Booleans",
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    question:
      "String values must be enclosed within__________when being assigned to variables.",
    choices: [
      "Commas",
      "Curly brackets",
      "Quotes",
      "Parenthesis"
    ],
    answer: "Quotes"
  },
  {
    question:
      "A very usefull tool used during development and debugging for printind content to the debugger is:",
    choices: [
      "JavaScript",
      "Terminal",
      "For loops",
      "Console.log"
    ],
    answer: "Console.log"
  },
];

//Functions
function startFt() {
  homeEl.style.display = "none";
  questionCardEl.style.display = "block";
  resultCardEl.style.display = "block";
  displayQuestion();
  myInterval = setInterval(updateCountdown, 1000);
}

function stopTime() {
  clearInterval(myInterval);
}

function updateCountdown() {
  time--;
  countdownEl.textContent = "Time: " + time;
}

function displayQuestion() {
  questionEl.textContent = arr[questionIndex].question;
  choiceAEl.textContent = arr[questionIndex].choices[0];
  choiceBEl.textContent = arr[questionIndex].choices[1];
  choiceCEl.textContent = arr[questionIndex].choices[2];
  choiceDEl.textContent = arr[questionIndex].choices[3];
}

function displayScore() {
  homeEl.style.display = "none";
  questionCardEl.style.display = "none";
  scoreCardEl.style.display = "block";
  resultCardEl.style.display = "block";
}

function saveFt() {
  nameEl.value;
  var userInfo = {
    Name: nameEl.value,
    Score: time,
  };
  scoresArr.push(userInfo);
  localStorage.setItem("storageString", JSON.stringify(scoresArr));
  rankingFt();
}

function rankingFt() {
  homeEl.style.display = "none";
  questionCardEl.style.display = "none";
  scoreCardEl.style.display = "none";
  resultCardEl.style.display = "none";
  rankingCardEl.style.display = "block";
  headerEl.style.display = "none";

  var storageString = localStorage.getItem("storageString");
  var storageParse = JSON.parse(storageString);
  console.log(storageString);
  console.log(storageParse);

  for (var i = 0; i < scoresArr.length; i++) {
    var listEl = document.createElement("li");
    listEl.textContent = storageParse[i].Name + " / " + storageParse[i].Score;
    orderedListEl.appendChild(listEl);
  }
}
function choiceFt(event) {
  if (questionIndex < arr.length) {
    if (event.target.className == "choice") {
      if (event.target.textContent == arr[questionIndex].answer) {
        resultEl.textContent = "Correct!";
        resultEl.setAttribute("style", "color: greenyellow");
      } else {
        resultEl.textContent = "Wrong!";
        resultEl.setAttribute("style", "color:red");
        time -= 10;
        countdownEl.textContent = "Time: " + time;
      }
      questionIndex++;
      if (questionIndex == arr.length) {
        stopTime();
        displayScore();
        yourScoreEl.textContent = "Your Score is: " + time;
      } else {
        displayQuestion();
      }
    }
  }
}

function goBackFt() {
  homeEl.style.display = "block";
  questionCardEl.style.display = "none";
  scoreCardEl.style.display = "none";
  resultCardEl.style.display = "none";
  rankingCardEl.style.display = "none";
  headerEl.style.display = "flex";
  headerEl.style.justifyContent = "space-between";
  window.location.reload();
}

function clearScoresFt() {
  localStorage.setItem("storageString", "");
  window.location.reload();
}

//Event Listeners
startBtnEl.addEventListener("click", startFt);
questionCardEl.addEventListener("click", choiceFt);
saveBtnEl.addEventListener("click", saveFt);
rankingBtnEl.addEventListener("click", rankingFt);
goBackBtnEl.addEventListener("click", goBackFt);
clearScoresBtnEl.addEventListener("click", clearScoresFt);
