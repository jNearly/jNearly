import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';

import replace from 'gulp-replace';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

function js() {
	return gulp.src(['src/index.js', 'src/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('jnearly.js'))
		//.pipe(replace('function $(', 'export default function $('))
		.pipe(babel({
		//	plugins: ['transform-es2015-modules-umd'],
			moduleId: '$'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
}

gulp.task(js);
gulp.task('default', js);

if (process.argv.indexOf('--watch') !== -1) {
	gulp.watch('./src/**/*.js', js);

	var browserSync = require('browser-sync').create();

	browserSync.init({
		server: {
			baseDir: './'
		},
		startPath: '/test/runner.html'
	});

	gulp.watch(['dist/*.js', 'test/runner.html', 'test/**/*.js'], function () {
		browserSync.reload();
	});
}
