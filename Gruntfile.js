// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        // all of our configuration will go here

        // configure jshint to validate js files ---------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        // configure uglify to minify js files -----------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            dev: {
                files: {
                    'dist/spire.module.directives.min.js': 'src/**/*.js'
                }
            },
            production: {
                files: {
                    'dist/spire.module.directives.min.js': 'src/**/*.js'
                }
            }
        },

        // compile less stylesheets to css ---------------------------------------
        less: {
            build: {
                files: {
                    'src/app/style/styles.css': 'src/app/style/styles.less'
                }
            }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'src/app/style/styles.min.css': 'src/app/style/styles.css'
                }
            }
        },

        // configure copy to copy files from /src to /dist --------------------------
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'dist/'
            },
        }
    });

    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin', 'copy']);
    grunt.registerTask('dev', ['jshint', 'uglify:dev', 'karma', 'less', 'cssmin', 'copy']);
    grunt.registerTask('production', ['jshint', 'uglify:production', 'less', 'cssmin', 'copy']);

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
};