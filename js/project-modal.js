// Torox Studio - Project Modal Logic (Refined)

export function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const visualContainer = modal.querySelector('.project-video-container');
    const modalName = document.getElementById('project-modal-name');
    const modalCat = document.getElementById('project-modal-cat');
    const modalDesc = document.getElementById('project-modal-desc');
    const closeBtn = modal.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');

    if (!modal) return;

    function openModal(card) {
        const data = card.dataset;
        const cardVisual = card.querySelector('.project-visual');
        
        const originalMedia = cardVisual.querySelector('img, video');
        if (originalMedia) {
            const mediaClone = originalMedia.cloneNode(true);
            
            if (mediaClone.tagName === 'VIDEO') {
                mediaClone.controls = false; 
                mediaClone.muted = false;
                mediaClone.autoplay = true;
                mediaClone.loop = true;
                mediaClone.setAttribute('playsinline', '');
                
                // Show controls ONLY on hover of the container
                const container = modal.querySelector('.project-modal-container');
                
                container.addEventListener('mouseenter', () => {
                    mediaClone.controls = true;
                });
                
                container.addEventListener('mouseleave', () => {
                    mediaClone.controls = false;
                });
            }
            
            visualContainer.innerHTML = '';
            visualContainer.appendChild(mediaClone);
            
            // Refinement: Dynamic Blur Visibility
            const detailsElement = modal.querySelector('.project-modal-details');
            let idleTimeout;

            const resetIdleTimer = () => {
                detailsElement.classList.add('show-blur');
                clearTimeout(idleTimeout);
                idleTimeout = setTimeout(() => {
                    detailsElement.classList.remove('show-blur');
                }, 2000); // 2 seconds of idle to hide the blur
            };

            const container = modal.querySelector('.project-modal-container');
            container.addEventListener('mousemove', resetIdleTimer);
            container.addEventListener('mouseleave', () => {
                clearTimeout(idleTimeout);
                detailsElement.classList.remove('show-blur');
            });

            if (mediaClone.tagName === 'VIDEO') {
                mediaClone.play().catch(e => {
                    console.log("Auto-play blocked, enabling controls so user can start it", e);
                    mediaClone.controls = true;
                });
            }
        }

        modalName.textContent = data.name || '';
        modalCat.textContent = data.cat || '';
        modalDesc.textContent = data.desc || '';

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            const video = visualContainer.querySelector('video');
            if (video) video.pause();
            visualContainer.innerHTML = '';
            modalName.textContent = '';
            modalCat.textContent = '';
            modalDesc.textContent = '';
        }, 400);
    }

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(card);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
