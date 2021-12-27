# Stock Monitor Service

> Monitor and analysis data stock on many stock boards

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![MIT License][license-shield]][license-url]

One to two paragraph statement about your product and what it does.

![](https://github.com/othneildrew/Best-README-Template/raw/master/images/logo.png)

<!-- GETTING STARTED -->

## Installing / Getting started

- You must be a member and added ssh key of workspace on bitbucket/gitlab. Clone the repo

```sh
git clone git@bitbucket.org:kompa_dev/stock-monitor-service.git
```

## Development setup

### Built With

- "winston": "^3.2.1"

- ...

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- NodeJS v14.4.x

### Setting up

Follow all step bellow to setup your dev environment

1. Setup as `Installing / Getting started`

2. Setup environment variables.
   Create environment config file

```sh
cp .env.example .env
```

3. Install NPM packages

```sh
yarn install
```

4. Run development:

```sh
yarn dev
```

### Building

Test your code before build.

```shell
$ yarn test:coverage
```

Run build command

```shell
$ yarn build
```

### Deploying / Publishing

Push your code to your branch with format `[__YOUR_USERNAME__]/[__FEATURE__]`

```shell
$ git add .
$ git commit -m "__COMMIT_MESSAGE__"
$ git push origin [__YOUR_USERNAME__]/[__FEATURE__]
```

Then go to repository server and make a pull request to branch `development`.

**IMPORTANT**: Don't push anything to `master` by yourself. A CI tool will run all step and merge to `master` for you.

## Production setup

- Install dependencies in production

```sh
yarn install --production=true
```

## Configuration

On `.env`, you must config all environment variables bellow. By default, `.env.example` is used default config for all service.

```

# Mongo
MONGO_DEFAULT_HOST=127.0.0.1
MONGO_DEFAULT_PORT=27017
MONGO_DEFAULT_DB_NAME=stock-monitor-db
MONGO_COLLECTION_PREFIX=col
MONGO_DEFAULT_USER=
MONGO_DEFAULT_PASS=

# Redis
REDIS_DEFAULT_HOST=127.0.0.1
REDIS_DEFAULT_PORT=6379
REDIS_DEFAULT_DB_NAME=1

# Stock table
STOCK_ENDPOINT=https://trade.vndirect.com.vn/chung-khoan
STOCK_PATH_HOSE=hose
STOCK_PATH_HNX=hnx
STOCK_PATH_UPCOM=upcom
STOCK_PATH_FUTURE=phai-sinh
STOCK_PATH_VN30=vn30
STOCK_PATH_HNX30=hnx30

```

## Tests

The test library is [Jest](https://github.com/facebook/jest).

- All test files must be located on `__tests__` and naming by format `[name].spec.js`

- The folders/files on `__tests__` must be as same as on `src` folder.

Just test

```sh
 yarn test
```

Test a file

```sh
 yarn test path/to/test/file
```

Test with coverage information

```sh
 yarn test:coverage
```

## Versioning

- [Current] `beta`: All code is on `master`

- v1.0.0

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Licensing

Kompa Team – [@DEV](dev@kompa.ai) – dev@kompa.ai

Private License.

All Rights Reserved

- Unauthorized copying of this file, via any medium is strictly prohibited
- Proprietary and confidential

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
