import { translations } from './translations.js';

export function initTranslations() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-i18n]');
    const translatableAttributes = document.querySelectorAll('[data-i18n-role], [data-i18n-desc]');
    
    // Default language is Spanish
    let currentLang = localStorage.getItem('torox_lang') || 'es';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Add event listeners to toggle buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLang) {
                setLanguage(lang);
            }
        });
    });
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('torox_lang', lang);
        document.documentElement.lang = lang;
        
        // Update regular text content
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        // Update special attributes (like for team cards)
        translatableAttributes.forEach(el => {
            const roleKey = el.getAttribute('data-i18n-role');
            const descKey = el.getAttribute('data-i18n-desc');
            
            if (roleKey && translations[lang][roleKey]) {
                el.setAttribute('data-role', translations[lang][roleKey]);
            }
            if (descKey && translations[lang][descKey]) {
                el.setAttribute('data-desc', translations[lang][descKey]);
            }
        });
        
        // Update active class on buttons
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}
