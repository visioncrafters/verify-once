# VerifyOnce

[![Downloads](https://img.shields.io/npm/dm/verify-once.svg)](http://npm-stat.com/charts.html?package=verify-once)

[![Version](https://img.shields.io/npm/v/verify-once.svg)](http://npm.im/verify-once)

[![License](https://img.shields.io/npm/l/verify-once.svg)](http://opensource.org/licenses/MIT)

**VerifyOnce verification service integration library and example.**

Provides helpers for simple VerifyOnce service integration and example how to use it.

- Works with express server.
- Written in TypeScript, no need for extra typings.

## Installation

This package is distributed via npm

```cmd
npm install verify-once
```

```cmd
yarn add verify-once
```

## Usage

Credentials should be stored in projects config file.
BaseUrl is optional param, for testing use dev or test prefix, defaults to https://app.verifyonce.com/api/verify

```JSON
...

"verifyOnce": {
   "password": "integratorPassword",
   "username": "integratorUserName",
   "baseUrl":  "https://test-app.verifyonce.com/api/verify"
  },

...
```

Initiating Verify Once transaction

```TSX
import { VerifyOnce } from "verify-once";

...

// all optional, are used for autofill
const userData : InitiateRequest = {
	country: CountryCode.BLR,
	firstName: "John",
	lastName: "Wick",
	email: "john@wick.com",
}

// initiate verification
const verifyOnce = new VerifyOnce(config.verifyOnce);

// passing userData object is optional
const verifyOnceInitiateResponse : InitiateResponse = await verifyOnce.initiate(userData);

...
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

```

```
