export function initTeamModal() {
    const teamModal = document.querySelector('torox-team-modal');
    const teamCards = document.querySelectorAll('.team-card');

    if (!teamModal) return;

    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            const data = card.dataset;
            const cardImg = card.querySelector('.modal-source-img');
            teamModal.setData(data, cardImg);
            teamModal.open();
        });
    });
}
