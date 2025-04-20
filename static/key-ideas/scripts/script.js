import books from './books.js';

function renderBooks() {
    const grid = document.getElementById('bookGrid');
    grid.innerHTML = books.map(book => `
        <div class="book-card" data-category="${book.category}" data-id="${book.id}">
            <img src="${book.cover}" class="book-cover" alt="${book.title} Cover">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${book.progress}%"></div>
            </div>
            <div class="status ${getStatusClass(book.progress)}">${getStatusText(book.progress)}</div>
        </div>
    `).join('');
}

function getStatusClass(progress) {
    if (progress > 95) return 'completed';
    if (progress > 0) return 'in-progress';
    return 'planned';
}

function getStatusText(progress) {
    if (progress > 95) return 'Завершена';
    if (progress > 0) return `В работе (${progress}%)`;
    return 'Запланирована';
}

function showModal(bookId) {
    const book = books.find(b => b.id === bookId);
    const modalContent = `
        <h2>${book.title}</h2>
        <p>Автор: ${book.author}</p>
        <img src="${book.cover}" style="max-width: 200px; margin: 15px 0;">
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${book.progress}%"></div>
        </div>
        <h3>Содержание:</h3>
        <div class="chapter-list">
            ${book.chapters.map(chapter => `
                <div class="chapter-item ${chapter.status}">
                    <a href="${chapter.link}" class="chapter-link" target="_blank">
                        ${chapter.title}
                        <span class="status-icon"></span>
                    </a>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('modalContent').innerHTML = modalContent;
    document.getElementById('modalOverlay').style.display = 'flex';
}

export function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    renderBooks();

    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', () => {
            const bookId = parseInt(card.dataset.id);
            if (bookId != 0) showModal(bookId);
        });
    });

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            document.querySelectorAll('.book-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.category === filter)
                    ? 'block'
                    : 'none';
            });
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    document.querySelector('.close-btn').addEventListener('click', closeModal);
});