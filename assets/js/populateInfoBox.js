BuildWidget.prototype.populateInfoBox = function () {
	jQuery(".life-cycle .rank").text(this.data[this.displayIndex].rank);
	jQuery(".life-cycle .cites").text(this.format(this.data[this.displayIndex].cites));

	jQuery(".life-cycle .title").html(this.data[this.displayIndex].title);
	jQuery(".life-cycle .authors").html(this.data[this.displayIndex].authors);

	if (this.data[this.displayIndex].hyperlink !== "0") {
		if (jQuery(".life-cycle a.paper-link").hasClass('dead-link')) {
			jQuery(".life-cycle a.paper-link").removeClass('dead-link');
		}
		jQuery(".life-cycle a.paper-link").prop("href", this.data[this.displayIndex].hyperlink);
	} else {
	if (!jQuery(".life-cycle a.paper-link").hasClass('dead-link')) {
			jQuery(".life-cycle a.paper-link").addClass('dead-link');
		}
		jQuery(".life-cycle a.paper-link").prop("href", "#");
	}
	
	jQuery(".life-cycle .journal").text(this.data[this.displayIndex].journal);
	jQuery(".life-cycle .volume").text(this.data[this.displayIndex].volume);
	jQuery(".life-cycle .page").html(this.data[this.displayIndex].page);
	jQuery(".life-cycle .pub-year").text(this.data[this.displayIndex]["pub-year"]);

};
