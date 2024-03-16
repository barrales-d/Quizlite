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
    constructor(questions) {
        this.questions = questions;
    }

    displayAnswers() {
        let answersHTML = "<div class='row'>";

        let answers = this.questions[this.currentQuestion].possibleAnswers;
        answers.forEach((answer, index) => {

            answersHTML +=
                `<div class="col-6">
                <button class="btn btn-primary m-1 px-4 py-3 w-100" type="button" data-choice="${index}">
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

    getCorrectAnswer() {
        return this.questions[this.currentQuestion].correctAnswer;
    }

    updateQuestion(isCorrect) {
        if (gCurrentQuestion >= QUESTIONS.length) {
            // TODO:endQu iz();
            return;
        }

        this.score += (isCorrect) ? 1 : 0;
        this.currentQuestion += 1;

        this.setUpQuestion();
    }


    answerClicked = (event) => {
        event.preventDefault();
        if (event.target.nodeName != "BUTTON") { return; }
        const choice = event.target.dataset.choice;

        const isCorrect = (parseInt(choice) == this.getCorrectAnswer());
        if (isCorrect) {
            showMessage("Correct!", "success");
        } else {
            showMessage("Incorrect!", "danger");
        }
        this.updateQuestion();
    }

    setEventListener() {
        let answerContainer = document.querySelector("#answerDisplay");

        answerContainer.addEventListener("click", this.answerClicked);
    }

    setUpQuestion() {
        this.displayCurrentQuestion();

        this.setEventListener();
    }

    start() {
        this.setUpQuestion();
    }

}