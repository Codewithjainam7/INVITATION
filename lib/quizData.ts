export interface EmojiQuiz {
    id: number;
    emojis: string;
    options: string[];
    answer: string;
    hint: string;
}

export interface LyricQuiz {
    id: number;
    part1: string;
    missing: string;
    part2: string;
    hint: string;
}

export const emojiQuizzes: EmojiQuiz[] = [
    {
        id: 1,
        emojis: "🚂 👧🏻 🎸 📖",
        options: ["Dilwale Dulhania Le Jayenge", "Jab We Met", "Yeh Jawaani Hai Deewani", "Chennai Express"],
        answer: "Jab We Met",
        hint: "Aditya & Geet's train journey!",
    },
    {
        id: 2,
        emojis: "👽 🌍 📻 🚲",
        options: ["Koi Mil Gaya", "PK", "Mission Mangal", "Robot"],
        answer: "PK",
        hint: "Aamir Khan with a yellow helmet and radio.",
    },
    {
        id: 3,
        emojis: "👨‍🔬 👴🏻 👶🏻 ⏳",
        options: ["Paa", "102 Not Out", "Action Replayy", "3 Idiots"],
        answer: "Action Replayy",
        hint: "Time travel via a machine built by a scientist.",
    },
    {
        id: 4,
        emojis: "👨🏻‍🦯 🎹 🐰 🔪",
        options: ["Kaabil", "Andhadhun", "Black", "Karthik Calling Karthik"],
        answer: "Andhadhun",
        hint: "A 'blind' pianist and a fake rabbit.",
    }
];

export const lyricQuizzes: LyricQuiz[] = [
    {
        id: 1,
        part1: "Agar tum saath ho, ",
        missing: "har",
        part2: " dard kam hai...",
        hint: "Arijit Singh / Tamasha",
    },
    {
        id: 2,
        part1: "Tum kya mile, yaqeen ",
        missing: "karo",
        part2: "...",
        hint: "Rocky Aur Rani Kii Prem Kahaani",
    },
    {
        id: 3,
        part1: "Jo tum na ho... rahenge hum ",
        missing: "nahi",
        part2: "...",
        hint: "Shreya Ghoshal / Love Aaj Kal",
    },
    {
        id: 4,
        part1: "Hawaon mein bahenge, ",
        missing: "ghataon",
        part2: " mein rahenge...",
        hint: "Kalank Title Track",
    }
];

export const getRandomQuiz = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};
