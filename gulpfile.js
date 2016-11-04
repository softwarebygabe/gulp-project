

var gulp = require('gulp');

var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

// generic task form:
// gulp.task('task-name', function() {
// 	// task stuff
// });

// test gulp task
// Run with 'gulp hello'
gulp.task('hello', function(){
	console.log('hello!!!');
});


// let's compile some sass
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss') // takes any file in app/scss and child dirs that end in scss
		.pipe(sass()) // turn the sass files into css files
		.pipe(gulp.dest('app/css')) // save the css files here
		.pipe(browserSync.reload({ //inject new css into the browser when it needs to reload
			stream: true
		}))
});


// let's create a browserSync task
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir:'app'
		}
	});
});

// generic gulp watch syntax
// gulp.watch('files-to-watch', ['tasks','to','run']);


// let's watch all of the sass files for changes and if/when they change run the 'gulp sass' task
// gulp.watch('app/scss/**/*.scss', ['sass']);

// We want to watch a bunch of files at once though so we should make a watch task
gulp.task('watch', ['browserSync','sass'], function(){
	// watch the sass files
	gulp.watch('app/scss/**/*.scss', ['sass']);
	// other watchers
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);

});

