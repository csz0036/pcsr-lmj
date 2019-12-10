/*
 * @Author: your name
 * @Date: 2019-12-06 22:20:15
 * @LastEditTime: 2019-12-10 21:24:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /pcsr-lmj/gulpfile.js
 */
var gulp = require('gulp'),
     sass = require('gulp-sass'),
     webserver = require('gulp-webserver'),
     livereload = require('gulp-livereload');


//编译scss sass
gulp.task("sass", function() {
    return gulp.src("sass/**.scss")
        .pipe(sass({outputStyle: 'expanded'}).on("error", sass.logError))
        .pipe(gulp.dest("css"))
});


//使用webserver启动一个Web服务器
gulp.task('webserver', function() {
    gulp.src('') //src--root dir
        .pipe(webserver({
            path: '/',
            host: '127.0.0.1',
            port: '8082',
            livereload: false,
            directoryListing: true,
            open: true,
            proxies: [
                {
                    source: '/api', 
                    target: 'http://www.soiroc.com:9002'
                },
                
            ]
        }));
});

gulp.task('watch', function () {
    gulp.watch("sass/**.scss", ["sass"]);
    //gulp.watch('**/*.html', ['html']);
});
gulp.task('default',['webserver','watch']);