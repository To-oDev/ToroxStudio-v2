// Torox Studio - Main Entry Point
import './cursor.js';
import './navigation.js';
import './reveal.js';
import { initMobileMenu } from './mobile-menu.js';
import { initTeamModal } from './team-modal.js';

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTeamModal();
});

