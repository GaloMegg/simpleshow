import { buildStartSlide, clearSlide } from './startSlide';
import { clearFinalSlide } from './mainContent';

document.addEventListener('DOMContentLoaded', () => { buildStartSlide(); });

document.addEventListener('keydown', (e) => { if (e.key === 'Enter') { clearSlide() } else if (e.key === 'Escape') { clearFinalSlide() } }); 
