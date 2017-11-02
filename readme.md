# Godfather

[![Build Status](https://travis-ci.org/crsten/godfather.svg?branch=master&style=flat-square)](https://travis-ci.org/crsten/godfather)
[![npm](https://img.shields.io/npm/dt/godfather.svg?style=flat-square)](https://www.npmjs.com/package/godfather)
[![npm](https://img.shields.io/npm/v/godfather.svg?style=flat-square)](https://www.npmjs.com/package/godfather)

> A man who doesn't spend time with his customers can never be a real man.

Simple vanilla plugin to create good & beautiful onscreen-guides.

## Demo

[Check out a simple demo](https://crsten.github.io/godfather/)

## Installation

`npm install godfather`

## API

| Function | Description |
| ---- | ---- |
| register(id, target, options) -> check "Parameters" for more info | Register a new guide entry |
| unregister(id) | Unregister a guide entry |
| show(id) | Show a guide |
| hide(id) | Hide a guide |
| setDefault(options) | Change the default options |

## Parameters

### id

| Type | Description |
| ---- | ----- |
| String | Set an unique id for identification |

### target

Guides can be attached to DOM elements

| Type | Description |
| ---- | ----- |
| String | Selector |
| Object | DOM-Element |

### options

This plugin can be customized, the following options are enabled:

| Key | Type | Description | Default |
| ---- | ---- | ---- | ---- |
| title | String | The displayed title | null |
| content | String | The displayed content | null |
| image | String | The displayed image | null |
| hint | Boolean | Adds a small hint to the target | false |
| scrollIntoView | Boolean | Scrolls the guide into view | true |
| next | String | id of the next guide to show | null |
| theme | Object | ... | ... |
| └-- background | String | Hex or rgb background | "#222" |
| └-- color | String | Hex or rgb text color | "white" |
| labels | Object | ... | ... |
| └-- prev | String | label for prev button | "<" |
| └-- next | String | label for next button | ">" |
| └-- close | String | label for close button | "✕" |

## Example

```js

  Godfather.register('don', '.sample-selector', {
    title: 'Don Vito Corleone',
    content: 'I\'m gonna make him an offer he can\'t refuse',
    image: 'don-vito-corleone.png',
    hint: true,
    next: 'michael'
  });

  Godfather.show('don');

```

## Development & Testing

`npm run dev` starts webpack with watch mode.

## License

[The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) Carsten Jacobsen
