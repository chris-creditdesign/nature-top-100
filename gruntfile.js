// Generated on 2014-09-19 using generator-polopoly-widget 0.0.0
module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		sass: {
		    build: {
				options: {                       // Target options
					style: 'expanded'
				},
		        files: {
		            'assets/css/index.css': 'assets/sass/index.scss'
		        }
		    }
		},

		jshint: {
			files: {
				src : 'assets/js/*.js'
			},
		},
	  	uglify: {
			my_target: {
				files: {
				'assets/js/thRoData.min.js': ['assets/js/thRoData.js']
				}
			}
		},
		concat: {
			buildIndex: {
				src: [	
						'assets/concat/polopoly-header.html',
						'assets/concat/style-open.txt',
						'assets/css/index.css',
						'assets/concat/style-close.txt',
						'assets/widget.html',
						'assets/concat/script-open.txt',
						
						// 'assets/js/thRoData.min.js',

						'assets/js/pubsub.js',
						'assets/js/tenOrOne.js',
						'assets/js/getColour.js',
						'assets/js/buildDataSet.js',
						'assets/js/comparePaper.js',

						'assets/js/BuildWidget.js',

						'assets/js/buildGraphic.js',
						'assets/js/buildScales.js',
						'assets/js/buildAxes.js',
						'assets/js/buildBrush.js',
						'assets/js/updateBars.js',
						'assets/js/mainBars.js',
						'assets/js/miniBars.js',
						'assets/js/mainPaths.js',
						'assets/js/miniPaths.js',
						'assets/js/numbers.js',
						'assets/js/updatePointer.js',

						'assets/js/controller.js',
						'assets/js/upDateButtons.js',
						'assets/js/buildLifeCycle.js',
						'assets/js/populateInfoBox.js',
						'assets/js/createKey.js',
						
						'assets/js/index.js',
						'assets/concat/script-close.txt',
						'assets/concat/polopoly-footer.html'
						],
				dest: 'build/index.html'
			},
			distIndex: {
				src: [	
						'assets/concat/style-open.txt',
						'assets/css/index.css',
						'assets/concat/style-close.txt',
						'assets/widget.html',
						'assets/concat/script-open.txt',
						
						// 'assets/js/thRoData.min.js',

						'assets/js/pubsub.js',
						'assets/js/tenOrOne.js',
						'assets/js/getColour.js',
						'assets/js/buildDataSet.js',
						'assets/js/comparePaper.js',

						'assets/js/BuildWidget.js',

						'assets/js/buildGraphic.js',
						'assets/js/buildScales.js',
						'assets/js/buildAxes.js',
						'assets/js/buildBrush.js',
						'assets/js/updateBars.js',
						'assets/js/mainBars.js',
						'assets/js/miniBars.js',
						'assets/js/mainPaths.js',
						'assets/js/miniPaths.js',
						'assets/js/numbers.js',
						'assets/js/updatePointer.js',

						'assets/js/controller.js',
						'assets/js/upDateButtons.js',
						'assets/js/buildLifeCycle.js',
						'assets/js/populateInfoBox.js',
						'assets/js/createKey.js',
						
						'assets/js/index.js',
						'assets/concat/script-close.txt',
						],
				dest: 'dist/index.html'
			},
			iFrameIndex: {
				src: [	
						'assets/concat/iframe-header.html',
						'assets/concat/style-open.txt',
						'assets/css/index.css',
						'assets/concat/style-close.txt',
						'assets/widget.html',
						'assets/concat/script-open.txt',
						
						// 'assets/js/thRoData.min.js',

						'assets/js/pubsub.js',
						'assets/js/tenOrOne.js',
						'assets/js/getColour.js',
						'assets/js/buildDataSet.js',
						'assets/js/comparePaper.js',

						'assets/js/BuildWidget.js',

						'assets/js/buildGraphic.js',
						'assets/js/buildScales.js',
						'assets/js/buildAxes.js',
						'assets/js/buildBrush.js',
						'assets/js/updateBars.js',
						'assets/js/mainBars.js',
						'assets/js/miniBars.js',
						'assets/js/mainPaths.js',
						'assets/js/miniPaths.js',
						'assets/js/numbers.js',
						'assets/js/updatePointer.js',

						'assets/js/controller.js',
						'assets/js/upDateButtons.js',
						'assets/js/buildLifeCycle.js',
						'assets/js/populateInfoBox.js',
						'assets/js/createKey.js',
						
						'assets/js/index.js',
						'assets/concat/script-close.txt',
						'assets/concat/iframe-footer.html'
						],
				dest: 'iframe/index.html'
			}
		},

		browser_sync: {
			files: {
				src: [
					'build/index.html',
					]
			},
			options: {
				watchTask: true
			}
		},

		watch: {
		    css: {
		        files: ['assets/sass/**/*.scss'],
		        tasks: ['buildcss','concat']
			},
			concat: {
				files: ['assets/*','assets/js/*.js'],
				tasks: ['jshint','concat']
			}
		}

    });

    grunt.registerTask('default', ['watch']);
    // use build css for the final dist css
    grunt.registerTask('buildcss',  ['sass']);

};