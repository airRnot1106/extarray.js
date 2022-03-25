# Extarray.js

<div align="center">
    <img src="./image/header.png" alt="logo" width="80%" height="80%">
</div>

---

[![Build Status](https://app.travis-ci.com/airRnot1106/extarray.js.svg?branch=main)](https://app.travis-ci.com/airRnot1106/extarray.js) ![npm (tag)](https://img.shields.io/npm/v/extarray/latest) [![Test Coverage](https://api.codeclimate.com/v1/badges/2fb1a7f9f15d83867090/test_coverage)](https://codeclimate.com/github/airRnot1106/extarray.js/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/2fb1a7f9f15d83867090/maintainability)](https://codeclimate.com/github/airRnot1106/extarray.js/maintainability) [![npm](https://img.shields.io/badge/-Npm-CB3837.svg?logo=npm&style=popout)](https://www.npmjs.com/package/extarray) ![Typescript](https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript&style=popout) [![GitHub license](https://img.shields.io/github/license/airRnot1106/extarray.js)](https://github.com/airRnot1106/extarray.js/blob/main/LICENSE)

## Highlight

-   Useful features not found in Array

-   Covers existing Array functions

-   Supports Typescript

## Install

```shell
npm install extarray
```

## Usage

```js
//cjs
const { Extarray } = require('extarray');

//esm or ts
import { Extarray } from 'extarray';

//from constructor
const extarray = new Extarray(0, 1, 2, 3, 4);

//from existing array
const array = [0, 1, 2, 3, 4];
const extarray = Extarray.extend(array);

//shuffle
extarray.shuffle();
console.log(extarray); //<Extarray>[1, 3, 4, 0, 2]

//draw
console.log(extarray.draw()); // 3
console.log(extarray); //<Extarray>[0, 1, 2, 4]

//...more methods
```

## Document

For more information, please see [document](https://airrnot1106.github.io/extarray.js/)

## Issues

If you find a bug or problem, please open an issue!:bug:

## Author

-   Github: [airRnot1106](https://github.com/airRnot1106)
-   NPM: [airrnot1106](https://www.npmjs.com/~airrnot1106)
-   Twitter: [@airRnot1106](https://twitter.com/airRnot1106)

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](https://github.com/airRnot1106/extarray.js/blob/main/LICENSE) file for details.
