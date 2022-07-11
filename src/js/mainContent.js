import { SVG_PART, FINAL_SVG } from './svgContent'
export function initialRender(exist) {
	if (exist) {
		document.querySelector('.mainContent').innerHTML = SVG_PART;
	} else {
		const puzzle = document.createElement('section');
		puzzle.classList.add('mainContent');
		puzzle.innerHTML = SVG_PART;
		document.querySelector('#app').appendChild(puzzle);
	}
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
			refreshPositions: true,
			cursorAt: { top: 17, left: 17 },
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
		})
	});
}

function checkFinished(robotParts) {
	if (robotParts.every(p => p.isItMounted)) {
		const finalSlide = document.createElement('section');
		finalSlide.classList.add('finalSlide');
		finalSlide.innerHTML = FINAL_SVG;
		document.querySelector('#app').appendChild(finalSlide);
		document.getElementById("x").addEventListener('click', clearFinalSlide);
	}
}

function clearFinalSlide() {
	document.querySelector('.finalSlide').remove();
	initialRender(true);
}
