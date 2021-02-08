import gulp from 'gulp'
import { parallel } from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import server from 'gulp-server-io'
import log from 'fancy-log'
import fs from 'fs'
import path from 'path'
import mjml2html from 'mjml'
import { registerComponent } from 'mjml-core'

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
        registerComponent(require(fullPath).default)
      })

      fs.readFile(path.normalize('./src/index.mjml'), 'utf8', (err, data) => {
        if (err) throw err
        const result = mjml2html(data, {
          keepComments: false,
          beautify: true,
          filePath: './src',
          juicePreserveTags: { designerVars: { start: '<<', end: '>>' } },
        })
        fs.writeFileSync(path.normalize('./dist/index.html'), result.html)
      })
    })
}

gulp.task('serve', () => {
  return gulp.src('./dist').pipe(
    server({
      webroot: path.join(__dirname, 'dist'),
      port: 80,
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
  return watch(['src/components/**/*.js', 'src/**/*.mjml','src/index.mjml'], compile)
})
gulp.task('default', parallel(['watch','serve']))
