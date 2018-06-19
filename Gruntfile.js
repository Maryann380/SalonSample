'use strict';
var jsBaseDir = 'src/js/';

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            devServer: {
                options: {
                    livereload: true,
                    port: 9000,
                    base: ''
                }
            }
        },


        jasmine : {
            src: 'src/js/custom/*.js',
            options: {
                vendor: [
                    'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js',
                    'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
                    'http://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.11.2/js/bootstrap-select.min.js'
                ],
                specs: 'src/js/custom/specs/**/*spec.js',
                helpers: 'path/to/specs'
            }
        },

        // Less task
        less: {
            examples: {
                options: {
                    outputStyle: 'expanded',
                    sourceMapContents: true,
                    sourceMap: true,
                    precision: 4
                },
                files:{
                    'css/styleLess.css': 'src/less/style.less'
                }
            },
            hybris: {
                options: {
                    outputStyle: 'expanded',
                    sourceMapContents: true,
                    sourceMap: true,
                    precision: 4
                },
                files:{
                    'css/styleLess.css': 'src/less/style_hybris.less'
                }
            },
        },

        // JS concatenation task for third-party scripts
        uglify: { 
            all_src : { 
              options : { 
                sourceMap : true, 
                sourceMapName : 'sourceMap.map'
              }, 
              src : ['!src/js/third-party/jquery.min.js','src/js/third-party/bootstrap.min.js','src/js/third-party/moment.js',
              'src/js/third-party/collapse.js', 'src/js/third-party/bootstrap-select.js', 'src/js/third-party/magicsuggest-min.js',
                'src/js/third-party/datepicker.js', 'src/js/third-party/tether.js', 'src/js/third-party/jquery-ui-1.11.2.min.js',
                'src/js/third-party/jquery-ui.multidatespicker.js', 'src/js/third-party/typeahead.js', 'src/js/third-party/jquery.creditCardValidator.js',
                'src/js/third-party/jquery.validate.min.js', 'src/js/third-party/jquery.dataTables.min.js', 'src/js/third-party/jquery.mask.min.js',
                'src/js/third-party/jquery.mCustomScrollbar.concat.min.js'
              ], 
              dest : 'src/js/third-party/composite.all.min.js'
            } 
        },


        //  JS hint task
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                verbose: true,
            },
            all:[
                'gruntfile.js',
                jsBaseDir + '/custom/*.js',
                '!' + jsBaseDir + '/*.js',
                '!' + jsBaseDir + '/third-party/*.js'
            ]
        },

        // copy JS files task
        sync: {
            options: {
                paths: ''
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['js/**/*.js'],
                    dest: ''
                }],
                verbose: true
            },
            awesomeFonts: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/**/*.*'],
                    dest: ''
                }],
                verbose: true
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['fonts/**/*.*'],
                    dest: ''
                }],
                verbose: true
            },
            images: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['images/**'],
                    dest: ''
                }],
                verbose: true
            },

            moveStaticFiles: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: ['**/*.*'],
                    dest: ''
                }],
                verbose: true
            }
        },

        // Post CSS task
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions']})
                ]
            },
            examples: {
                src: 'css/**/*.scss'
            }
        },

        // *********   WATCH task **************************
        watch: {
            scss: {
                files: ['src/css/**/*.scss'],
                tasks: ['less:examples'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['sync'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            test: {
                files: [
                    'gruntfile.js',
                    jsBaseDir + '/custom/*.js',
                    '!' + jsBaseDir + '/*.js',
                    '!' + jsBaseDir + '/third-party/*.js'
                ],
                tasks: ['jshint'],
            },
            css: {
                files: ['css/**/*.scss'],
                tasks: 'postcss',
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            html: {
                files: [
                    'src/**/*.html',
                    'src/**/*.twig'
                ],
                tasks: [
                    'clean:html',
                    'prettify',
                    'sync'
                ],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            gruntfile: {
                files: 'gruntfile.js',
                options: {
                    spawn: false,
                    livereload: true,
                    reload: true
                }
            }
        },

        // Nunjucks task
        nunjucks: {
            options: {
                paths: 'src/html'
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/html',
                    src: [
                        '**/*.html'
                    ],
                    dest: '',
                    ext: '.html'
                }],
            }
        },

        // Clean task
        clean: {
            html: {
                src: [
                    'index.html',
                    'src/**/*.html'
                ]
            },
            css: {
                src: ['css/*.scss']
            },
            all: {
                src: [
                    'index.html',
                    'src/**/*.html',
                    'css/*.scss'
                ]
            }
        },

        // Prettify task
        prettify: {
            options: {
                'indent': 1,
                'indent_char': ' ',
                'wrap_line_length': 250,
                'brace_style': 'collapse',
                'preserve_newlines': true,
                'condense': true,
                'max_preserve_newlines': 2,
                'unformatted': ['a', 'code', 'pre']
            },
            all: {
                expand: true,
                cwd: '',
                src: ['src/**/*.html'],
                dest: '',
                ext: '.html'
            }
        },


        accessibility: {
            options : {
                accessibilityLevel: 'WCAG2A',
                domElement: false,
                force: true,
                ignore : [
                    'WCAG2A.Principle1.Guideline1_1.1_1_1.G73,G74',
                    'WCAG2A.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81'
                ],
                reportLevels: {
                    notice: false,
                    warning: false,
                    error: true
                }
            },
            test : {
                src: ['src/index.html']
            }
        }
    });

    // Load the plugins to run your tasks
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-accessibility');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    
    // Default task(s).
    grunt.registerTask('default', [
        'clean:all',
        'less:examples',
        'sync',
        'jshint',
        'postcss',
        'nunjucks',
        'prettify',
        'connect:devServer',
        'watch'
    ]);

    // Default task(s).
    grunt.registerTask('hybris', [
        'clean:all',
        'less:hybris',
        'sync',
        'jshint',
        'postcss',
        'nunjucks',
        'prettify',
        'connect:devServer',
        'watch'
    ]);

    grunt.registerTask('serve-up', ['sync:moveStaticFiles', 'connect:devServer']);
    grunt.registerTask('move-static', 'connect:moveStaticFiles');
    grunt.registerTask('test-js', 'jasmine');
    grunt.registerTask('check-js', ['jshint']);
    grunt.registerTask('compile-less', ['less']);
    grunt.registerTask('check-accessibility', ['accessibility']);
    grunt.registerTask('concatJS', ['uglify']);
    

};
