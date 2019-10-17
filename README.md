# PostCSS Proportional Spacing [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

Create vertical and horizontal proportional spacing using ratios.

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

When a ratio is used the value is calculated by multiplying against the adjacent sides. The respective top and right sides are checked first, and if no value is set then the respective bottom and left sides are checked.

Please let me know if you think this is not useful or if you have another suggestion as there may be a better way to manage the logic behind this that I haven't thought of.

## Using with variables

You may consider using it with sass variables or custom values.

### SASS Variables

https://github.com/jonathantneal/postcss-advanced-variables

```scss
$ratio-octave: 0.5;

.button {
  padding: 40px $ratio-octave;
}
```

### Custom Values

https://github.com/mindthetic/postcss-custom-values

```css
@value OCTAVE property(padding) {
  value: 1.5;
}

.button {
  padding: 40px OCTAVE;
}
```

## Setup

Add to your project:

```bash
npm install postcss-proportional-spacing --save-dev
```

[cli-img]: https://img.shields.io/travis/limitlessloop/postcss-proportional-spacing.svg
[cli-url]: https://travis-ci.org/limitlessloop/postcss-proportional-spacing
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-proportional-spacing.svg
[npm-url]: https://www.npmjs.com/package/postcss-proportional-spacing
[postcss]: https://github.com/postcss/postcss
[postcss proportional spacing]: https://github.com/mindthetic/postcss-proportional-spacing
