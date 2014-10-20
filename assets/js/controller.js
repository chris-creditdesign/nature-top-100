var myGraphic;
var myLifeCycleGraphic;
var myInfoBox;
var myButtons;
var displayIndex = 0;

function indexChosen  ( topic, index ) {
	displayIndex = index;

	myGraphic.upDatePointer(index);
	myLifeCycleGraphic.updateLine(index);
	myInfoBox.updateText(index);
	upDateButtons(index);
}

/*	Create subscriptions to the newDataAvailable, scrollingTimeline
			and timelineClicked topics */
var dataSubscriber = pubsub.subscribe( "newIndexChosen", indexChosen );

