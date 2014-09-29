function updateArray (ary) {
	selectedArray = [];
	selections = [];

	var checkboxes = jQuery('.outer-wrapper form.choose-option input:checked');

	for (var v = 0; v < checkboxes.length; v++) {
		selections.push(checkboxes.eq(v).parent().text());
	}

	for (var i = 0; i < ary.length; i++) {
		var thisDiscipline = ary[i].discipline;
		
		if (selections.indexOf(thisDiscipline) !== -1) {
			selectedArray.push(ary[i]);
		}
	}

	selectedArray.sort(comparePaper);

	return selectedArray;
}