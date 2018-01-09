const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
/*

-- Top Level Functions
gulp.task - Define Tasks
gulp.src - Point to files to use
gulp.dest - Points to folder to output
gulp.watch - Watch files and folders for changes
*/

//Logs Message

gulp.task('message', function(){
    return console.log('Gulp is running...');
});

gulp.task('default', function(){
    return console.log('Gulp is running...');
});


gulp.task('image-min', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

//Copy all HTML Files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});
