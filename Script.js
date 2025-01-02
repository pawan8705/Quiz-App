let questions = [
    {
        question: "Which is largest animal in the world ?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Cow", correct: false },
            { text: "Elephant", correct: false },
            { text: "Blue whale", correct: true },
        ]
    },
    {
        question: "Which is the smallest continent in the world ?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    },
    {
        question: "Which is the largest continent in the world ?",
        answers: [
            { text: "Asia", correct: true },
            { text: "Australia", correct: false },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    },
    {
        question: "Which is tae largest desert in the world ?",
        answers: [
            { text: "Gobi", correct: false },
            { text: "Kalahari", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antartica", correct: true },
        ]
    },
    {
        question: "Which is the smallest contry in the world ?",
        answers: [
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Shri Lanka", correct: false },
            { text: "Vatican City", correct: true },
        ]
    }
];

let questionElement = document.getElementById("ques");
let answerbtn = document.getElementById("ans-btn");
let nextbtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState() {
    nextbtn.style.display = "none";
    while (answerbtn.firstChild) {
        answerbtn.removeChild(answerbtn.firstChild);
    }
}


function selectAnswer(e){
    let selectedbtn = e.target;
    let isCorrect = selectedbtn.dataset.correct==="true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbtn.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextbtn.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML ="Play Again";
    nextbtn.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();