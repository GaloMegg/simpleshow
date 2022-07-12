import { START_SVG } from "./svgContent"
import { initialRender } from './mainContent.js';

export function buildStartSlide() {
    const startSlide = document.createElement('section');
    const div = document.createElement('div');
    startSlide.appendChild(div);
    startSlide.classList.add('startSlide');
    div.innerHTML = START_SVG;
    document.querySelector('#app').appendChild(startSlide);
    document.getElementById("start_x5F_button_xA0_Image").addEventListener('click', clearSlide);
}

export function clearSlide() {
    let startSlide = document.querySelector('.startSlide')
    if (startSlide) {
        startSlide.remove();
        initialRender()
    }
}