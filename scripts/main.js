// visuals are minimal, but working!
let countMax = 3;
let numChilds = 2;
let parental = ["A", "C", "A", "G", "A", "T", "A", "T", "A"];

let mutWheelTokens = ["G", "T", "N", "-", "+", "N", "A", "C"];
let counter;

let auxChildGenes;

let step = 60;
let step2 = 70;
let edgeSize = 180;
let angle = 3.14159 / 2.9;
let deltaX, deltaY;
let deltaXaux, deltaYaux;

function setup() {
	createCanvas(displayWidth, displayHeight);
	background(0);
	
	translate(width / 6.2, height / 2.4);

	fill(255);
	noStroke();
	textSize(20);
	textAlign(CENTER, CENTER);
	text(parental.join(""), -8, 0);

	stroke(255);
	strokeWeight(2);

	deltaX = 0;
	deltaY = 0;
	counter = 0;
	tree();

	fill(255);
	noStroke();
	textAlign(LEFT, CENTER);
	
	deltaX = 0;
	deltaY = 0;
	counter = 0;
	breed(parental);
}

function mutationWheel() {
	let auxRes = floor(random(0,8));
	return mutWheelTokens[auxRes];
}

function positionWheel() {
	let auxPos = ceil(random(0,9));
	return auxPos;
}

function childsGenome(local_parent_genome) {
	let local_child_genome = local_parent_genome.slice(0);
	let mutation_order = mutationWheel();

	if (mutation_order == "N") {
		// skip
	} else if (mutation_order == "-") {

		let nucle_position = positionWheel() - 1;
		local_child_genome.splice(nucle_position, 1);

	} else if (mutation_order == "+") {

		let new_mut = mutationWheel();

		while (new_mut == "N" || new_mut == "+" || new_mut == "-") {
			new_mut = mutationWheel();
		}

		let nucle_position = positionWheel() - 1;
		local_child_genome.splice(nucle_position, 0, new_mut);

	} else {

		let nucle_position = positionWheel() - 1;
		local_child_genome[nucle_position] = mutation_order;

	}

	return local_child_genome;
}

function breed(genome) {
	counter++;
	let n = counter - 1;

	for (var k = 1; k <= numChilds; k++) {
		auxChildGenes = childsGenome(genome).slice(0);
		// print("F" + counter.toString());

		deltaX = (edgeSize / counter**1.05) * cos(angle / counter**1.6);

		deltaXaux = deltaX + (edgeSize / counter**1.4) * cos(angle / counter**1.2);
		deltaYaux = deltaY + (edgeSize / counter**1.4) * sin(angle / counter**1.2);

		if (k == 1) {
			text(" " + auxChildGenes.join("") + " ", (step / (countMax + 1 - counter)) + (n + 1) * deltaXaux, (n + 1) * deltaYaux);
		} else {
			if (counter < countMax) {
				text(" " + auxChildGenes.join("") + " ", (step / (countMax + 1 - counter)) + (n + 1) * deltaXaux, (n + 1) * deltaYaux);
			} else {
				text(" " + auxChildGenes.join("") + " ", (step / (countMax + 1 - counter)) + (n + 1) * deltaXaux, -(n + 1) * deltaYaux);
			}
		}

		if (counter < countMax) {
			push();
			angle = -angle;
			translate((n + 1) * deltaXaux, (n + 1) * deltaYaux);
			breed(auxChildGenes);
			counter -= 1;
			pop();
		}
	}
}

function tree() {
	counter++;
	let n = counter - 1;

	for (var k = 1; k <= numChilds; k++) {
		deltaX = (edgeSize / counter*1.05) * cos(angle / counter**1.6);

		deltaXaux = deltaX + (edgeSize / counter**1.4) * cos(angle / counter**1.2);
		deltaYaux = deltaY + (edgeSize / counter**1.4) * sin(angle / counter**1.2);

		if (counter == countMax) {
			line((step2 * 1/(counter**0.3)) + n * deltaX, n * deltaY, (n + 1) * deltaXaux, (n + 1) * deltaYaux);
			line((step2 * 1/(counter**0.3)) + n * deltaX, n * deltaY, (n + 1) * deltaXaux, -(n + 1) * deltaYaux);
		} else {
			line((step2 * 1/(counter**0.0001)) + n * deltaX, n * deltaY, (n + 1) * deltaXaux, (n + 1) * deltaYaux);
			line((step2 * 1/(counter**0.0001)) + n * deltaX, n * deltaY, (n + 1) * deltaXaux, -(n + 1) * deltaYaux);
		}

		if (counter < countMax) {
			push();
			angle = -angle;
			translate((n + 1) * deltaXaux, (n + 1) * deltaYaux);
			tree();
			counter -= 1;
			pop();
		}
	}
}
