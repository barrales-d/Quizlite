const POKEMON_QUESTIONS = [
    {
        "question": "What is the starting town named in Gen 1?",
        "possibleAnswers": ["Pallet Town", "New Bark Town", "Postwick", "Littleroot Town"],
        "correctAnswer": 0,
    },
    {
        "question": "True or False: There are 18 Pokémon types in total?",
        "possibleAnswers": ["True", "False"],
        "correctAnswer": 0,
    },
    {
        "question": "How many evolutions does Eevee have?",
        "possibleAnswers": ["6", "8", "9", "1"],
        "correctAnswer": 1,
    },
    {
        "question": "What are the three types of starter Pokémon?",
        "possibleAnswers": ["Ghost, Grass, Water", "Water, Electric, Fire", "Fighting, Dark, Normal", "Grass, Fire, Water"],
        "correctAnswer": 3,
    },
    {
        "question": "Who was the first Pokémon ever designed?",
        "possibleAnswers": ["Mew", "Rhydon", "Mewtwo", "Pikachu"],
        "correctAnswer": 1,
    },
    { 
        "question": "True or False: If a Pokémon was to have Every Type at Once, it Would Have No Weaknesses?",
        "possibleAnswers": ["True", "False"],
        "correctAnswer": 1,
    },
    {
        "question": "How does Pikachu evolve into Raichu?",
        "possibleAnswers": ["Level up", "Firestone", "Thunderstone", "Rare Candy"],
        "correctAnswer": 2,
    },
    {
        "question": "Which pokemon is a Mythical?",
        "possibleAnswers": ["Caterpie", "Pikachu", "Swampert", "Celebi"],
        "correctAnswer": 3,
    },
    {
        "question": "True or False: There is exists a Pokémon with 3 types?",
        "possibleAnswers": ["True", "False"],
        "correctAnswer": 1,
    },
    {
        "question": "Squirtle is the best Pokémon?(it is)",
        "possibleAnswers": ["True", "False"],
        "correctAnswer": 0,
    }
];

const ANIME_QUESTIONS = [
    {
        "question": "favorite anime?",
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

const _QUESTIONS = [
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


function getQuestions(tab) {
    if (tab == "POKÉMON") {
        return POKEMON_QUESTIONS;
    } else if (tab == "ANIME") {
        return ANIME_QUESTIONS;
    } else {
        return _QUESTIONS;
    }
}