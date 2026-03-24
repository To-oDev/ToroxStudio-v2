/**
 * Torox Studio - Team Modal Web Component
 */
import { ToroxModal } from './torox-modal.js';

export class ToroxTeamModal extends ToroxModal {
    connectedCallback() {
        super.connectedCallback();
        this.modalImg = this.querySelector('#modal-img');
        this.modalName = this.querySelector('#modal-name');
        this.modalRole = this.querySelector('#modal-role');
        this.modalDesc = this.querySelector('#modal-desc');
        this.modalLink = this.querySelector('#modal-link');
        this.modalFooter = this.querySelector('#modal-footer');
    }

    setData(data, cardImg) {
        if (this.modalImg) {
            this.modalImg.src = cardImg ? cardImg.src : '';
            this.modalImg.alt = data.name || 'Team Member';
        }
        if (this.modalName) this.modalName.textContent = data.name || '';
        if (this.modalRole) this.modalRole.textContent = data.role || '';
        if (this.modalDesc) this.modalDesc.textContent = data.desc || '';
        
        if (this.modalFooter) {
            if (data.link) {
                if (this.modalLink) this.modalLink.href = data.link;
                this.modalFooter.style.display = 'block';
            } else {
                this.modalFooter.style.display = 'none';
            }
        }
    }

    close() {
        super.close();
        // Clear data after animation
        setTimeout(() => {
            if (this.modalImg) this.modalImg.src = '';
            if (this.modalName) this.modalName.textContent = '';
            if (this.modalRole) this.modalRole.textContent = '';
            if (this.modalDesc) this.modalDesc.textContent = '';
        }, 400);
    }
}

if (!customElements.get('torox-team-modal')) {
    customElements.define('torox-team-modal', ToroxTeamModal);
}
