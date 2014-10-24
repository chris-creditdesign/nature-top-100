/*	Function to sort papers by citation */
function comparePaper(a,b) {
	if (a.cites < b.cites)
		return 1;
	if (a.cites > b.cites)
		return -1;
	return 0;
}
