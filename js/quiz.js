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

function showMessage(msg, type) {
    const feedbackContainer = document.getElementById("feedbackContainer");
    feedbackContainer.innerHTML = `<div class = "alert alert-${type}">${msg}</div>`;

    animateOpacity(feedbackContainer).onfinish = (event) => {
        event.preventDefault();
        animateOpacity(feedbackContainer, false).onfinish = (event) => {
            event.preventDefault();
            feedbackContainer.innerHTML = "";
        };
    };
}

class Quiz {
    score = 0;
    currentQuestion = 0;
    // questions should be an array of objects
    // each object should be a question object in this format:
    // {
    //     "question": "How are you?",
    //     "possibleAnswers": ["good", "bad", "fine", "ok"],
    //     "correctAnswer": 0,
    // }
    //      "answerChoice" will be defined by the quiz class as the user answer questions
    constructor(questions) {
        this.questions = questions;
    }

    start() {
        this.setUpQuestion();
    }

    setUpQuestion() {
        this.displayCurrentQuestion();
        this.setEventListener();
    }

    updateQuestion(isCorrect) {
        this.score += (isCorrect) ? 1 : 0;
        // this.currentQuestion += 1;
        this.nextQuestion()

        debugger;
        if (this.quizFinished()) {
            // TODO:endQuiz();
            $('#quizCompleted').modal('toggle');
            return;
        }

        this.setUpQuestion();
    }

    // Logical Helpers ****************************************
    getCorrectAnswer() {
        return this.questions[this.currentQuestion].correctAnswer;
    }

    quizFinished() {
        // quiz finishes when all questions have been answered
        for (let i = 0; i < this.questions.length; i++) {
            if (!this.questions[i].answerChoice) {
                return false;
            }
        }
        return true;
    }

    // End of Logical Helpers ****************************************

    // Render Functions ****************************************
    displayAnswers() {
        let answersHTML = "<div class='row'>";

        let answers = this.questions[this.currentQuestion].possibleAnswers;
        answers.forEach((answer, index) => {
            let color = "primary";
            const userChoice = this.questions[this.currentQuestion].answerChoice;
            if (userChoice) {
                if (this.getCorrectAnswer() == userChoice) {
                    color = "success";
                } else {
                    color = "danger";
                }
            }

            answersHTML +=
                `<div class="col-6">
                <button class="btn btn-${(userChoice == index) ? color : "primary"} m-1 px-4 py-3 w-100" type="button" data-choice="${index}">
                    ${answer}
                </button>
            </div>`;

        });
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

        const isCorrect = (parseInt(choice) == this.getCorrectAnswer());
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

    setEventListener() {
        let answerContainer = document.querySelector("#answerDisplay");
        answerContainer.addEventListener("click", this.answerClicked);

        let previousBtn = document.querySelector("#previousBtn");
        previousBtn.addEventListener("click", this.previousQuestion);

        let nextBtn = document.querySelector("#nextBtn");
        nextBtn.addEventListener("click", this.nextQuestion);
    }
    // End of Event Handlers ****************************************
}