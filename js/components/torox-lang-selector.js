/**
 * Torox Studio - Language Selector Web Component
 */
import { TranslationService } from '../core/translation-service.js';
import { translations } from '../translations.js';

export class ToroxLangSelector extends HTMLElement {
    constructor() {
        super();
        this.service = new TranslationService();
    }

    connectedCallback() {
        this.langBtns = this.querySelectorAll('.lang-btn');
        this.translatableElements = document.querySelectorAll('[data-i18n]');
        this.translatableAttributes = document.querySelectorAll('[data-i18n-role], [data-i18n-desc]');
        
        this.init();
    }

    init() {
        // Set initial language from service
        this.updateUI(this.service.getLanguage());
        
        // Add event listeners
        this.langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                if (lang !== this.service.getLanguage()) {
                    this.service.setLanguage(lang);
                    this.updateUI(lang);
                }
            });
        });
    }

    updateUI(lang) {
        document.documentElement.lang = lang;
        
        // Update regular text content
        this.translatableElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        // Update special attributes
        this.translatableAttributes.forEach(el => {
            const roleKey = el.getAttribute('data-i18n-role');
            const descKey = el.getAttribute('data-i18n-desc');
            
            if (roleKey && translations[lang] && translations[lang][roleKey]) {
                el.setAttribute('data-role', translations[lang][roleKey]);
            }
            if (descKey && translations[lang] && translations[lang][descKey]) {
                el.setAttribute('data-desc', translations[lang][descKey]);
            }
        });
        
        // Update active class on buttons
        this.langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }
}

if (!customElements.get('torox-lang-selector')) {
    customElements.define('torox-lang-selector', ToroxLangSelector);
}
