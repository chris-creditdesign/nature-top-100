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
		concat: {
			buildIndex: {
				src: [	
						'assets/concat/polopoly-header.html',
						'assets/concat/style-open.txt',
						'assets/css/index.css',
						'assets/concat/style-close.txt',
						'assets/widget.html',
						'assets/concat/script-open.txt',
						'assets/js/data.js',
						'assets/js/tooltip.js',
						'assets/js/handleChange.js',
						'assets/js/updateArray.js',
						'assets/js/createCheckboxes.js',
						'assets/js/getColour.js',
						'assets/js/comparePaper.js',
						'assets/js/buildGraphic.js',
						'assets/js/buildSVG.js',
						'assets/js/buildDataSet.js',
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
						'assets/js/data.js',
						'assets/js/tooltip.js',
						'assets/js/handleChange.js',
						'assets/js/updateArray.js',
						'assets/js/createCheckboxes.js',
						'assets/js/getColour.js',
						'assets/js/comparePaper.js',
						'assets/js/buildGraphic.js',
						'assets/js/buildSVG.js',
						'assets/js/buildDataSet.js',
						'assets/js/index.js',
						'assets/concat/script-close.txt',
						],
				dest: 'dist/index.html'
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