const { series, src, dest, watch } = require('gulp');
// 压缩html代码
const htmlClean = require('gulp-htmlclean');

const less = require('gulp-less');
// 压缩css
const cleanCss = require('gulp-clean-css');
// 清楚js调试代码
const stripDebug = require('gulp-strip-debug');
// js压缩但不支持es6的语法
const uglify = require('gulp-uglify');

//  图片压缩
const imagemin = require('gulp-imagemin');
// 服务器
const connect = require('gulp-connect');
// js代码兼容性
const babel = require('gulp-babel');

var browserify = require('gulp-browserify');

// 设置路径
const  folder ={
    src:'src/',
    dist:'dist/'
};

/**
 *配置html
 * @returns
 */
function html() {
    return src(folder.src+'html/*')
        .pipe(htmlClean())
        .pipe(dest(folder.dist+'html/'))
        .pipe(connect.reload());

};
/**
 * 配置css
 * @returns
 */
function css() {
    return src(folder.src+'css/*')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(dest(folder.dist+'css/'))
        .pipe(connect.reload());
};
/**
 * 配置js
 * @returns
 */
function js() {
    return src(folder.src+'js/*')
        .pipe(stripDebug())
        .pipe(babel())
        .pipe(browserify({
            insertGlobals : true,
        }))
        .pipe(uglify())
        .pipe(dest(folder.dist+'js/'))
        .pipe(connect.reload());
};

/**
 * 配置image
 * @returns
 */
function image() {
    return src(folder.src+'images/*')
        .pipe(imagemin())
        .pipe(dest(folder.dist+'images/'));
};
/**
 * 配置server
 * @param {*} cd
 */
function server(cd){
    connect.server({
        port:'4444',
        livereload:true,
        root:'dist'
    });
    cd();//guld中cd()是结束的意思，相当于return
}
/**
 * 实时监听 当下html，css，js 发生改变时重新启动配置
 */
watch(folder.src+'html/*',function(cb){
    html();
    cb();
});
watch(folder.src+'css/*',function(cb){
    css();
    cb();
});
watch(folder.src+'js/*',function(cb){
    js();
    cb();
});
exports.default = series(html, css, js, image, server);