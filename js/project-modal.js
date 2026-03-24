export function initProjectModal() {
    const projectModal = document.querySelector('torox-project-modal');
    const projectCards = document.querySelectorAll('.project-card');

    if (!projectModal) return;

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const data = card.dataset;
            const cardVisual = card.querySelector('.project-visual');
            const originalMedia = cardVisual.querySelector('img, video');
            
            projectModal.setData(data, originalMedia);
            projectModal.open();
        });
    });
}
