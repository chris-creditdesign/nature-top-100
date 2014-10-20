function upDateButtons (index) {
	jQuery('button.widget-button').removeClass("active");

	if ( index < 99 ) {
		jQuery('button.widget-button.lower').addClass("active");
	}

	if ( index > 0 ) {
		jQuery('button.widget-button.higher').addClass("active");
	}
}