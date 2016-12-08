var gulp = require('gulp'),
    babel = require('gulp-babel'),
    mocha = require('gulp-mocha'),
    Q = require('q'),
    watch = require('gulp-watch'),
    exec = require('child_process').exec;

function runSynchronized(tasks, deferred) {
    // First call, create a deferred
    if (!deferred) {
        deferred = Q.defer();
    }
    // Run the next task
    if (tasks.length) {
        var task = tasks.shift();
        gulp.run(task, function () {
            // Recursive call with the remaining tasks
            runSynchronized(tasks, deferred);
        });
    }
    // All tasks are done, resolve the promise
    else {
        deferred.resolve();
    }

    // Return the promise
    return deferred.promise;
};


gulp.task('default', ['babelify'], function () {
    exec('node build/client/app.js', function (err, stdout, stderr) {
        //console.log(stdout);
        //console.log(stderr);
        //cb(err);
    });
});

gulp.task('test', function () {
    return gulp.src('build/test/**/*.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'nyan'
        }));
});

gulp.task('babelify', function () {
    return gulp.src('client/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build/client'));
});

gulp.task('babelify-test', function () {
    return gulp.src('test/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build/test'));
});

gulp.task('watch', function () {
    watch("test/**/*.js", function () {
        return runSynchronized(['babelify-test', 'test']);
    });
});