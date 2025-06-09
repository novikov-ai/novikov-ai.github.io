const books = [
    {
        id: 1,
        title: "Микросервисы",
        author: "Крис Ричардсон",
        category: "architecture",
        progress: 23,
        cover: "covers/microservices.png",
        chapters: [
            { title: "О книге", status: "completed", link: "https://boosty.to/time2code/posts/4832458c-de1e-4b90-a7b1-bdf784325427?share=post_link" },
            { title: "Глава 1. Побег из монолитного ада", status: "completed", link: "https://boosty.to/time2code/posts/88e2a74f-9e8b-4e14-bf20-8bde031560ad?share=post_link" },
            { title: "Глава 2. Стратегии декомпозиции", status: "completed", link: "https://boosty.to/time2code/posts/4fa0a1b5-64c7-428d-929f-846adbf37dc8?share=post_link" },
            { title: "Глава 3. Межпроцессное взаимодействие в микросервисной архитектуре", status: "completed", link: "https://boosty.to/time2code/posts/3930cabc-2429-4ef5-925b-fd031dec18f7?share=post_link" },
            { title: "Глава 4. Управление транзакциями с помощью повествований", status: "in-progress", link: "#" },
            { title: "Глава 5. Проектирование бизнес-логики в микросервисной архитектуре", status: "planned", link: "#" },
            { title: "Глава 6. Разработка бизнес-логики с порождением событий", status: "planned", link: "#" },
            { title: "Глава 7. Реализация запросов в микросервисной архитектур", status: "planned", link: "#" },
            { title: "Глава 8. Шаблоны внешних API", status: "planned", link: "#" },
            { title: "Глава 9. Тестирование микросервисов, часть 1", status: "planned", link: "#" },
            { title: "Глава 10. Тестирование микросервисов, часть 2", status: "planned", link: "#" },
            { title: "Глава 11. Разработка сервисов, готовых к промышленному использованию", status: "planned", link: "#" },
            { title: "Глава 12. Развертывание микросервисов", status: "planned", link: "#" },
            { title: "Глава 13. Процесс перехода на микросервисы", status: "planned", link: "#" }
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