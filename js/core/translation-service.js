/**
 * Torox Studio - Translation Service (SRP - Logic & State)
 */
export class TranslationService {
    constructor() {
        this.storageKey = 'torox_lang';
        this.currentLang = localStorage.getItem(this.storageKey) || 'es';
    }

    getLanguage() {
        return this.currentLang;
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem(this.storageKey, lang);
    }
}
