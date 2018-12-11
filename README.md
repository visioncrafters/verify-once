# VerifyOnce

[![Downloads](https://img.shields.io/npm/dm/verify-once.svg)](http://npm-stat.com/charts.html?package=verify-once)
[![Version](https://img.shields.io/npm/v/verify-once.svg)](http://npm.im/verify-once)
[![License](https://img.shields.io/npm/l/verify-once.svg)](http://opensource.org/licenses/MIT)

**VerifyOnce verification service integration library and example.**

Provides helpers for simple VerifyOnce service integration and example how to use it.

- Works with express server.
- Uses the [jumio](https://github.com/stagnationlab/jumio) package.
- Written in TypeScript, no need for extra typings.

## Installation

This package is distributed via npm

```cmd
npm install verify-once
```

```cmd
yarn add verify-once
```

## Example

The example is located in the `/example` directory.

Running the example

- Copy the example configuration file `_.env` to `.env`.
- Make changes in the `.env` as needed.
- Start the example by executing `yarn start` (`npm start` etc works as well).

## Commands

- `yarn start` to start the example application.
- `yarn build` to build the production version.
- `yarn lint` to lint the codebase.
- `yarn prettier` to run prettier.