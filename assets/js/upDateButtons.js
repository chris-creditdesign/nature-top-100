BuildWidget.prototype.buttonClick = function() {
	var self = this;

	jQuery(this.target + ' button.widget-button').click(function () {
		if (jQuery(this).hasClass('lower') && (self.displayIndex < 99)) {
			self.displayIndex++;
		} else if (jQuery(this).hasClass('higher') && (self.displayIndex > 0)) {
			self.displayIndex--;	
		}
		
		self.pubsub.publish("newIndexChosen", self.displayIndex);
	});
};

BuildWidget.prototype.upDateButtons = function () {
	jQuery(this.target + ' button.widget-button').removeClass("active");

	if ( this.displayIndex < 99 ) {
		jQuery(this.target + ' button.widget-button.lower').addClass("active");
	}

	if ( this.displayIndex > 0 ) {
		jQuery(this.target + ' button.widget-button.higher').addClass("active");
	}
};
