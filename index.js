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

function displayCount(score, question, total) {
    document.querySelector("#scoreCount").innerHTML = `Score: ${score} / ${total}`;
    document.querySelector("#questionCount").innerHTML = `Question: ${question} / ${total}`;
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

function setupQuestion(question, answers) {
    displayCount(gScore, gCurrentQuestion, QUESTIONS.length);

    document.querySelector("#questionDisplay").innerHTML = question;
    
    setUpButtonHTML(answers);
    setUpButtonListners();
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
        gScore += 1;
        // TODO: render positive feedback
    } else {
        // TODO: render negative feedback
    }

    // in any case move on 
    gCurrentQuestion += 1;
    if(gCurrentQuestion > QUESTIONS.length) {
        // completed quiz!! TODO: do something

    } else {
        setupQuestion(QUESTIONS[gCurrentQuestion].question, QUESTIONS[gCurrentQuestion].possibleAnswers);
    }
};


// kick start quiz with question 1 
setupQuestion(QUESTIONS[0].question, QUESTIONS[0].possibleAnswers);