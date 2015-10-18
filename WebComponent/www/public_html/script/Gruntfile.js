module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                beautify: {
                    max_line_len:30000,
                    beautify: false
                }
            },
            build: {
                files: {
                    'min/main.min.js': ['src/main.js'],
                    'min/interaction.min.js': ['src/interaction.js']
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};
