const BOOTSTRAP_COLORS = ["primary", "success", "danger", "warning"];

// TODO: make it not global?
const QUESTIONS = [
    {
        "question": "How are you?",
        "possibleAnswers": ["good", "bad", "fine", "ok"],
        "correctAnswer": 0,
    },
    {
        "question": "What are you doing?",
        "possibleAnswers": ["nothing", "coding", "playing games"],
        "correctAnswer": 1,
    },
    {
        "question": "Is Water Wet?",
        "possibleAnswers": ["True", "False"],
        "correctAnswer": 1,
    }
];

let gScore = 0;
let gCurrentQuestion = 0;

const animateOpacity = (element, fadeIn = true) => {
    const timingSettings = {
        duration: 300,
        easing: "ease-out",
        iterations: 1
    };

    keyframes = []
    if (fadeIn) {
        keyframes = [{ "opacity": 0 }, { "opacity": 1 }];
    } else {
        keyframes = [{ "opacity": 1 }, { "opacity": 0 }];
    }

    return element.animate(keyframes, timingSettings);
};

function nextQuestion() {
    // in any case move on 
    gCurrentQuestion += 1;
    if (gCurrentQuestion >= QUESTIONS.length) {
        // completed quiz!! TODO: do something
        displayCount(gScore, gCurrentQuestion - 1, QUESTIONS.length);

    } else {
        setupQuestion(QUESTIONS[gCurrentQuestion].question, QUESTIONS[gCurrentQuestion].possibleAnswers);
    }
}

function showMessage(msg, type) {
    const feedbackContainer = document.getElementById("feedbackContainer");
    feedbackContainer.innerHTML = `<div class = "alert alert-${type}">${msg}</div>`;

    animateOpacity(feedbackContainer).onfinish = (event) => {
        event.preventDefault();
        animateOpacity(feedbackContainer, false).onfinish = (event) => {
            event.preventDefault();
            feedbackContainer.innerHTML = "";
            nextQuestion();
        };
    };
}

function displayCount(score, question, total) {
    document.querySelector("#scoreCount").innerHTML = `Score: ${score} / ${total}`;
    document.querySelector("#questionCount").innerHTML = `Question: ${question + 1} / ${total}`;
}

function setUpButtonHTML(answers) {
    let answersHTML = "<div class='row'>";
    answers.forEach((answer, index) => {

        answersHTML +=
            `<div class="col-6">
            <button class="btn btn-${BOOTSTRAP_COLORS[index % BOOTSTRAP_COLORS.length]}
                m-1 px-4 py-3 w-100" type="button" data-choice="${index}">
                ${answer}
            </button>
        </div>`;

    });
    answersHTML += "</div>";

    document.querySelector("#answerDisplay").innerHTML = answersHTML;
}

function setUpButtonListners() {
    const buttons = document.querySelectorAll("div.col-6 > button");

    buttons.forEach((btn) => {
        btn.addEventListener("click", handleButtonSelect);
    });
}

function checkAnswer(selection) {
    const question = QUESTIONS[gCurrentQuestion];
    const correctAnswer = question.possibleAnswers[question.correctAnswer];

    const userAnswer = question.possibleAnswers[selection];
    return (userAnswer === correctAnswer);
}

function handleButtonSelect(event) {
    event.preventDefault();
    const userSelection = event.srcElement.dataset.choice;
    let isCorrect = checkAnswer(parseInt(userSelection));

    if (isCorrect) {
        showMessage("Correct!", BOOTSTRAP_COLORS[1]);
        gScore += 1;
    } else {
        showMessage("Incorrect!", BOOTSTRAP_COLORS[2]);
    }
};

function setupQuestion(question, answers) {
    displayCount(gScore, gCurrentQuestion, QUESTIONS.length);

    document.querySelector("#questionDisplay").innerHTML = question;

    setUpButtonHTML(answers);
    setUpButtonListners();
}
// kick start quiz with question 1 
setupQuestion(QUESTIONS[0].question, QUESTIONS[0].possibleAnswers);