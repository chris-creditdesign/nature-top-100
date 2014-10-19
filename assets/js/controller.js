var myGraphic;
var myLifeCycleGraphic;
var myInfoBox;
var myButtons;
var displayIndex = 0;

function indexChosen  ( topic, index ) {
	console.log(index);

	displayIndex = index;

	myGraphic.upDatePointer(index);
	myLifeCycleGraphic.updateLine(index);
	myInfoBox.updateText(index);
	upDateButtons(index);
}

/*	Create subscriptions to the newDataAvailable, scrollingTimeline
			and timelineClicked topics */
var dataSubscriber = pubsub.subscribe( "newIndexChosen", indexChosen );

function upDateButtons (index) {
	$('button.widget-button').removeClass("active");

	if ( index < 99 ) {
		$('button.widget-button.lower').addClass("active");
	}

	if ( index > 0 ) {
		$('button.widget-button.higher').addClass("active");
	}
}