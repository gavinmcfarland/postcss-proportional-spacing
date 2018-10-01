# Installing PostCSS Proportional Spacing

[PostCSS Proportional Spacing] runs in all Node environments, with special instructions for:

| [Node](#node) | [PostCSS CLI](#postcss-cli) | [Webpack](#webpack) | [Create React App](#create-react-app) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- | --- |

## Node

Add [PostCSS Proportional Spacing] to your project:

```bash
npm install postcss-proportional-spacing --save-dev
```

Use [PostCSS Proportional Spacing] to process your CSS:

```js
const postcssProportionalSpacing = require('postcss-proportional-spacing');

postcssProportionalSpacing.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssProportionalSpacing = require('postcss-proportional-spacing');

postcss([
  postcssProportionalSpacing(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

## PostCSS CLI

Add [PostCSS CLI] to your project:

```bash
npm install postcss-cli --save-dev
```

Use [PostCSS Proportional Spacing] in your `postcss.config.js` configuration file:

```js
const postcssProportionalSpacing = require('postcss-proportional-spacing');

module.exports = {
  plugins: [
    postcssProportionalSpacing(/* pluginOptions */)
  ]
}
```

## Webpack

Add [PostCSS Loader] to your project:

```bash
npm install postcss-loader --save-dev
```

Use [PostCSS Proportional Spacing] in your Webpack configuration:

```js
const postcssProportionalSpacing = require('postcss-proportional-spacing');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              postcssProportionalSpacing(/* pluginOptions */)
            ]
          } }
        ]
      }
    ]
  }
}
```

## Create React App

Add [React App Rewired] and [React App Rewire PostCSS] to your project:

```bash
npm install react-app-rewired react-app-rewire-postcss --save-dev
```

Use [React App Rewire PostCSS] and [PostCSS Proportional Spacing] in your
`config-overrides.js` file:

```js
const reactAppRewirePostcss = require('react-app-rewire-postcss');
const postcssProportionalSpacing = require('postcss-proportional-spacing');

module.exports = config => reactAppRewirePostcss(config, {
  plugins: () => [
    postcssProportionalSpacing(/* pluginOptions */)
  ]
});
```

## Gulp

Add [Gulp PostCSS] to your project:

```bash
npm install gulp-postcss --save-dev
```

Use [PostCSS Proportional Spacing] in your Gulpfile:

```js
const postcss = require('gulp-postcss');
const postcssProportionalSpacing = require('postcss-proportional-spacing');

gulp.task('css', () => gulp.src('./src/*.css').pipe(
  postcss([
    postcssProportionalSpacing(/* pluginOptions */)
  ])
).pipe(
  gulp.dest('.')
));
```

## Grunt

Add [Grunt PostCSS] to your project:

```bash
npm install grunt-postcss --save-dev
```

Use [PostCSS Proportional Spacing] in your Gruntfile:

```js
const postcssProportionalSpacing = require('postcss-proportional-spacing');

grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
       postcssProportionalSpacing(/* pluginOptions */)
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS CLI]: https://github.com/postcss/postcss-cli
[PostCSS Loader]: https://github.com/postcss/postcss-loader
[PostCSS Proportional Spacing]: https://github.com/mindthetic/postcss-proportional-spacing
[React App Rewire PostCSS]: https://github.com/csstools/react-app-rewire-postcss
[React App Rewired]: https://github.com/timarney/react-app-rewired
