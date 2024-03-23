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

function showMessage(msg, type) {
    const feedbackContainer = document.getElementById("feedbackContainer");
    feedbackContainer.innerHTML = `<div class = "alert alert-${type}">${msg}</div>`;
    fadeInOutAnimation(feedbackContainer);
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
        this.nextQuestion()

        if (this.quizFinished()) {
            toggleModelOn(this.score, this.questions.length, this.getAnswerChoices());
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

    resetQuiz() {
        this.questions.forEach((question) => {
            question.answerChoice = undefined;
        })

        this.score = 0;
        this.currentQuestion = 0;
        this.start()
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
        answers.forEach((answer, index) => {
            let color = "primary";
            let disabled = false;

            const userChoice = this.questions[this.currentQuestion].answerChoice;
            if (userChoice) {
                if (this.getCorrectAnswer() == userChoice) {
                    color = "success";
                } else {
                    color = "danger";
                }
                disabled = true;
            }

            answersHTML +=
                `<div class="col-6">
                <button class="btn btn-${(userChoice == index) ? color : "primary"} m-1 px-4 py-3 w-100"
                    type="button" data-choice="${index}" ${(disabled) ? "disabled" : ""}>
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