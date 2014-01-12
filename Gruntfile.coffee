"use strict"

module.exports = (grunt) ->

  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

  grunt.initConfig

    srcPath: "src"
    buildPath: "build"
    filename: "jquery.circle"
    pkg: grunt.file.readJSON "package.json"

    coffeelint:
      options:
        arrow_spacing:
          level: "error"
        no_empty_param_list:
          level: "error"
        no_unnecessary_fat_arrows:
          level: "error"
        space_operators:
          level: "error"
        indentation:
          value: 2
          level: "error"
        max_line_length:
          level: "ignore"
      build: ["Gruntfile.coffee", "<%= srcPath %>/<%= filename %>.coffee"]

    coffee:
      build:
        files:
          "<%= buildPath %>/<%= filename %>.js": "<%= srcPath %>/<%= filename %>.coffee"

    uglify:
      build:
        files:
          "<%= buildPath %>/<%= filename %>.min.js": "<%= buildPath %>/<%= filename %>.js"

    less:
      build:
        files:
          "<%= buildPath %>/<%= filename %>.css": "<%= srcPath %>/<%= filename %>.less"

    cssmin:
      build:
        files:
          "<%= buildPath %>/<%= filename %>.min.css": "<%= buildPath %>/<%= filename %>.css"

    usebanner:
      options:
        banner: "/* ========================================================================\n" +
        " * <%= pkg.name %> - v<%= pkg.version %>\n" +
        " * <%= pkg.homepage %>\n" +
        " * ========================================================================\n" +
        " * Copyright 2012-2013 <%= pkg.author.name %>\n" +
        " *\n" +
        " * ========================================================================\n" +
        " * Licensed under the Apache License, Version 2.0 (the \"License\");\n" +
        " * you may not use this file except in compliance with the License.\n" +
        " * You may obtain a copy of the License at\n" +
        " *\n" +
        " *     http://www.apache.org/licenses/LICENSE-2.0\n" +
        " *\n" +
        " * Unless required by applicable law or agreed to in writing, software\n" +
        " * distributed under the License is distributed on an \"AS IS\" BASIS,\n" +
        " * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" +
        " * See the License for the specific language governing permissions and\n" +
        " * limitations under the License.\n" +
        " * ========================================================================\n" +
        " */\n"
      css:
        files:
          src: "<%= buildPath %>/**/*.css"
      js:
        files:
          src: "<%= buildPath %>/**/*.js"

    jshint:
      all: "*.json"

    clean:
      css: "<%= buildPath %>/**/*.css"
      js: "<%= buildPath %>/**/*.js"

    connect:
      go:
        options:
          port: 3000

    open:
      go:
        path: "http://localhost:<%= connect.go.options.port %>"

    bump:
      options:
        files: ["package.json", "bower.json"]
        commitFiles: ["-a"]
        push: false

    watch:
      coffee:
        files: "<%= srcPath %>/**/*.coffee"
        tasks: ["clean:js", "coffeelint", "coffee", "uglify", "usebanner:js"]
      less:
        files: "<%= srcPath %>/**/*.less",
        tasks: ["clean:css", "less", "cssmin", "usebanner:css"]

  grunt.registerTask "go", ["build", "connect", "open", "watch"]
  grunt.registerTask "build", ["clean", "coffeelint", "coffee", "uglify", "usebanner:js", "less", "cssmin", "usebanner:css"]
