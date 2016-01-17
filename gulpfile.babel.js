import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';

import babel from 'gulp-babel';
import concat from 'gulp-concat';

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

import generateDocsPlugin from './gulp/generateDocs';

function js() {
	return gulp.src(['src/index.js', 'src/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('bundle.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
}

function css() {
	return gulp.src('app/assets/css/styles.css')
		.pipe(postcss([ autoprefixer(['last 2 versions', '> 5%']), postcssImport ]))
		.pipe(gulp.dest('app/assets/build'));
}

function generateDocs() {
	return gulp.src('src/**/*.js')
		.pipe(generateDocsPlugin())
		.pipe(gulp.dest('app'));
}

gulp.task(js);
gulp.task(generateDocs);

gulp.task('default', gulp.parallel(js, css, generateDocs));

if (process.argv.indexOf('--watch') !== -1) {
	gulp.watch('./src/**/*.js', js);
	gulp.watch('./app/assets/css/**/*.css', css);
	gulp.watch(['./src/**/*.js', './templates/*.html'], generateDocs);
}
