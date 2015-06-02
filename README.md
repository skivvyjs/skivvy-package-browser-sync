# Skivvy package: `serve`
[![npm version](https://img.shields.io/npm/v/@skivvy/skivvy-package-serve.svg)](https://www.npmjs.com/package/@skivvy/skivvy-package-serve)
![Stability](https://img.shields.io/badge/stability-stable-brightgreen.svg)
[![Build Status](https://travis-ci.org/skivvyjs/skivvy-package-serve.svg?branch=master)](https://travis-ci.org/skivvyjs/skivvy-package-serve)

> Serve files using Browsersync


## Installation

```bash
skivvy install serve
```


## Overview

This package allows you to serve files using [Browsersync](http://www.browsersync.io/) from within the [Skivvy](https://www.npmjs.com/package/skivvy) task runner.


## Included tasks

### `serve`

Serve files using Browsersync

#### Usage:

```bash
skivvy run serve
```


#### Configuration settings:

See the Browsersync API [config options](http://www.browsersync.io/docs/options/)


#### Returns:

`Promise<BrowserSync>` Browsersync instance, returned from [browserSync.create()](http://www.browsersync.io/docs/api/#api-create])
