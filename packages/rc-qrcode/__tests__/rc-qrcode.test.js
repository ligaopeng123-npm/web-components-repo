'use strict';

const rcQrcode = require('..');
const assert = require('assert').strict;

assert.strictEqual(rcQrcode(), 'Hello from rcQrcode');
console.info("rcQrcode tests passed");
