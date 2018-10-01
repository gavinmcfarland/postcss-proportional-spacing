# PostCSS Proportional Spacing [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Proportional Spacing] lets you do this in CSS.

```pcss
.example {}

/* becomes */

.example {}
```

## Usage

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

[PostCSS Proportional Spacing] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

[cli-img]: https://img.shields.io/travis/mindthetic/postcss-proportional-spacing.svg
[cli-url]: https://travis-ci.org/mindthetic/postcss-proportional-spacing
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-proportional-spacing.svg
[npm-url]: https://www.npmjs.com/package/postcss-proportional-spacing

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Proportional Spacing]: https://github.com/mindthetic/postcss-proportional-spacing
