(function() {
		var init = function($)
		{

		/*	==================================================================================== */
		/*	jQuery ready */

			/*	==================================================================================== */
			/*	Load D3 */
			/*	All of the D3/svg code is contained within the call back function */
			/*	Loading D3 into ie6-8 seems to cause a runtime error */
			$.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js", function() {
				
				var thRoGraphic = new BuildWidget("#tr-graphic", thRoParams, thRoData);

				extendObject(thRoGraphic.pubsub);

				/*	Create subscription for a new index being chosen */
				thRoGraphic.pubsub.subscribe( "newIndexChosen", thRoGraphic.indexChosen, thRoGraphic );
				
				thRoGraphic.data.sort(comparePaper);

				for (var i = 0; i < thRoGraphic.data.length; i++) {
					thRoGraphic.data[i].rank = (i + 1);
				}
				thRoGraphic.prepareLifeCycelData();

				thRoGraphic.updatedData = thRoGraphic.data.slice(0);
				thRoGraphic.disciplines = buildDataSet(thRoGraphic.data);
				
				thRoGraphic.buildGraphic();
				thRoGraphic.buildScales();
				thRoGraphic.buildAxes();
				thRoGraphic.buildBrush();
				thRoGraphic.enterMiniBars();
				thRoGraphic.updateBars();

				thRoGraphic.populateInfoBox();

				thRoGraphic.buildLifeCycle();
				thRoGraphic.buildLifeCycleScales();
				thRoGraphic.buildLifeCycleAxes();
				

				thRoGraphic.buttonClick();
				thRoGraphic.upDateButtons();

				thRoGraphic.createKey();




			}); /* End of d3js getscript call

		/* End of active code */
		};


	setTimeout(function()
	{
	if (typeof jQuery !== 'undefined')
	{
		init(jQuery);
	} else
	{
		setTimeout(arguments.callee, 60);
	}
	}, 60);

})();