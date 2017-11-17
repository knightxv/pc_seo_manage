const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const reload = browserSync.reload;
// 静态服务器
gulp.task('browser-sync',['less'], function() {
    browserSync.init({
				// server: {
				// 	baseDir: './',
				// },
        proxy: 'localhost:7001',
        //     files: ["../app/views/**/*.nj"]
    });
    gulp.watch('../app/public/less/**/*.less', ['less']);
    gulp.watch('../app/views/**/*.nj').on('change', reload)
});

gulp.task('less', function() {
    return gulp.src("../app/public/less/**/*.less")
        .pipe(less())
        .pipe(gulp.dest("../app/public/css"))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['browser-sync'])

// 代理

// gulp.task()

// gulp.task('browser-sync', function() {
//   browserSync.init({
//     proxy: '你的域名或IP',
//   });
// });

