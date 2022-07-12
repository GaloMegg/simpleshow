import { SVG_PART, FINAL_SVG } from './svgContent'
import instruction_box from '../assets/images/instruction_box.svg'
export function initialRender() {
	const div = document.createElement('div');
	const puzzle = document.createElement('section');
	puzzle.classList.add('mainContent');
	puzzle.innerHTML = SVG_PART;
	div.innerHTML = `<img class="instruction" src=${instruction_box} alt="Our mech pilots are at the ready! But	before they launch, we need to construct the simpleMech X! Drag & Drop its parts to complete its build.">`;
	document.querySelector('#app').appendChild(puzzle);
	puzzle.appendChild(div);
	selectorDraggable()
}

function selectorDraggable() {
	let robotParts = [
		{
			partName: "simplemech_xA0_head",
			isItMounted: false,
			top: -468,
			left: -672,
		},
		{
			partName: "simplemech_xA0_arm_1",
			isItMounted: false,
			top: -61,
			left: -1054,
		},
		{
			partName: "simplemech_xA0_arm_2",
			isItMounted: false,
			top: -60,
			left: -875,
		},
		{
			partName: "simplemech_xA0_leg1",
			isItMounted: false,
			top: 104,
			left: -450,
		},
		{
			partName: "simplemech_xA0_leg2",
			isItMounted: false,
			top: 104,
			left: -450,
		},
		{
			partName: "simplemech_xA0_chest",
			isItMounted: false,
			top: -90,
			left: -696,
		}

	]
	robotParts.forEach(p => {
		$(`#${p.partName}`).draggable({
			cursor: "grabbing",
			drag: (_, { position }) => {
				const { left, top } = position
				$(`#${p.partName}`).draggable({
					revert: !((left > (p.left - 10) && left < (p.left + 10)) && (top > (p.top - 10) && top < (p.top + 10)))
				})
				if (((left > (p.left - 10) && left < (p.left + 10)) && (top > (p.top - 10) && top < (p.top + 10)))) {
					p.isItMounted = true
				}
			},
			stop: (_, { position }) => {
				const { left, top } = position
				$(`#${p.partName}`).draggable({
					revert: !((left > (p.left - 10) && left < (p.left + 10)) && (top > (p.top - 10) && top < (p.top + 10)))
				})
				if (((left > (p.left - 10) && left < (p.left + 10)) && (top > (p.top - 10) && top < (p.top + 10)))) {
					p.isItMounted = true
					checkFinished(robotParts)
				}
			},
		}).addClass('part')
	});
}

function checkFinished(robotParts) {
	if (robotParts.every(p => p.isItMounted)) {
		document.querySelector('.mainContent').remove();
		const div = document.createElement('div');
		const finalSlide = document.createElement('section');
		finalSlide.appendChild(div);
		finalSlide.classList.add('finalSlide');
		div.innerHTML = FINAL_SVG;
		document.querySelector('#app').appendChild(finalSlide);
		document.querySelector('#x').addEventListener('click', clearFinalSlide);
	}
}

export function clearFinalSlide() {
	let finalSlide = document.querySelector('.finalSlide')
	if (finalSlide) {
		finalSlide.remove();
		initialRender()
	}
}
