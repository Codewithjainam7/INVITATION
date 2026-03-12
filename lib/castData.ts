export interface CastMember {
    id: string;
    name: string;
    nickname: string;
    role: string;
    emoji: string;
    tagline: string;
    catchphrase: string;
    color: string;
    image?: string;
}

export const castMembers: CastMember[] = [
    {
        id: "jagrat",
        name: "JAGRAT",
        nickname: "JAGGU",
        role: "Lead Hero",
        emoji: "🦸",
        tagline: "South Indian guy... har cheez mein over-acting",
        catchphrase: "Ardila sari!",
        color: "#FFD700", // Gold
        image: "/jagrat.jpeg"
    },
    {
        id: "mohit",
        name: "MOHIT",
        nickname: "GHORA GHODA",
        role: "The Villain",
        emoji: "😈",
        tagline: "Car ka gyani, par chalani auto aati hai",
        catchphrase: "But the point is...",
        color: "#DC143C", // Red
        image: "/mohit.jpeg"
    },
    {
        id: "karan",
        name: "KARAN",
        nickname: "TRADER",
        role: "Item Number Performer",
        emoji: "💃",
        tagline: "Stocks ka gyani, portfolio humesha laal",
        catchphrase: "Aree bhaiishab!",
        color: "#FF69B4", // Pink
        image: "/karan.jpeg"
    },
    {
        id: "sai",
        name: "SAI",
        nickname: "SAHI",
        role: "Comic Relief",
        emoji: "🤡",
        tagline: "College ka dada, par assignment mein zero",
        catchphrase: "Abee chutiye!",
        color: "#00FF41", // Green
        image: "/sai.jpeg"
    },
    {
        id: "khushi",
        name: "KHUSHI",
        nickname: "LAUGHING MACHINE",
        role: "Leading Lady",
        emoji: "👑",
        tagline: "Laughing queen, bina joke ke bhi hasi na ruke",
        catchphrase: "*laughs too muchhh* 😂",
        color: "#DA70D6", // Orchid
        image: "/khushi.jpeg"
    },
];
