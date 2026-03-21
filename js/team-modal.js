// Torox Studio - Team Member Modal Logic

export function initTeamModal() {
    const modal = document.getElementById('team-modal');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    const modalDesc = document.getElementById('modal-desc');
    const modalLink = document.getElementById('modal-link');
    const modalFooter = document.getElementById('modal-footer');
    const closeBtn = modal.querySelector('.modal-close');
    const teamCards = document.querySelectorAll('.team-card');

    if (!modal) return;

    function openModal(card) {
        const data = card.dataset;
        const cardImg = card.querySelector('.modal-source-img');
        
        modalImg.src = cardImg ? cardImg.src : '';
        modalImg.alt = data.name || 'Team Member';
        modalName.textContent = data.name || '';
        modalRole.textContent = data.role || '';
        modalDesc.textContent = data.desc || '';
        
        if (data.link) {
            modalLink.href = data.link;
            modalFooter.style.display = 'block';
        } else {
            modalFooter.style.display = 'none';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear data after animation
        setTimeout(() => {
            modalImg.src = '';
            modalName.textContent = '';
            modalRole.textContent = '';
            modalDesc.textContent = '';
        }, 400);
    }

    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            // Only trigger modal on mobile/tablet or if explicitly clicked
            // The user requested it for "modo movil o responsivo", 
            // but usually it's better to have it on desktop too if it's a "card"
            // Let's enable it for all viewports since the design is premium.
            openModal(card);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
