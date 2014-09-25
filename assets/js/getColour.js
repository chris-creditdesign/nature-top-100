function getColour (x, colour) {
	var my_colour = "#000";

	switch (x) {
		case "Statistics":
			my_colour = colour[0];
			break;
		case "Other":
			my_colour = colour[1];
			break;
		case "Math/Computer Science":
			my_colour = colour[2];
			break;
		case "Experimental, Social and Clinical Psychology":
			my_colour = colour[3];
			break;
		case "Discoveries":
			my_colour = colour[4];
			break;
		case "Crystallography":
			my_colour = colour[5];
			break;
		case "Condensed Matter Physics":
			my_colour = colour[6];
			break;
		case "Biomedical Research and Clinical Medicine":
			my_colour = colour[7];
			break;
		case "bioinformatics close to evolutionary biology":
			my_colour = colour[8];
			break;
		case "bioinformatics":
			my_colour = colour[9];
			break;
		case "biochem techniques":
			my_colour = colour[10];
			break;
		case "Atomic and Molecular Physics":
			my_colour = colour[11];
			break;
		default:
			my_colour = colour[0];
	}

	return my_colour;
}