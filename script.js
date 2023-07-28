//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What does AI stand for?",
        options: ["Artificial Interest", "Advanced Intelligence", "Artificial Intelligence", "Artificial Invention"],
        correct: "Artificial Intelligence",
    },
    {
        id: "1",
        question: "Which programming language is commonly used for AI development?",
        options: ["Python", "Java", "C++", "Ruby"],
        correct: "Python",
    },
    {
        id: "2",
        question: "What is the primary function of a chatbot?",
        options: ["Image recognition", "Speech synthesis", "Natural language understanding", "Answering user queries"],
        correct: "Answering user queries",
    },
    {
        id: "3",
        question: "Which company's AI-powered virtual assistant is known as AliGenie in China?",
        options: [" Google", "Alibaba", "Apple", "Samsung"],
        correct: "Alibaba",
    },
    {
        id: "4",
        question: "Which AI application can generate human-like text or speech?",
        options: ["Speech Recognition", "Natural Language Processing (NLP)", "Computer Vision", "Robotics"],
        correct: "Natural Language Processing (NLP)",
    },
    {
        id: "5",
        question: "Which AI subfield focuses on creating intelligent agents capable of interacting with the physical world?",
        options: ["Reinforcement Learning", "Natural Language Processing (NLP)", "Robotics", "Object Detection"],
        correct: "Robotics",
    }, {
        id: "6",
        question: "Which AI application is commonly used for detecting spam emails in your inbox?",
        options: ["Speech Recognition ", "Email Filtering", "Sentiment Analysis", "Natural Language Processing (NLP)"],
        correct: "Email Filtering",
    },
    {
        id: "7",
        question: "What is the name of the famous AI-powered virtual assistant developed by Amazon?",
        options: ["Siri", "Cortana", "Alexa", "Google Assistant"],
        correct: "Alexa",
    },
    {
        id: "8",
        question: "What is the name of the famous AI-powered virtual assistant developed by Apple?",
        options: ["Siri", "Cortana", "Alexa", "Google Assistant"],
        correct: "Siri",
    },
    {
        id: "9",
        question: "What is the name of the famous AI-powered virtual assistant developed by Microsoft?",
        options: ["Alexa", "Bixby", "Siri", "Cortona"],
        correct: "Cortona",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};