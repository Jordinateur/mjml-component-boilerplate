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
import mjml2json from 'mjml2json'
const fsPromises = fs.promises

const arg = (argList => {
  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');
    if (opt === thisOpt) {
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    }
    else {
      curOpt = opt;
      arg[curOpt] = true;
    }
  }
  return arg;
})(process.argv);


const replace = async (input, regex, replacer) => {
  let flags = (regex.flags || '').replace('g', '');
  let re = new RegExp(regex.source || regex, flags);
  let index = 0;
  let match;
  while ((match = re.exec(input.slice(index)))) {
    let value = await replacer(...match);
    index += match.index;
    input = input.slice(0, index) + value + input.slice(index + match[0].length);
    index += match[0].length;
    if (flags === regex.flags) {
      break;
    }
  }
  return input;
};

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
      fs.readFile(path.normalize('./src/index.mjml'), 'utf8', async (err, data) => {
        if (err) throw err
        const result = mjml2html(data, {
          keepComments: false,
          beautify: true,
          filePath: './src',
          juicePreserveTags: { designerVars: { start: '<<', end: '>>' } },
        })
        fs.writeFileSync(path.normalize('./dist/index.html'), he.encode(result.html, {
          allowUnsafeSymbols: true
        }).replace(/#(\w*)#/g,"<<$1>>"))
        /**
         * JSON
         */
        // const includeRegexp = /<mj-include\s+path=['"](.*[.mjml]?)['"]\s*(\/>|>\s*<\/mj-include>)/g
        // console.log(data);
       
        // data = await replace(data,includeRegexp, async (a,file) => {
        //   return await fsPromises.readFile(path.normalize('./src/' + file), 'utf8')
        // })
        // const json = mjml2json(data)
        // fs.writeFile(path.normalize('./dist/mail.json'), JSON.stringify(json), err => {
        //   if(err) throw err
        // })
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
