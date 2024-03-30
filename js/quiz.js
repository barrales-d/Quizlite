function fadeInOutAnimation(element) {
    const timingSettings = {
        duration: 1000,
        easing: "ease-out",
        iterations: 1
    };

    keyframes = [
        { "opacity": 1 },
        { "opacity": 0 }
    ];

    element.animate(keyframes, timingSettings).onfinish = (e) => {
        e.preventDefault();
        element.innerHTML = "";
    };
};

// Displays a message to the user which fades out after one second using the funciton above.
function showMessage(msg, type) {
    const feedbackContainer = document.getElementById("feedbackContainer");
    feedbackContainer.innerHTML = `<div class = "alert alert-${type}">${msg}</div>`;
    fadeInOutAnimation(feedbackContainer);
}

// copied from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

class Quiz {
    // questions should be an array of objects
    // each object should be a question object in this format:
    // {
    //     "question": "How are you?",
    //     "possibleAnswers": ["good", "bad", "fine", "ok"],
    //      "answerChoice" will be defined by the quiz class as the user answer questions
    // }
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.currentQuestion = 0;
    }

    start() {
        this.questions.forEach((question) => {
            question.answerChoice = undefined;
        })

        shuffleArray(this.questions);

        this.score = 0;
        this.currentQuestion = 0;
        this.setUpQuestion();
    }

    setUpQuestion() {
        this.displayCurrentQuestion();
        this.setEventListeners();
    }

    updateQuestion(isCorrect) {
        this.score += (isCorrect) ? 1 : 0;
        this.nextQuestion()

        if (this.quizFinished()) {
            toggleModelOn(this.score, this.questions.length, this.getAnswerChoices());
            return;
        }

        this.removeEventListeners();
        this.setUpQuestion();
    }

    // Logical Helpers ****************************************
    quizFinished() {
        // quiz finishes when all questions have been answered
        for (let i = 0; i < this.questions.length; i++) {
            if (!this.questions[i].answerChoice) {
                return false;
            }
        }
        return true;
    }

    getAnswerChoices() {
        // return list of object with variables: questions, isCorrect, answer
        let answers = []
        this.questions.forEach((q) => {
            const isCorrect = (q.correctAnswer == q.answerChoice);
            let ans = {
                "question": q.question,
                "isCorrect": isCorrect,
                "selectedAnswer": q.possibleAnswers[q.answerChoice]
            };

            answers.push(ans);
        });

        return answers;
    }

    // End of Logical Helpers ****************************************

    // Render Functions ****************************************
    displayAnswers() {
        let answersHTML = "<div class='row'>";

        let answers = this.questions[this.currentQuestion].possibleAnswers;
        let answersArray = [];
        answers.forEach((answer, index) => {
            let color = "primary";
            let disabled = false;

            const userChoice = this.questions[this.currentQuestion].answerChoice;
            if (userChoice) {
                if (userChoice == 0) {
                    color = "success";
                } else {
                    color = "danger";
                }
                disabled = true;
            }

            answersArray.push(
                `<div class="col-6">
                    <button class="btn btn-${(userChoice == index) ? color : "primary"} m-1 px-4 py-3 w-100"
                    type="button" data-choice="${index}" ${(disabled) ? "disabled" : ""}>
                    ${answer}
                    </button>
                </div>`
            );
        });

        shuffleArray(answersArray);

        answersHTML += answersArray.join("");

        answersHTML += "</div>";

        document.querySelector("#answerDisplay").innerHTML = answersHTML;
    }

    displayCurrentQuestion() {
        let total = this.questions.length;
        document.querySelector("#scoreCount").innerHTML = `Score: ${this.score} / ${total}`;
        document.querySelector("#questionCount").innerHTML = `Question: ${this.currentQuestion + 1} / ${total}`;

        document.querySelector("#questionDisplay").innerHTML = this.questions[this.currentQuestion].question;

        this.displayAnswers();
    }

    // End of Render Functions ****************************************

    // Event Handlers ****************************************
    answerClicked = (event) => {
        event.preventDefault();
        if (event.target.nodeName != "BUTTON") { return; }

        if (this.questions[this.currentQuestion].answerChoice) { return; }

        const choice = event.target.dataset.choice;

        const isCorrect = (parseInt(choice) == 0);
        if (isCorrect) {
            showMessage("Correct!", "success");
        } else {
            showMessage("Incorrect!", "danger");
        }

        this.questions[this.currentQuestion].answerChoice = choice;

        this.updateQuestion(isCorrect);
    }

    nextQuestion = (event) => {
        if (event) { event.preventDefault(); }

        this.currentQuestion = Math.min(this.questions.length - 1, this.currentQuestion + 1);
        this.setUpQuestion();
    }

    previousQuestion = (event) => {
        if (event) { event.preventDefault(); }

        this.currentQuestion = Math.max(0, this.currentQuestion - 1);
        this.setUpQuestion();
    }

    setEventListeners() {
        let answerContainer = document.querySelector("#answerDisplay");
        answerContainer.addEventListener("click", this.answerClicked);

        let previousBtn = document.querySelector("#previousBtn");
        previousBtn.addEventListener("click", this.previousQuestion);

        let nextBtn = document.querySelector("#nextBtn");
        nextBtn.addEventListener("click", this.nextQuestion);
    }

    removeEventListeners() {
        let answerContainer = document.querySelector("#answerDisplay");
        answerContainer.removeEventListener("click", this.answerClicked);

        let previousBtn = document.querySelector("#previousBtn");
        previousBtn.removeEventListener("click", this.previousQuestion);

        let nextBtn = document.querySelector("#nextBtn");
        nextBtn.removeEventListener("click", this.nextQuestion);
    }

    // End of Event Handlers ****************************************
}