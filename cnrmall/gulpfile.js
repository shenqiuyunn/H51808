var gulp = require('gulp'); 
var uglify = require('gulp-uglify'); 
var ughtml = require('gulp-minify-html');  
var sass = require('gulp-sass'); 
var ugcss = require('gulp-minify-css'); 
var imagemin = require('gulp-imagemin');

//压缩js代码
gulp.task('uglifyjs',function(){
	gulp.src('src/script/js/*.js') 
	.pipe(uglify()) 
	.pipe(gulp.dest('dist/script/js/'))
}); 

gulp.task('dsfjs',function(){
	gulp.src('src/script/thirdplugins/*.js') 
	.pipe(uglify()) 
	.pipe(gulp.dest('dist/script/thirdplugins/'))
}); 
 
//压缩html文件
gulp.task('uglifyhtml',function(){
	gulp.src('src/*.html')
	.pipe(ughtml()) 
	.pipe(gulp.dest('dist/'));
});

//编译sass
gulp.task('sass',function(){
	gulp.src('src/sass/*.scss')
	.pipe(sass())//执行编译的插件
	.pipe(gulp.dest('src/css'))
});

//压缩css
gulp.task('uglifycss',function(){
	gulp.src('src/css/*.css')
	.pipe(ugcss())//执行编译的插件
	.pipe(gulp.dest('dist/css/'))
});

//压缩图片
gulp.task('runimg',function(){
	gulp.src('src/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img/'));
});

gulp.task('default',function(){
	gulp.watch(['uglifyjs','dsfjs','uglifyhtml','sass','uglifycss','runimg']);
}) 