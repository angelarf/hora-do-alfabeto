const gulp = require('gulp');
const del = require('del');
const copy = require('gulp-copy');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

gulp.task('copy', () => {
	return gulp.src(['index.html', './assets/img/**/*', './assets/js/**/*'])
		.pipe(copy('./public'));
});

gulp.task('clean', () => {
	return del([
		'public/**/*'
	]);
});

gulp.task('css', () => {
	let postcss      = require('gulp-postcss');
	let sourcemaps   = require('gulp-sourcemaps');
	let autoprefixer = require('autoprefixer');

	return gulp.src('./assets/css/*.css')
		.pipe(sourcemaps.init())
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/assets/css'));
});

gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});

	gulp.watch(['index.html', 'assets/img/**/*', 'assets/js/**/*'], ['server-watch']);
	gulp.watch('assets/css/*.css', ['server-watch']);
});

// just reload browser when all tasks run synchronous
gulp.task('server-watch', ['default'], (done) => {
	browserSync.reload();
	done();
});

// run tasks synchronous
gulp.task('build', (cb) => {
	runSequence('clean', 'copy', 'css', cb);
});

gulp.task('server', (cb) => {
	runSequence('build', 'browser-sync', cb);
});
gulp.task('default', ['build']);
