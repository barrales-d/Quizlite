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
        "question": "Which Pokémon is a Mythical?",
        "possibleAnswers": ["Celebi", "Caterpie", "Pikachu", "Swampert"]
    },
    {
        "question": "True or False: There exists a Pokémon with 3 types?",
        "possibleAnswers": ["False", "True"]
    },
    {
        "question": "Squirtle is the best Pokémon? (it is)",
        "possibleAnswers": ["True", "False"]
    }
];

const ANIME_QUESTIONS = [
    {
        "question": "Who is the main character in the Anime Haikyu!!",
        "possibleAnswers": ["Shoyo Hinata", "Kiyoko Shimizu", "Ryūnosuke Tanaka", "Kenma Kozume"]
    },
    {
        "question": "What sport is Haikyu!! about?",
        "possibleAnswers": ["Volleyball", "Basketball", "Soccer"]
    },
    {
        "question": "Which team was popularly known as the 'íron wall'?",
        "possibleAnswers": ["Date Tech High School", "Nekoma High School", "Karasuno High School"]
    },
    {
        "question": "What is Shoyo Hinata's jersey number?",
        "possibleAnswers": ["10", "20", "11", "1"]
    },
    {
        "question": "True or False: In Haikyu!! Season one, Karasuno beat Aoba Johsai High in their Interhigh Preliminaries match?",
        "possibleAnswers": ["False", "True"]
    },
    {
        "question": "Who is the main character in the Anime My Hero Academia",
        "possibleAnswers": ["Izuku Midoriya", "Katsuki Bakugo", "Shoto Todoroki", "Kenma Kozume"]
    },
    {
        "question": "What are powers called in My Hero Academia",
        "possibleAnswers": ["Quirks", "Super Powers"]
    },
    {
        "question": "True or False: Deku from My Hero Academia was born quirkless",
        "possibleAnswers": ["True", "False"]
    },
    {
        "question": "True or False: Deku from My Hero Academia got his quirk by eating a hair",
        "possibleAnswers": ["True", "False"]
    },
];

const MATH_QUESTIONS = [
    {
        "question": "What is 2 + 2?",
        "possibleAnswers": ["4", "5", "21", "0"]
    },
    {
        "question": "Which mathematical subject uses matrices?",
        "possibleAnswers": ["Linear Algebra", "Calculus", "Algebra"]
    },
    {
        "question": "True or False: Linear Algebra is used in both computer graphics and game development?",
        "possibleAnswers": ["True", "False"]
    },
    {
        "question": "What is 9 * 9?",
        "possibleAnswers": ["81", "90", "100", "78"]
    },
    {
        "question": "What is 200 / 4?",
        "possibleAnswers": ["50", "60", "100", "0"]
    },
    {
        "question": "True or False: can you divide by 0?",
        "possibleAnswers": ["False", "True"]
    }
];

const CODE_QUESTIONS = [
    {
        "question": "What is an array?",
        "possibleAnswers": ["A collection of items", "A data type", "int", "string"]
    },
    {
        "question": "What is the difference between an array and a linked list?",
        "possibleAnswers": ["Arrays are store in contiguous memory locations", "No Difference"]
    },
    {
        "question": "What is LIFO?",
        "possibleAnswers": ["Last in, First out", "First in, Last out", "Locked in, Fall out", "Late, Fate"]
    },
    {
        "question": "What is FIFO?",
        "possibleAnswers": ["First in, First out", "Last in, Last out", "First out, Last in", "Locked in, Fall out"]
    },
    {
        "question": "What is OOP?",
        "possibleAnswers": ["Object-oriented Programming", "Data-first Programming", "Procedural Programming", "Functional Programming"]
    },
    {
        "question": "Which is not a common data structure?",
        "possibleAnswers": ["Float", "Array", "Graph", "Stack"]
    },
    {
        "question": "Which is not a programming language?",
        "possibleAnswers": ["HTML", "Python", "C++", "JavaScript"]
    },
    {
        "question": "What do Python and JavaScript have in common?",
        "possibleAnswers": ["Both are interpreted languages", "Nothing in common", "Similiar Syntax", "Both require data types"]
    }
];


function getQuestions(tab) {
    switch (tab) {
        case "POKÉMON": return POKEMON_QUESTIONS;
        case "ANIME": return ANIME_QUESTIONS;
        case "MATH": return MATH_QUESTIONS;
        case "CODING": return CODE_QUESTIONS;
        default:
            console.error("UNREACHABLE case in getQuestions()");
            return;
    }
}