const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require("rimraf");

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            port:8080,
            baseDir: "build"
        }
    });
    gulp.watch('build/**/*').on('change',browserSync.reload)
});

//Pug compile
gulp.task('templates:compile', function buildHTML() {
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});

//Style compile
gulp.task('sass', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});

//Sprite compile
gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/image/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.scss'
    }));
    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});

//Delete

gulp.task('clean', function del(cb) {
    return rimraf ('build',cb);
})

//Copy fonts

gulp.task('copy:fonts', function () {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
})

//Copy image

gulp.task('copy:images', function () {
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
})

//Copy
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));