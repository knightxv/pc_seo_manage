const gulp = require('gulp');
const rev = require('gulp-rev');
// const runSequence = require('run-sequence'),
const revCollector = require('gulp-rev-collector');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const reload = browserSync.reload;
// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
				// server: {
				// 	baseDir: './',
				// },
        proxy: 'localhost:7001',
        open: false
        //     files: ["../app/views/**/*.nj"]
    });
    gulp.watch('./less/**/*.less', ['less', 'revHtmlCss']);
    gulp.watch('./views/**/*.nj', ['revHtmlCss']);//.on('change', reload)
});

gulp.task('revHtmlCss', function() {
    return gulp.src(['../app/public/css/*.json', "./views/**/*.nj"])
        .pipe(revCollector())
        .pipe(gulp.dest('../app/views'))
        .pipe(reload({stream: true}));
});

gulp.task('less', function() {
    return gulp.src("./less/**/*.less")
        .pipe(less())
        .pipe(rev())
        .pipe(gulp.dest("../app/public/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("../app/public/css"))
});

gulp.task('default', ['browser-sync'])

// 代理

// gulp.task()

// gulp.task('browser-sync', function() {
//   browserSync.init({
//     proxy: '你的域名或IP',
//   });
// });

