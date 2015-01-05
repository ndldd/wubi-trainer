var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    promise = require('q'),
    inject = require('gulp-inject'),
    spawn = require('child_process').spawn,

    scriptFiles = 'app/**/*.js',

    html = 'app/index.html',
    buildDest = 'build';


gulp.task('compile', function () {
    gulp.src(scriptFiles)
        .pipe(concat('wubi.js'))
        .pipe(gulp.dest(buildDest));
});

gulp.task('html', function () {
    gulp.src(html)
        .pipe(gulp.dest(buildDest));

});

gulp.task('test', function () {
    gulp.src(scriptFiles)
        .pipe(jshint());
    spawn('npm', ['test'], {stdio: 'inherit'});

});

gulp.task('templates', function(){

})

function templates(cb) {
    clean('/scripts/templates*.js', function () {
        console.log('Rebuilding templates');

        gulp.src('app/views/**/*.html')
            .pipe(plugins.angularTemplatecache({
                root: 'views/',
                module: 'clientApp'
            }))
            .pipe(plugins.streamify(plugins.rev()))
            .pipe(gulp.dest(expressRoot + '/scripts'))
            .pipe(gulp.dest(publicDir + '/scripts'))
            .on('end', cb || function () {
            })
            .on('error', plugins.util.log);
    });
}


gulp.task('index', function () {
    var target = gulp.src(html);
    var sources = gulp.src(scriptFiles, {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest(buildDest));

});


gulp.task('default', function () {
    //gulp.run('test');
    gulp.run('compile');
    gulp.run('html');
    gulp.watch(scriptFiles, function () {
        gulp.run('compile');
        gulp.run('html');
    });
})