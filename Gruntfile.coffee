module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    banner: "/*! <%= pkg.name %>.js - <%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> - <%= pkg.author %> */\n"
    files: [
      "src/signature-mark.js",
      "src/signature-mark/*.js"
    ]
    uglify:
      options:
        banner: "<%= banner %>"
      build:
        src: "<%= files %>"
        dest: "build/signature-mark.min.js"
    concat:
      options:
        banner: "<%= banner %>"
        separator: '\n\n'
        stripBanners : true
      dist:
        src: "<%= files %>"
        dest: "build/signature-mark.js"
    jshint:
      all: ['src/signature-mark.js', 'src/signature-mark/*.js']
    connect:
      server:
        options:
          port: 3000,
          base: './public'
          keepalive: true
    simplemocha:
      all: 
        src: 'test/*.js'

  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-simple-mocha"
  grunt.loadNpmTasks "grunt-contrib-jshint"

  grunt.registerTask "test", ["simplemocha", "jshint"]
  grunt.registerTask "default", ["jshint", "uglify", "concat", "connect"]

  # Some available commands
  # grunt
  # grunt test
  # grunt connect
