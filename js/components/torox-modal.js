/**
 * Torox Studio - Base Modal Web Component
 */
export class ToroxModal extends HTMLElement {
    constructor() {
        super();
        this._isOpen = false;
    }

    connectedCallback() {
        this.modal = this.querySelector('.modal-overlay');
        this.closeBtn = this.querySelector('.modal-close');
        this.initEvents();
    }

    initEvents() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Close on click outside (backdrop)
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.close();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this._isOpen) {
                this.close();
            }
        });
    }

    open() {
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this._isOpen = true;
            this.dispatchEvent(new CustomEvent('open'));
        }
    }

    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            this._isOpen = false;
            this.dispatchEvent(new CustomEvent('close'));
        }
    }

    isOpen() {
        return this._isOpen;
    }
}

if (!customElements.get('torox-modal')) {
    customElements.define('torox-modal', ToroxModal);
}
