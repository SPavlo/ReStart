let project_folder = "dist"
let source_folder = "src"

let path = {
    build:{
        html:project_folder + "/",
        css:project_folder + "/css/",
        js:project_folder + "/js/",
        img:project_folder + "/img/",
        fonts:project_folder + "/fonts/",
    },
    src:{
        html:[source_folder + "/*.html", "!" +source_folder + "/_*.html", ],
        css:source_folder + "/scss/style.scss",
        js:source_folder + "/js/script.js",
        img:source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
        fonts:source_folder + "/fonts/*.ttf",
    },
    watch:{
        html:source_folder + "/**/*.html",
        css:source_folder + "/scss/**/*.scss",
        js:source_folder + "/js/**/*.js",
        img:source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
    },
    clean:"./" + project_folder + "/"

}
let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    scss = require("gulp-sass")(require('sass')),
    autoprefixer =require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css");
    rename = require("gulp-rename");
    uglify = require("gulp-uglify-es").default,
    ttf2woff = require("gulp-ttf2woff")
    ttf2woff2 = require("gulp-ttf2woff2")




function browserSync(params){
    browsersync.init({
        server:{
            baseDir:"./" + project_folder + "/"
        },
        port:3000,
        notify:false
    })
}
function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}
function css() {
    return src(path.src.css)
        .pipe(scss({ outputStyle: 'expanded' }).on('error', scss.logError))
        .pipe(group_media())
        .pipe(autoprefixer({
            overrideBrowserslist:["Last 5 version"],
            cascade:true
        }))
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname:".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html],html)
    gulp.watch([path.watch.css],css)
}
function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}
function fonts(){
        src(path.src.fonts)
            .pipe(ttf2woff())
            .pipe(dest(path.build.fonts))
        return src(path.src.fonts)
            .pipe(ttf2woff2())
            .pipe(dest(path.build.fonts))
}
let build = gulp.series(gulp.parallel(css,html, images,fonts))
let watch = gulp.parallel(build,watchFiles,browserSync)

exports.fonts = fonts
exports.images = images
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch