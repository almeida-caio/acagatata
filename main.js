let countMax = 3;
let numChilds = 2;
let parental = ["A", "C", "A", "G", "A", "T", "A", "T", "A"];

let mutWheelTokens = ["G", "T", "N", "-", "+", "N", "A", "C"];
let counter;

let auxChildGenes;

// mutation algorithm is working fine!
// must now implement the visuals...

function setup() {
	createCanvas(450, 450);
	background(0);

	counter = 0;
	print(parental);
	print("P");

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

	for (var k = 1; k <= numChilds; k++) {
		auxChildGenes = childsGenome(genome).slice(0);
		print(auxChildGenes);
		print("F" + counter.toString());

		if (counter < countMax) {
			breed(auxChildGenes);
			counter -= 1;
		}
	}
}
