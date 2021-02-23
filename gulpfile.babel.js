import gulp from 'gulp'
import { parallel } from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import server from 'gulp-server-io'
import log from 'fancy-log'
import fs from 'fs'
import he from 'he'
import path from 'path'
import mjml2html from 'mjml'
import { registerComponent } from 'mjml-core'

const arg = (argList => {

  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {

    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {

      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;

    }
    else {

      // argument name
      curOpt = opt;
      arg[curOpt] = true;

    }

  }

  return arg;

})(process.argv);


const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file))
  })
  return filelist
}

const watchedComponents = walkSync('./src/components')

const compile = (cb) => {
  return gulp
    .src('src/components/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      }),
    )
    .on('error', log)
    .pipe(gulp.dest('lib'))
    .on('end', () => {
      watchedComponents.forEach((compPath) => {
        const fullPath = path.join(process.cwd(), compPath.replace(/^src\\components/, 'lib'))
        delete require.cache[fullPath]
        const component = require(fullPath).default
        registerComponent(component)
      })
      fs.readFile(path.normalize('./src/index.mjml'), 'utf8', (err, data) => {
        if (err) throw err
        const result = mjml2html(data, {
          keepComments: false,
          beautify: true,
          filePath: './src',
          juicePreserveTags: { designerVars: { start: '<<', end: '>>' } },
        })
        fs.writeFileSync(path.normalize('./dist/index.html'), he.encode(result.html, {
          allowUnsafeSymbols: true
        }))
        fs.writeFileSync(path.normalize('./dist/index.notencoded.html'), result.html)
      })
    })
}

const mjml = () => {

}

gulp.task('serve', () => {
  return gulp.src('./dist').pipe(
    server({
      webroot: path.join(__dirname, 'dist'),
      port: 8081,
      debugger: false,
      indexes: ['index.html'],
    }),
  )
})
gulp.task('dev', () => {
  return gulp.src('./dev').pipe(
    server({
      webroot: path.join(__dirname, 'dev'),
      port: 8080,
      indexes: ['index.html'],
      debugger: false
    }),
  )
})

gulp.task('watch', () => {
  compile()
  return watch(['src/components/**/*.js','src/**/*.mjml','src/index.mjml'], compile)
})
gulp.task('mjml', () => {
  mjml()
  return watch(['src/**/*.mjml','src/index.mjml'], )
})
gulp.task('default', parallel(['watch','serve']))
