/*global module:false*/
module.exports = function(grunt) {
  
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    // Task configuration.
    concat: {
      js: {
        src: ['js/carousel.js'],
        dest: 'src/js/scripts.js'
      },
      css: {
        src: ['css/main.scss','css/theme.scss'],
        dest: 'src/css/scripts.scss'
      },
      html: {
        src: ['html/*.html','html/*.html'],
        dest: 'src/html/*.html'
      },     
    },
    jshint: {
      options: {
        jshintrc: '<%= baseDir %>/.jshintrc',
        reporterOutput: "",  
      },
      
    },   
    uglify: {
      js: {
        files: 'src/js/*.js',
        tasks: ['concat'],
      },
      css: {
        files: 'src/css/*.sass',
        tasks: ['concat'],
      },
      html: {
        files: 'src/html/*.html',
        tasks: ['concat'],
      },
    },
    qunit: {
      options: {
        dest: 'report/'
      }
    },
    sass: {
      options: {
        compass: true
      },
      dist: {
        files: [{
          expanded: true,
          cwd: "scss", // tried "/scss/", "/scss", "scss/"
          src: ["*.scss"], // tried "/*.scss"
          dest: "css",
          ext: ".css"
        }]
      }
    },
    watch: {
      js: {
        files: 'src/js/**/*.js',
        tasks: ['concat'],
      },
      css: {
        files: 'src/css/*.sass',
        tasks: ['concat'],
      },
      html: {
        files: 'src/html/*.html',
        tasks: ['concat'],
      },
      gruntfile: {
        files: 'jshint.gruntfile.src',
        tasks: ['jshint:gruntfile'],
      },
      livereload: {
        files: ['src/*.html', 'src/css/*.scss', 'src/images/*', 'src/js/main.min.js'],
        options: {
          livereload: true
        }
      },
    },
    serve: {
      options: {
          port: 9000
      }
    }
  });
  
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-serve');
  //grunt.loadNpmTasks('grunt-express');
  
  // Default task.
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'watch','sass','serve']);
  
};
