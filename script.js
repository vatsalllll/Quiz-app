const questions = [
  {
    question: "Which HTML tag is used to define an inline style?",
    choice1: "<script>",
    choice2: "<css>",
    choice3: "<style>",
    choice4: "<span>",
    answer: 3,
  },
  {
    question: "Which property is used to change the text color in CSS?",
    choice1: "text-color",
    choice2: "font-color",
    choice3: "text-style",
    choice4: "color",
    answer: 4,
  },
  {
    question: "Which of the following is the correct way to comment in HTML?",
    choice1: "// Comment",
    choice2: "<!-- Comment -->",
    choice3: "/* Comment */",
    choice4: "<! Comment>",
    answer: 2,
  },
  {
    question: "Which CSS property is used to change the font of an element?",
    choice1: "font-family",
    choice2: "font-style",
    choice3: "font-weight",
    choice4: "font-size",
    answer: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let questionNumber = 1;
const questionElement = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");
const scoreDisplay = document.getElementById("score");
const questionNumberDisplay = document.getElementById("question-number");
const progressBar = document.getElementById("progress");

function displayQuestion() {
  const question = questions[currentQuestion];
  questionElement.textContent = question.question;
  answerBtns.forEach((btn, index) => {
    btn.textContent = question[`choice${index + 1}`];
  });
  updateProgressBar();
}

function updateProgressBar() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showResult(isCorrect) {
  answerBtns.forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.answer === questions[currentQuestion].answer.toString()) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("incorrect");
    }
  });

  setTimeout(() => {
    answerBtns.forEach((btn) => {
      btn.classList.remove("correct", "incorrect");
      btn.disabled = false;
    });
    if (isCorrect) {
      score += 10;
    }
    scoreDisplay.textContent = score;
    currentQuestion++;
    questionNumber++;
    questionNumberDisplay.textContent = questionNumber;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      showEndScreen();
    }
  }, 1000);
}

answerBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedAnswer = btn.dataset.answer;
    const isCorrect =
      selectedAnswer === questions[currentQuestion].answer.toString();
    showResult(isCorrect);
  });
});

function startQuiz() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  displayQuestion();
}

function showEndScreen() {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("end").classList.remove("hidden");
  document.getElementById("final-score").textContent = score;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  questionNumber = 1;
  scoreDisplay.textContent = score;
  questionNumberDisplay.textContent = questionNumber;
  progressBar.style.width = "0%";
  document.getElementById("end").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  displayQuestion();
}

function returnHome() {
  document.getElementById("end").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}
