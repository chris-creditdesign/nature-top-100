/*	Function to sort papers by citation */
function comparePaper(a,b) {
	if (a.cites < b.cites)
		return 1;
	if (a.cites > b.cites)
		return -1;
	return 0;
}

/*	Function to sort citations by year */
function compareYear(a,b) {
	if (a.date < b.date)
		return 1;
	if (a.date > b.date)
		return -1;
	return 0;
}