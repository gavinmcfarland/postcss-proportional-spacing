# PostCSS Proportional Spacing [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

Apply proportional horizontal and vertical spacing with ratios using a unitless quantity.

```css
.example {
  padding: 80px 0.5;
  margin-right: 80px;
  margin-bottom: 2;
}
```

Outputs:

```css
.example {
  padding: 80px 40px;
  margin-right: 80px;
  margin-bottom: 160px;
}
```

When a ratio is used the value is calculated by multiplying the the adjacent sides. The respected top and right sides are checked first, and if not set then the respective bottom and right sides are checked.

Please let me know if you find this is not useful or if you have another suggestion as there may be a better way to manage the logic behind this that I haven't thought of.

## Setup

Add to your project:

```bash
npm install postcss-proportional-spacing --save-dev
```

[cli-img]: https://img.shields.io/travis/mindthetic/postcss-proportional-spacing.svg
[cli-url]: https://travis-ci.org/mindthetic/postcss-proportional-spacing
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-proportional-spacing.svg
[npm-url]: https://www.npmjs.com/package/postcss-proportional-spacing
[postcss]: https://github.com/postcss/postcss
[postcss proportional spacing]: https://github.com/mindthetic/postcss-proportional-spacing
