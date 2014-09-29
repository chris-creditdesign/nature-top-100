function updateArray (ary) {
	selectedArray = [];
	selections = [];

	var checkboxes = jQuery('.outer-wrapper form.choose-option input:checked');
	stackingOrder = jQuery('.outer-wrapper form.choose-order select').val();

	for (var v = 0; v < checkboxes.length; v++) {
		selections.push(checkboxes.eq(v).parent().text());
	}

	for (var i = 0; i < ary.length; i++) {
		var thisDiscipline = ary[i].discipline;
		
		if (selections.indexOf(thisDiscipline) !== -1) {
			selectedArray.push(ary[i]);
		}
	}

	if (stackingOrder === "cites") {
		selectedArray.sort(comparePaper);
	} else if (stackingOrder === "year") {
		selectedArray.sort(compareYear);
	}


	return selectedArray;
}