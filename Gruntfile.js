/* global process */
module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: [
          'components/**/*',
          'assets/css/src/*.css'
        ],
        tasks: ['quickbuild'],
      }
    },

    react: {
      jsx: {
        files: {
          'app_all.js': [
          'components/todo/TodoList.js',
          'components/todo/TodoItem.js',
          'components/todo/TodoInput.js',
          'components/todo/TodoClear.js',
          'components/todo/Todo.js'
          ]
        }
      }
    },

    autoprefixer: {
      prefix: {
        expand: true,
        flatten: true,
        src: 'assets/css/src/*.css',
        dest: 'assets/css/dist/'
      }
    }
  });

  grunt.registerTask('default', [], function() {
    grunt.task.run(
      'quickbuild'
      );
  });

  grunt.registerTask('dev', [], function() {
    grunt.task.run([
      'quickbuild',
      'watch',
      ]);
  });

  grunt.registerTask('quickbuild', [], function() {
    grunt.task.run(
      'react',
      'autoprefixer'
      );
  });
};
