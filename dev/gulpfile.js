const fs = require('fs');
const path = require('path');
const gulp = require('gulp');

// dev
var runSequence = require('run-sequence'); //让gulp任务，可以相互独立，解除任务间的依赖，增强task复用
var sourcemaps = require('gulp-sourcemaps'); // 源码压缩之后不易报错定位  sourcemaps用于错误查找
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
//当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
// common
const rev = require('gulp-rev'); // 处理hash值（用于处理缓存）
const revCollector = require('gulp-rev-collector'); // 校正html的hash指向（通过rev-mainfest.json）
// css
const less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer'); // 处理浏览器私有前缀
var precss  = require('precss'); // 像Sass的函数(暂时没什么用)
// 非必要
// var minifycss = require('gulp-minify-css'); // 压缩css
var babel = require('gulp-babel'); // 编译ES6语法
var es2015 = require("babel-preset-es2015");
// var jshint = require("gulp-jshint");//gulp jshint 插件主要用于检查代码，打印报告信息。
// var stylish = require("jshint-stylish");
// var concat = require('gulp-concat');//合并js
// 
// var cache = require('gulp-cache'); //清除缓存


const developPath = '.'; // 开发的地方
const lessDevelopPath = developPath + '/less'; // less文件开发的文件夹地址
const jsDevelopPath = developPath + '/js'; // js文件开发的文件夹地址

const distPath = '../app'; // less打包之后的地址
const cssDistPath = distPath + '/public/static/css';
const jsDistPath = distPath + '/public/static/js'; // js文件开发的文件夹地址

const templateDevolopPath = developPath + '/views'; //  模板文件存放的地址
const templateDistPath = '../app/views'; // 模板文件打包的地址

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
				// server: {
				// 	baseDir: './',
				// },
        proxy: 'localhost:7001', // 代理的域名,ip
        open: false, // 不打开浏览器
        //     files: ["../app/views/**/*.nj"]
    });
    gulp.watch(lessDevelopPath + "/**/*.less").on('change', function () {
        var filePathList = readFileNameList(cssDistPath);
        for (var i = 0; i < filePathList.length; i++) {
         if (/\.css$/.test(filePathList[i])) {
             fs.unlinkSync(filePathList[i]);
         }
        }
        runSequence('less', 'revHtml', 'reload');
    });
    // gulp.watch('./less/**/*.less', ['less', 'revHtmlCss']);
    gulp.watch('./views/**/*.nj').on('change', function() {
    	runSequence('revHtml', 'reload');
    });
    gulp.watch(jsDevelopPath + '/**/*.js').on('change', function() {
        // var filePathList = readFileNameList(jsDistPath);
        // for (var i = 0; i < filePathList.length; i++) {
        //  if (/\.js$/.test(filePathList[i])) {
        //      fs.unlinkSync(filePathList[i]);
        //  }
        // }
    	runSequence('resolveJs', 'revHtml', 'reload');
    });
});

// 处理js,css版本号
gulp.task('revHtml', function() {
    return gulp.src([distPath + '/public/static/**/*.json', templateDevolopPath + '/**/*.nj'])
        .pipe(revCollector({
            replaceReved: true,
        }))
        .pipe(gulp.dest(templateDistPath));
});



// 处理less文件
gulp.task('less', function() {
	var postPlugins = [
		autoprefixer,
		precss,
	];
    return gulp.src( lessDevelopPath + "/**/*.less")
    	.pipe(sourcemaps.init())
    	.pipe(plumber({errorHandler: notify.onError('gulp有错误')}))
        .pipe(less())
        .pipe(postcss(postPlugins))
        .pipe(rev())
        // .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssDistPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(cssDistPath))
});

gulp.task('resolveJs', function() {
	return gulp.src(jsDevelopPath + '/**')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [es2015]
        }))
        .pipe(rev())
        // .pipe(jshint(".jshintrc"))  Jshint可在package.json配置，也可在.jshintrc处配置。默认在单独文件中配置
        //.pipe(jshint.reporter("default"))
        // .pipe(jshint.reporter(stylish))
        // .pipe(uglify({mangle: false}))
        .pipe(sourcemaps.write())
        .on('error', function (e) {
            console.log(e);
        })
        .pipe(gulp.dest(jsDistPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(jsDistPath))
});


gulp.task('reload', function () {
    browserSync.reload();
    //console.log("reload complete at " + new Date().toString());
})

gulp.task('default', ['browser-sync'])


// // 删除css文件，不然会重复
// gulp.task('cleanCss', function () {
//     var filePathList = readFileNameList(cssDistPath);
//     for (var i = 0; i < filePathList.length; i++) {
//     	if (/\.css$/.test(filePathList[i])) {
//         	fs.unlink(filePathList[i]);
//     	}
//     }
//     return true;
// })

//获取文件夹下所有的文件名字并返回一个数组
function readFileNameList(dirPath) {
    var result = [];

    function finder(dirPath) {
        var files = fs.readdirSync(dirPath);
        files.forEach(function (val, index) {
            var fPath = path.join(dirPath, val);
            var stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(fPath.toString().split("\\").join("/"));
        });

    }

    finder(dirPath);
    console.log(result);
    return result;
}
