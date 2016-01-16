import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';

import babel from 'gulp-babel';
import concat from 'gulp-concat';

function js() {
	return gulp.src(['src/index.js', 'src/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('bundle.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
}

gulp.task(js);
gulp.task('default', gulp.series('js'));

if (process.argv.indexOf('--watch') !== -1) {
	gulp.watch('./src/**/*.js', js);
}
