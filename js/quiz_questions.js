const POKEMON_QUESTIONS = [
    {
        "question": "What is the starting town named in Gen 1?",
        "possibleAnswers": ["Pallet Town", "New Bark Town", "Postwick", "Littleroot Town"]
    },
    {
        "question": "True or False: There are 18 Pokémon types in total?",
        "possibleAnswers": ["True", "False"]
    },
    {
        "question": "How many evolutions does Eevee have?",
        "possibleAnswers": ["8", "6", "9", "1"]
    },
    {
        "question": "What are the three types of starter Pokémon?",
        "possibleAnswers": ["Grass, Fire, Water", "Ghost, Grass, Water", "Water, Electric, Fire", "Fighting, Dark, Normal"]
    },
    {
        "question": "Who was the first Pokémon ever designed?",
        "possibleAnswers": ["Rhydon", "Mew", "Mewtwo", "Pikachu"]
    },
    { 
        "question": "True or False: If a Pokémon was to have Every Type at Once, it Would Have No Weaknesses?",
        "possibleAnswers": ["False", "True"]
    },
    {
        "question": "How does Pikachu evolve into Raichu?",
        "possibleAnswers": ["Thunderstone", "Level up", "Firestone", "Rare Candy"]
    },
    {
        "question": "Which pokemon is a Mythical?",
        "possibleAnswers": ["Celebi", "Caterpie", "Pikachu", "Swampert"]
    },
    {
        "question": "True or False: There is exists a Pokémon with 3 types?",
        "possibleAnswers": ["False", "True"]
    },
    {
        "question": "Squirtle is the best Pokémon?(it is)",
        "possibleAnswers": ["True", "False"]
    }
];

const ANIME_QUESTIONS = [
    {
        "question": "Who is the main character in the Anime Haikyu!!",
        "possibleAnswers": ["good", "bad", "fine", "ok"]
    },
    {
        "question": "What are you doing?",
        "possibleAnswers": ["nothing", "coding", "playing games"]
    },
    {
        "question": "Is Water Wet?",
        "possibleAnswers": ["True", "False"]
    }
];

const MATH_QUESTIONS = [
    {
        "question": "What is 2 + 2?",
        "possibleAnswers": ["4", "5", "21", "0"]
    },
    {
        "question": "Which mathematical subject use matricies?",
        "possibleAnswers": ["linear algebra", "calculus", "algebra"]
    },
    {
        "question": "True or False: Linear Algebra is used in both computer graphics and game developement?",
        "possibleAnswers": ["True", "False"]
    }
];

const _QUESTIONS = [
    {
        "question": "How are you?",
        "possibleAnswers": ["good", "bad", "fine", "ok"]
    },
    {
        "question": "What are you doing?",
        "possibleAnswers": ["nothing", "coding", "playing games"]
    },
    {
        "question": "Is Water Wet?",
        "possibleAnswers": ["True", "False"]
    }
];


function getQuestions(tab) {
    if (tab == "POKÉMON") {
        return POKEMON_QUESTIONS;
    } else if (tab == "ANIME") {
        return ANIME_QUESTIONS;
    } else if (tab == "MATH") {
        return MATH_QUESTIONS;
    } else {
        return _QUESTIONS;
    }
}