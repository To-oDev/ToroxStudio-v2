/**
 * Torox Studio - Project Modal Web Component
 */
import { ToroxModal } from './torox-modal.js';

export class ToroxProjectModal extends ToroxModal {
    connectedCallback() {
        super.connectedCallback();
        this.visualContainer = this.querySelector('.project-video-container');
        this.modalName = this.querySelector('#project-modal-name');
        this.modalCat = this.querySelector('#project-modal-cat');
        this.modalDesc = this.querySelector('#project-modal-desc');
        this.detailsElement = this.querySelector('.project-modal-details');
        this.idleTimeout = null;

        this.initProjectEvents();
    }

    initProjectEvents() {
        const container = this.querySelector('.project-modal-container');
        if (container) {
            container.addEventListener('mousemove', () => this.resetIdleTimer());
            container.addEventListener('mouseleave', () => {
                clearTimeout(this.idleTimeout);
                if (this.detailsElement) this.detailsElement.classList.remove('show-blur');
            });
        }

        const ctaBtn = this.querySelector('.modal-footer .btn-primary');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => this.close());
        }
    }

    resetIdleTimer() {
        if (this.detailsElement) this.detailsElement.classList.add('show-blur');
        clearTimeout(this.idleTimeout);
        this.idleTimeout = setTimeout(() => {
            if (this.detailsElement) this.detailsElement.classList.remove('show-blur');
        }, 2000);
    }

    setData(data, originalMedia) {
        if (originalMedia && this.visualContainer) {
            const mediaClone = originalMedia.cloneNode(true);
            
            if (mediaClone.tagName === 'VIDEO') {
                this.setupVideo(mediaClone);
            }
            
            this.visualContainer.innerHTML = '';
            this.visualContainer.appendChild(mediaClone);

            if (mediaClone.tagName === 'VIDEO') {
                mediaClone.play().catch(e => {
                    console.log("Auto-play blocked, enabling controls", e);
                    mediaClone.controls = true;
                });
            }
        }

        if (this.modalName) this.modalName.textContent = data.name || '';
        if (this.modalCat) this.modalCat.textContent = data.cat || '';
        if (this.modalDesc) this.modalDesc.textContent = data.desc || '';
    }

    setupVideo(video) {
        video.controls = false; 
        video.muted = false;
        video.autoplay = true;
        video.loop = true;
        video.setAttribute('playsinline', '');
        
        const container = this.querySelector('.project-modal-container');
        if (container) {
            container.addEventListener('mouseenter', () => video.controls = true);
            container.addEventListener('mouseleave', () => video.controls = false);
        }
    }

    close() {
        super.close();
        setTimeout(() => {
            if (this.visualContainer) {
                const video = this.visualContainer.querySelector('video');
                if (video) video.pause();
                this.visualContainer.innerHTML = '';
            }
            if (this.modalName) this.modalName.textContent = '';
            if (this.modalCat) this.modalCat.textContent = '';
            if (this.modalDesc) this.modalDesc.textContent = '';
        }, 400);
    }
}

if (!customElements.get('torox-project-modal')) {
    customElements.define('torox-project-modal', ToroxProjectModal);
}
