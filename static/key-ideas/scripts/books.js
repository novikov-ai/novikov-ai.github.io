const books = [
    {
        id: 1,
        title: "Микросервисы",
        author: "Крис Ричардсон",
        category: "architecture",
        progress: 7,
        cover: "covers/microservices.png",
        chapters: [
            { title: "О книге", status: "completed", link: "https://boosty.to/time2code/posts/4832458c-de1e-4b90-a7b1-bdf784325427?share=post_link" },
            { title: "Глава 1. Побег из монолитного ада", status: "completed", link: "https://boosty.to/time2code/posts/88e2a74f-9e8b-4e14-bf20-8bde031560ad?share=post_link" },
            { title: "Глава 2. Стратегии декомпозиции", status: "in-progress", link: "#" },
            { title: "Глава 3. Межпроцессное взаимодействие в микросервисной архитектуре", status: "planned", link: "#" }
        ]
    },
    {
        id: 0,
        title: "Психбольница в руках пациентов",
        author: "Алан Купер",
        category: "other",
        progress: 0,
        cover: "covers/the_inmates_are_running_the_asylum.png",
        chapters: []
    },
    {
        id: 0,
        title: "Предметно-ориентированное проектирование (DDD): структуризация сложных программных систем",
        author: "Эрик Эванс",
        category: "architecture",
        progress: 0,
        cover: "covers/ddd.png",
        chapters: []
    }
];

export default books;