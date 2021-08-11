[![npm][npm]][npm-url]
[![node][node]][node-url]

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Simple Universal Style Loader</h1>
</div>

Adds CSS to the DOM by injecting a `<style>` tag

## Install

```
npm install simple-universal-style-loader --save-dev
```

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/)

### Webpack Configuration

`simple-universal-style-loader` is a drop-in replacement for the usual `style-loader`.

It's recommended to combine it with the [`css-loader`](https://github.com/webpack/css-loader).

Example for Webpack 5 with CSS module support:

```js
  module: {
    rules: [ {
      test: /\.css$/,
      use: [ {
        loader: "simple-universal-style-loader",
        options: { singleton: true }
      }, {
        loader: "css-loader",
        options: {
          modules: { localIdentName: "[name]--[local]--[hash:base64:8]" },
          sourceMap: true,
          importLoaders: 1
        }
      } ]
    } ]
  },
```

Then, in your JS code:

```js
import css from './file.css';
```

This will add rules in file.css to the document.

### Server environment

On server side we can't load styles into the DOM but to collect them and use when assembling the layout.

Use `getStyles()` to get captured styles in the form of a `<style>` element ready to be added into `<head>`.

Use this piece of code somewhere in your server-side bundle:

```js
import universal from 'simple-universal-style-loader/universal';

const html = universal.getStyles();
```

### Options

#### `insertAt`

By default, the loader appends `<style>` elements to the end of the style target, which is the
`<head>` tag of the page unless specified by `insertInto`. This will cause CSS created by the loader
to take priority over CSS already present in the target. To insert style elements at the beginning
of the target, set this query parameter to `top`.

#### `insertInto`

By default, the loader inserts the `<style>` elements into the `<head>` tag of the page. If you
want the tags to be inserted somewhere else, e.g. into a [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot),
you can specify a CSS selector for that element here, e.g. `options: { insertInto: "#host::shadow>#root" }`.

#### `singleton`

If defined, the loader will re-use a single `<style>` element, instead of adding/removing individual
elements for each required module. This option is ON by default. To disable it, set `options: { singleton: false }`.

#### `convertToAbsoluteUrls`

If convertToAbsoluteUrls and sourceMaps are both enabled, relative urls will be converted to absolute
urls right before the css is injected into the page. This resolves [an issue](https://github.com/webpack/style-loader/pull/96)
where relative resources fail to load when source maps are enabled.

#### `attrs`

If defined, style-loader will attach given attributes with their values on each `<style>` / `<link>` element.

**Note** about source maps support and assets referenced with `url`: when style loader is used with ?sourceMap
option, the CSS modules will be generated as `Blob`s, so relative paths don't work (they would be relative to
`chrome:blob` or `chrome:devtools`). In order for assets to maintain correct paths setting `output.publicPath`
property of webpack configuration must be set, so that absolute paths are generated. Alternatively you can
enable the `convertToAbsoluteUrls` option mentioned above.

## Contributing

Don't hesitate to create a pull request. Every contribution is appreciated. In development you can start the
tests by calling `npm test`.

## Maintainer

Vitaliy Filippov https://github.com/vitalif

Also contains code authored by:
- Terence Chow https://github.com/terencechow
- Istvan Jano https://github.com/janoist1
- Tobias Koppers https://github.com/sokra
- Kees Kluskens https://github.com/SpaceK33z

## LICENSE

MIT

[npm]: https://img.shields.io/npm/v/simple-universal-style-loader.svg
[npm-url]: https://npmjs.com/package/simple-universal-style-loader

[node]: https://img.shields.io/node/v/simple-universal-style-loader.svg
[node-url]: https://nodejs.org
