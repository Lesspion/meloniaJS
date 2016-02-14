module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');
    
    grunt.initConfig({
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        watch: {
        dev: {
          options: {
            livereload: true
          },
          files: '**/*.*'
        }
      },
      connect: {
        dev: {
          options: {
            port: 8083,
            base: {
                path: '.',
                options: {
                    index: 'views/index3.html',
                    maxArge: 300000
                }
            },
            keepalive: true,
            hostname: '127.0.0.1',
            livereload: true
          }
        }

      },
      concurrent: {
        dev: ['connect:dev', 'watch:dev'] // connect and watch running concurrently!
      }
    });
    
    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('launch', ['nodemon']);
    grunt.registerTask('reload', ['concurrent']);
    
}