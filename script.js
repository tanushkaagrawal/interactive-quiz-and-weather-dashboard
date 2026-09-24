// ================================
// INTERACTIVE QUIZ
// ================================

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },

    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "Java", correct: false }
        ]
    },

    {
        question: "Which language is mainly used to make web pages interactive?",
        answers: [
            { text: "CSS", correct: false },
            { text: "HTML", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "#", correct: false },
            { text: "<!-- -->", correct: false },
            { text: "/*/", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const result = document.getElementById("result");
const scoreElement = document.getElementById("score");

function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    quizContainer.classList.remove("hidden");
    result.classList.add("hidden");

    nextButton.style.display = "none";

    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText =
        (currentQuestionIndex + 1) +
        ". " +
        currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event) {

    const selectedButton = event.target;

    const isCorrect =
        selectedButton.dataset.correct === "true";

    if (isCorrect) {

        selectedButton.classList.add("correct");

        score++;

    } else {

        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
});

function showResult() {

    quizContainer.classList.add("hidden");

    result.classList.remove("hidden");

    scoreElement.innerText =
        "Your Score: " + score + " / " + questions.length;
}

function restartQuiz() {

    startQuiz();
}

startQuiz();


// ================================
// WEATHER DASHBOARD
// ================================

// OpenWeatherMap API key
const API_KEY = "YOUR_API_KEY";

async function getWeather() {

    const city =
        document.getElementById("city-input").value.trim();

    if (city === "") {

        alert("Please enter a city name.");

        return;
    }

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {

            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("city-name").innerText =
            data.name + ", " + data.sys.country;

        document.getElementById("temperature").innerText =
            Math.round(data.main.temp) + " °C";

        document.getElementById("description").innerText =
            data.weather[0].description;

        document.getElementById("humidity").innerText =
            data.main.humidity + "%";

        document.getElementById("wind").innerText =
            data.wind.speed + " km/h";

        updateWeatherIcon(data.weather[0].main);

    } catch (error) {

        alert("City not found. Please enter a valid city name.");

    }
}


// Weather icon based on condition

function updateWeatherIcon(condition) {

    const icon = document.getElementById("weather-icon");

    if (condition === "Clear") {

        icon.innerText = "☀️";

    } else if (condition === "Clouds") {

        icon.innerText = "☁️";

    } else if (condition === "Rain") {

        icon.innerText = "🌧️";

    } else if (condition === "Thunderstorm") {

        icon.innerText = "⛈️";

    } else if (condition === "Snow") {

        icon.innerText = "❄️";

    } else if (condition === "Mist" || condition === "Fog") {

        icon.innerText = "🌫️";

    } else {

        icon.innerText = "🌤️";
    }
}
