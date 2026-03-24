// Torox Studio - Main Entry Point
import './cursor.js';
import './navigation.js';
import './reveal.js';

// Import Web Components (they define themselves)
import './components/torox-lang-selector.js';
import './components/torox-team-modal.js';
import './components/torox-project-modal.js';

import { initMobileMenu } from './mobile-menu.js';
import { initTeamModal } from './team-modal.js';
import { initProjectModal } from './project-modal.js';

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTeamModal();
    initProjectModal();
});

