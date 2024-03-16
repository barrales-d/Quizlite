// const BOOTSTRAP_COLORS = ["primary", "success", "danger", "warning"];
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

const quiz1 = new Quiz(QUESTIONS);
quiz1.start()