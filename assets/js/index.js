(function() {
		var init = function($)
		{

		/*	==================================================================================== */
		/*	jQuery ready */

		$.getScript("http://www.nature.com/widget_assets_polopoly/thRoData.min.js", function() {

				/*	==================================================================================== */
				/*	Load D3 */
				$.getScript("http://www.nature.com/widget_assets_polopoly/thRoData.min.js", function() {
					
					/*	Both jQuery and D3 are available so hide the status message and show the graphic */
					$(".status-message").css("display","none");
					$(".outer-wrapper").css("display","block");

					var height = 400;

					/*	Reduce height of main graphic for smaller screens */
					if (jQuery('.section').width() < 480 ) {
						height = 300;
					}

					var thRoParams = {};

					thRoParams.colour =  ["#c1272d",   /* Biology lab technique */
											"#2a6755", /* Physical chemistry */
											"#fbb03b", /* Bioinformatics */
											"#d9e021", /* Statistics */
											"#39b54a", /* Crystallography */
											"#00a99d", /* Psychology */
											"#0071bc", /* Phylogenetics */
											"#1b1464", /* Physics */
											"#93278f", /* Mathematics */
											"#8c6239"  /* Medicine */
										];

					/*	Margin, Width and height */
					thRoParams.margin = {top: 15, right: 30, bottom: 40, left: 80, mid: 40};
					thRoParams.lifeCycleMargin = {top: 10, right: 10, bottom: 20, left: 70};
					thRoParams.width = jQuery('.section').width()  - thRoParams.margin.left - thRoParams.margin.right;
					thRoParams.miniHeight = 60;
					thRoParams.lifeCycleHeight = 100;
					thRoParams.lifeCycleWidth = jQuery('.info-box').width() - thRoParams.lifeCycleMargin.left - thRoParams.lifeCycleMargin.right;
					thRoParams.height = height - thRoParams.margin.top - thRoParams.margin.mid - thRoParams.miniHeight - thRoParams.margin.bottom;
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

				}); /* End of d3js getscript call */
			
			}); /*	End of the get thRoData.js callback function */

		}; /* End of active code */

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