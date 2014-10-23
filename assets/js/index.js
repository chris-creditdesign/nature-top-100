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
				
				var thRoParams = {};

				thRoParams.colour =  ["#c1272d",
										"#f15a24",
										"#fbb03b",
										"#d9e021",
										"#39b54a",
										"#00a99d",
										"#0071bc",
										"#1b1464",
										"#93278f",
										"#c69c6d",
										"#8c6239",
										"#754c24",
										"#42210b"];

				/*	Margin, Width and height */
				thRoParams.margin = {top: 15, right: 30, bottom: 40, left: 80, mid: 40};
				thRoParams.lifeCycleMargin = {top: 10, right: 20, bottom: 20, left: 70};
				thRoParams.width = jQuery('.section').width()  - thRoParams.margin.left - thRoParams.margin.right;
				thRoParams.miniHeight = 60;
				thRoParams.lifeCycleHeight = 100;
				thRoParams.lifeCycleWidth = jQuery('.info-box').width() - thRoParams.lifeCycleMargin.left - thRoParams.lifeCycleMargin.right;
				thRoParams.height = 400 - thRoParams.margin.top - thRoParams.margin.mid - thRoParams.miniHeight - thRoParams.margin.bottom;
				thRoParams.handleWidth = 15;
				/*	Global variable to control the length of D3 transitons */
				thRoParams.duration = 450;
				thRoParams.delay = 450;
				thRoParams.activeRecord = {};
				thRoParams.topData = [];
				thRoParams.displayArray = [];
				thRoParams.disciplineArray = [];
				
				
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