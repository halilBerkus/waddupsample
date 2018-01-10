const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
-- Top Level Functions
gulp.task - Define Tasks
gulp.src - Point to files to use
gulp.dest - Points to folder to output
gulp.watch - Watch files and folders for changes
*/

//Logs Message
gulp.task('message', function () {
    return console.log('Gulp is running...');
});

gulp.task('default', ['message', 'copyHtml', 'image-min', 'minify', 'sass', 'scripts']);

//Optimize Images
gulp.task('image-min', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

//Copy all HTML Files
gulp.task('copyHtml', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

//Minify JS
gulp.task('minify', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//Compile Sass
gulp.task('sass', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['image-min']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});