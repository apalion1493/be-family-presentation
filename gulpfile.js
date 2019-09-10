const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const ejs = require('gulp-ejs');
const uglify = require('gulp-uglify');
const rigger = require("gulp-rigger");
const del = require('del');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();



function styles() {

    return gulp.src('./src/assets/scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemap.write('./'))
        .pipe(gulp.dest('./build/assets/css'))
        .pipe(browserSync.stream());
}

function scripts() {

    return gulp.src('./src/assets/js/**/*.js')
        //.pipe(concat('main.js'))
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest('./build/assets/js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/assets/js'))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src('./src/*.html')
        .pipe(plumber())
        .pipe(ejs())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}

function img() {
    return gulp.src('./src/assets/img/**/*.*')
    //Optimization image size. Comment because take too many time for compilation. Uncomment prev last compilation
        // .pipe(imagemin({
        //     optimizationLevel: 3,
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     interlaced: true
        // }))
        .pipe(gulp.dest('./build/assets/img'))
}

function fonts() {
    return gulp.src('./src/assets/fonts/**/*.*')
        .pipe(gulp.dest('./build/assets/fonts'))

}

function og() {
    return gulp.src('./src/assets/og/**/*.*')
        .pipe(gulp.dest('./build/assets/og'))

}

function favicons() {
    return gulp.src('./src/assets/favicons/**/*.*')
        .pipe(gulp.dest('./build/assets/favicons'))

}

function clean() {
    return del(['build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch('./src/assets/scss/**/*.scss', styles)
    gulp.watch('./src/assets/js/**/*.js', scripts)
    gulp.watch('./src/*.html', html)
    gulp.watch('./src/assets/img/**/*.*', img)
    gulp.watch('./src/assets/fonts/**/*.*', fonts)
    gulp.watch('./src/assets/og/**/*.*', og)
    gulp.watch('./src/assets/og/**/*.*', favicons)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('html', html);
gulp.task('img', img);
gulp.task('fonts', fonts);
gulp.task('og', og);
gulp.task('og', favicons);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts,html,img,fonts,og,favicons)));
gulp.task('dev', gulp.series('build','watch'));