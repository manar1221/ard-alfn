/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/assert/assert.js":
/*!***************************************!*\
  !*** ./node_modules/assert/assert.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var objectAssign = __webpack_require__(/*! object.assign/polyfill */ "./node_modules/object.assign/polyfill.js")();

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (__webpack_require__.g.Buffer && typeof __webpack_require__.g.Buffer.isBuffer === 'function') {
    return __webpack_require__.g.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(/*! util/ */ "./node_modules/assert/node_modules/util/util.js");
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof __webpack_require__.g.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};


/***/ }),

/***/ "./node_modules/assert/node_modules/inherits/inherits_browser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/assert/node_modules/inherits/inherits_browser.js ***!
  \***********************************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/assert/node_modules/util/support/isBufferBrowser.js":
/*!**************************************************************************!*\
  !*** ./node_modules/assert/node_modules/util/support/isBufferBrowser.js ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/assert/node_modules/util/util.js":
/*!*******************************************************!*\
  !*** ./node_modules/assert/node_modules/util/util.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(__webpack_require__.g.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/assert/node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/assert/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = __webpack_require__.g.TYPED_ARRAY_SUPPORT !== undefined
  ? __webpack_require__.g.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var setFunctionLength = __webpack_require__(/*! set-function-length */ "./node_modules/set-function-length/index.js");

var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");
var $max = GetIntrinsic('%Math.max%');

module.exports = function callBind(originalFunction) {
	if (typeof originalFunction !== 'function') {
		throw new $TypeError('a function is required');
	}
	var func = $reflectApply(bind, $call, arguments);
	return setFunctionLength(
		func,
		1 + $max(0, originalFunction.length - (arguments.length - 1)),
		true
	);
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/define-data-property/index.js":
/*!****************************************************!*\
  !*** ./node_modules/define-data-property/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var $SyntaxError = __webpack_require__(/*! es-errors/syntax */ "./node_modules/es-errors/syntax.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");

var gopd = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};


/***/ }),

/***/ "./node_modules/es-define-property/index.js":
/*!**************************************************!*\
  !*** ./node_modules/es-define-property/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

/** @type {import('.')} */
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true) || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;


/***/ }),

/***/ "./node_modules/es-errors/eval.js":
/*!****************************************!*\
  !*** ./node_modules/es-errors/eval.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./eval')} */
module.exports = EvalError;


/***/ }),

/***/ "./node_modules/es-errors/index.js":
/*!*****************************************!*\
  !*** ./node_modules/es-errors/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Error;


/***/ }),

/***/ "./node_modules/es-errors/range.js":
/*!*****************************************!*\
  !*** ./node_modules/es-errors/range.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./range')} */
module.exports = RangeError;


/***/ }),

/***/ "./node_modules/es-errors/ref.js":
/*!***************************************!*\
  !*** ./node_modules/es-errors/ref.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./ref')} */
module.exports = ReferenceError;


/***/ }),

/***/ "./node_modules/es-errors/syntax.js":
/*!******************************************!*\
  !*** ./node_modules/es-errors/syntax.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./syntax')} */
module.exports = SyntaxError;


/***/ }),

/***/ "./node_modules/es-errors/type.js":
/*!****************************************!*\
  !*** ./node_modules/es-errors/type.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./type')} */
module.exports = TypeError;


/***/ }),

/***/ "./node_modules/es-errors/uri.js":
/*!***************************************!*\
  !*** ./node_modules/es-errors/uri.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./uri')} */
module.exports = URIError;


/***/ }),

/***/ "./node_modules/esbuild/lib/main.d.ts":
/*!********************************************!*\
  !*** ./node_modules/esbuild/lib/main.d.ts ***!
  \********************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (1:7)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> export type Platform = 'browser' | 'node' | 'neutral'\n| export type Format = 'iife' | 'cjs' | 'esm'\n| export type Loader = 'base64' | 'binary' | 'copy' | 'css' | 'dataurl' | 'default' | 'empty' | 'file' | 'js' | 'json' | 'jsx' | 'local-css' | 'text' | 'ts' | 'tsx'");

/***/ }),

/***/ "./node_modules/esbuild/lib/main.js":
/*!******************************************!*\
  !*** ./node_modules/esbuild/lib/main.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
var __filename = "/index.js";
var __dirname = "/";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/npm/node.ts
var node_exports = {};
__export(node_exports, {
  analyzeMetafile: () => analyzeMetafile,
  analyzeMetafileSync: () => analyzeMetafileSync,
  build: () => build,
  buildSync: () => buildSync,
  context: () => context,
  default: () => node_default,
  formatMessages: () => formatMessages,
  formatMessagesSync: () => formatMessagesSync,
  initialize: () => initialize,
  stop: () => stop,
  transform: () => transform,
  transformSync: () => transformSync,
  version: () => version
});
module.exports = __toCommonJS(node_exports);

// lib/shared/stdio_protocol.ts
function encodePacket(packet) {
  let visit = (value) => {
    if (value === null) {
      bb.write8(0);
    } else if (typeof value === "boolean") {
      bb.write8(1);
      bb.write8(+value);
    } else if (typeof value === "number") {
      bb.write8(2);
      bb.write32(value | 0);
    } else if (typeof value === "string") {
      bb.write8(3);
      bb.write(encodeUTF8(value));
    } else if (value instanceof Uint8Array) {
      bb.write8(4);
      bb.write(value);
    } else if (value instanceof Array) {
      bb.write8(5);
      bb.write32(value.length);
      for (let item of value) {
        visit(item);
      }
    } else {
      let keys = Object.keys(value);
      bb.write8(6);
      bb.write32(keys.length);
      for (let key of keys) {
        bb.write(encodeUTF8(key));
        visit(value[key]);
      }
    }
  };
  let bb = new ByteBuffer();
  bb.write32(0);
  bb.write32(packet.id << 1 | +!packet.isRequest);
  visit(packet.value);
  writeUInt32LE(bb.buf, bb.len - 4, 0);
  return bb.buf.subarray(0, bb.len);
}
function decodePacket(bytes) {
  let visit = () => {
    switch (bb.read8()) {
      case 0:
        return null;
      case 1:
        return !!bb.read8();
      case 2:
        return bb.read32();
      case 3:
        return decodeUTF8(bb.read());
      case 4:
        return bb.read();
      case 5: {
        let count = bb.read32();
        let value2 = [];
        for (let i = 0; i < count; i++) {
          value2.push(visit());
        }
        return value2;
      }
      case 6: {
        let count = bb.read32();
        let value2 = {};
        for (let i = 0; i < count; i++) {
          value2[decodeUTF8(bb.read())] = visit();
        }
        return value2;
      }
      default:
        throw new Error("Invalid packet");
    }
  };
  let bb = new ByteBuffer(bytes);
  let id = bb.read32();
  let isRequest = (id & 1) === 0;
  id >>>= 1;
  let value = visit();
  if (bb.ptr !== bytes.length) {
    throw new Error("Invalid packet");
  }
  return { id, isRequest, value };
}
var ByteBuffer = class {
  constructor(buf = new Uint8Array(1024)) {
    this.buf = buf;
    this.len = 0;
    this.ptr = 0;
  }
  _write(delta) {
    if (this.len + delta > this.buf.length) {
      let clone = new Uint8Array((this.len + delta) * 2);
      clone.set(this.buf);
      this.buf = clone;
    }
    this.len += delta;
    return this.len - delta;
  }
  write8(value) {
    let offset = this._write(1);
    this.buf[offset] = value;
  }
  write32(value) {
    let offset = this._write(4);
    writeUInt32LE(this.buf, value, offset);
  }
  write(bytes) {
    let offset = this._write(4 + bytes.length);
    writeUInt32LE(this.buf, bytes.length, offset);
    this.buf.set(bytes, offset + 4);
  }
  _read(delta) {
    if (this.ptr + delta > this.buf.length) {
      throw new Error("Invalid packet");
    }
    this.ptr += delta;
    return this.ptr - delta;
  }
  read8() {
    return this.buf[this._read(1)];
  }
  read32() {
    return readUInt32LE(this.buf, this._read(4));
  }
  read() {
    let length = this.read32();
    let bytes = new Uint8Array(length);
    let ptr = this._read(bytes.length);
    bytes.set(this.buf.subarray(ptr, ptr + length));
    return bytes;
  }
};
var encodeUTF8;
var decodeUTF8;
var encodeInvariant;
if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
  let encoder = new TextEncoder();
  let decoder = new TextDecoder();
  encodeUTF8 = (text) => encoder.encode(text);
  decodeUTF8 = (bytes) => decoder.decode(bytes);
  encodeInvariant = 'new TextEncoder().encode("")';
} else if (typeof Buffer !== "undefined") {
  encodeUTF8 = (text) => Buffer.from(text);
  decodeUTF8 = (bytes) => {
    let { buffer, byteOffset, byteLength } = bytes;
    return Buffer.from(buffer, byteOffset, byteLength).toString();
  };
  encodeInvariant = 'Buffer.from("")';
} else {
  throw new Error("No UTF-8 codec found");
}
if (!(encodeUTF8("") instanceof Uint8Array))
  throw new Error(`Invariant violation: "${encodeInvariant} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
function readUInt32LE(buffer, offset) {
  return buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24;
}
function writeUInt32LE(buffer, value, offset) {
  buffer[offset++] = value;
  buffer[offset++] = value >> 8;
  buffer[offset++] = value >> 16;
  buffer[offset++] = value >> 24;
}

// lib/shared/common.ts
var quote = JSON.stringify;
var buildLogLevelDefault = "warning";
var transformLogLevelDefault = "silent";
function validateTarget(target) {
  validateStringValue(target, "target");
  if (target.indexOf(",") >= 0) throw new Error(`Invalid target: ${target}`);
  return target;
}
var canBeAnything = () => null;
var mustBeBoolean = (value) => typeof value === "boolean" ? null : "a boolean";
var mustBeString = (value) => typeof value === "string" ? null : "a string";
var mustBeRegExp = (value) => value instanceof RegExp ? null : "a RegExp object";
var mustBeInteger = (value) => typeof value === "number" && value === (value | 0) ? null : "an integer";
var mustBeFunction = (value) => typeof value === "function" ? null : "a function";
var mustBeArray = (value) => Array.isArray(value) ? null : "an array";
var mustBeObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object";
var mustBeEntryPoints = (value) => typeof value === "object" && value !== null ? null : "an array or an object";
var mustBeWebAssemblyModule = (value) => value instanceof WebAssembly.Module ? null : "a WebAssembly.Module";
var mustBeObjectOrNull = (value) => typeof value === "object" && !Array.isArray(value) ? null : "an object or null";
var mustBeStringOrBoolean = (value) => typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean";
var mustBeStringOrObject = (value) => typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object";
var mustBeStringOrArray = (value) => typeof value === "string" || Array.isArray(value) ? null : "a string or an array";
var mustBeStringOrUint8Array = (value) => typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array";
var mustBeStringOrURL = (value) => typeof value === "string" || value instanceof URL ? null : "a string or a URL";
function getFlag(object, keys, key, mustBeFn) {
  let value = object[key];
  keys[key + ""] = true;
  if (value === void 0) return void 0;
  let mustBe = mustBeFn(value);
  if (mustBe !== null) throw new Error(`${quote(key)} must be ${mustBe}`);
  return value;
}
function checkForInvalidFlags(object, keys, where) {
  for (let key in object) {
    if (!(key in keys)) {
      throw new Error(`Invalid option ${where}: ${quote(key)}`);
    }
  }
}
function validateInitializeOptions(options) {
  let keys = /* @__PURE__ */ Object.create(null);
  let wasmURL = getFlag(options, keys, "wasmURL", mustBeStringOrURL);
  let wasmModule = getFlag(options, keys, "wasmModule", mustBeWebAssemblyModule);
  let worker = getFlag(options, keys, "worker", mustBeBoolean);
  checkForInvalidFlags(options, keys, "in initialize() call");
  return {
    wasmURL,
    wasmModule,
    worker
  };
}
function validateMangleCache(mangleCache) {
  let validated;
  if (mangleCache !== void 0) {
    validated = /* @__PURE__ */ Object.create(null);
    for (let key in mangleCache) {
      let value = mangleCache[key];
      if (typeof value === "string" || value === false) {
        validated[key] = value;
      } else {
        throw new Error(`Expected ${quote(key)} in mangle cache to map to either a string or false`);
      }
    }
  }
  return validated;
}
function pushLogFlags(flags, options, keys, isTTY2, logLevelDefault) {
  let color = getFlag(options, keys, "color", mustBeBoolean);
  let logLevel = getFlag(options, keys, "logLevel", mustBeString);
  let logLimit = getFlag(options, keys, "logLimit", mustBeInteger);
  if (color !== void 0) flags.push(`--color=${color}`);
  else if (isTTY2) flags.push(`--color=true`);
  flags.push(`--log-level=${logLevel || logLevelDefault}`);
  flags.push(`--log-limit=${logLimit || 0}`);
}
function validateStringValue(value, what, key) {
  if (typeof value !== "string") {
    throw new Error(`Expected value for ${what}${key !== void 0 ? " " + quote(key) : ""} to be a string, got ${typeof value} instead`);
  }
  return value;
}
function pushCommonFlags(flags, options, keys) {
  let legalComments = getFlag(options, keys, "legalComments", mustBeString);
  let sourceRoot = getFlag(options, keys, "sourceRoot", mustBeString);
  let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
  let target = getFlag(options, keys, "target", mustBeStringOrArray);
  let format = getFlag(options, keys, "format", mustBeString);
  let globalName = getFlag(options, keys, "globalName", mustBeString);
  let mangleProps = getFlag(options, keys, "mangleProps", mustBeRegExp);
  let reserveProps = getFlag(options, keys, "reserveProps", mustBeRegExp);
  let mangleQuoted = getFlag(options, keys, "mangleQuoted", mustBeBoolean);
  let minify = getFlag(options, keys, "minify", mustBeBoolean);
  let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
  let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
  let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
  let lineLimit = getFlag(options, keys, "lineLimit", mustBeInteger);
  let drop = getFlag(options, keys, "drop", mustBeArray);
  let dropLabels = getFlag(options, keys, "dropLabels", mustBeArray);
  let charset = getFlag(options, keys, "charset", mustBeString);
  let treeShaking = getFlag(options, keys, "treeShaking", mustBeBoolean);
  let ignoreAnnotations = getFlag(options, keys, "ignoreAnnotations", mustBeBoolean);
  let jsx = getFlag(options, keys, "jsx", mustBeString);
  let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
  let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
  let jsxImportSource = getFlag(options, keys, "jsxImportSource", mustBeString);
  let jsxDev = getFlag(options, keys, "jsxDev", mustBeBoolean);
  let jsxSideEffects = getFlag(options, keys, "jsxSideEffects", mustBeBoolean);
  let define = getFlag(options, keys, "define", mustBeObject);
  let logOverride = getFlag(options, keys, "logOverride", mustBeObject);
  let supported = getFlag(options, keys, "supported", mustBeObject);
  let pure = getFlag(options, keys, "pure", mustBeArray);
  let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
  let platform = getFlag(options, keys, "platform", mustBeString);
  let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);
  if (legalComments) flags.push(`--legal-comments=${legalComments}`);
  if (sourceRoot !== void 0) flags.push(`--source-root=${sourceRoot}`);
  if (sourcesContent !== void 0) flags.push(`--sources-content=${sourcesContent}`);
  if (target) {
    if (Array.isArray(target)) flags.push(`--target=${Array.from(target).map(validateTarget).join(",")}`);
    else flags.push(`--target=${validateTarget(target)}`);
  }
  if (format) flags.push(`--format=${format}`);
  if (globalName) flags.push(`--global-name=${globalName}`);
  if (platform) flags.push(`--platform=${platform}`);
  if (tsconfigRaw) flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
  if (minify) flags.push("--minify");
  if (minifySyntax) flags.push("--minify-syntax");
  if (minifyWhitespace) flags.push("--minify-whitespace");
  if (minifyIdentifiers) flags.push("--minify-identifiers");
  if (lineLimit) flags.push(`--line-limit=${lineLimit}`);
  if (charset) flags.push(`--charset=${charset}`);
  if (treeShaking !== void 0) flags.push(`--tree-shaking=${treeShaking}`);
  if (ignoreAnnotations) flags.push(`--ignore-annotations`);
  if (drop) for (let what of drop) flags.push(`--drop:${validateStringValue(what, "drop")}`);
  if (dropLabels) flags.push(`--drop-labels=${Array.from(dropLabels).map((what) => validateStringValue(what, "dropLabels")).join(",")}`);
  if (mangleProps) flags.push(`--mangle-props=${mangleProps.source}`);
  if (reserveProps) flags.push(`--reserve-props=${reserveProps.source}`);
  if (mangleQuoted !== void 0) flags.push(`--mangle-quoted=${mangleQuoted}`);
  if (jsx) flags.push(`--jsx=${jsx}`);
  if (jsxFactory) flags.push(`--jsx-factory=${jsxFactory}`);
  if (jsxFragment) flags.push(`--jsx-fragment=${jsxFragment}`);
  if (jsxImportSource) flags.push(`--jsx-import-source=${jsxImportSource}`);
  if (jsxDev) flags.push(`--jsx-dev`);
  if (jsxSideEffects) flags.push(`--jsx-side-effects`);
  if (define) {
    for (let key in define) {
      if (key.indexOf("=") >= 0) throw new Error(`Invalid define: ${key}`);
      flags.push(`--define:${key}=${validateStringValue(define[key], "define", key)}`);
    }
  }
  if (logOverride) {
    for (let key in logOverride) {
      if (key.indexOf("=") >= 0) throw new Error(`Invalid log override: ${key}`);
      flags.push(`--log-override:${key}=${validateStringValue(logOverride[key], "log override", key)}`);
    }
  }
  if (supported) {
    for (let key in supported) {
      if (key.indexOf("=") >= 0) throw new Error(`Invalid supported: ${key}`);
      const value = supported[key];
      if (typeof value !== "boolean") throw new Error(`Expected value for supported ${quote(key)} to be a boolean, got ${typeof value} instead`);
      flags.push(`--supported:${key}=${value}`);
    }
  }
  if (pure) for (let fn of pure) flags.push(`--pure:${validateStringValue(fn, "pure")}`);
  if (keepNames) flags.push(`--keep-names`);
}
function flagsForBuildOptions(callName, options, isTTY2, logLevelDefault, writeDefault) {
  var _a2;
  let flags = [];
  let entries = [];
  let keys = /* @__PURE__ */ Object.create(null);
  let stdinContents = null;
  let stdinResolveDir = null;
  pushLogFlags(flags, options, keys, isTTY2, logLevelDefault);
  pushCommonFlags(flags, options, keys);
  let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
  let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
  let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
  let preserveSymlinks = getFlag(options, keys, "preserveSymlinks", mustBeBoolean);
  let metafile = getFlag(options, keys, "metafile", mustBeBoolean);
  let outfile = getFlag(options, keys, "outfile", mustBeString);
  let outdir = getFlag(options, keys, "outdir", mustBeString);
  let outbase = getFlag(options, keys, "outbase", mustBeString);
  let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
  let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArray);
  let nodePathsInput = getFlag(options, keys, "nodePaths", mustBeArray);
  let mainFields = getFlag(options, keys, "mainFields", mustBeArray);
  let conditions = getFlag(options, keys, "conditions", mustBeArray);
  let external = getFlag(options, keys, "external", mustBeArray);
  let packages = getFlag(options, keys, "packages", mustBeString);
  let alias = getFlag(options, keys, "alias", mustBeObject);
  let loader = getFlag(options, keys, "loader", mustBeObject);
  let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
  let publicPath = getFlag(options, keys, "publicPath", mustBeString);
  let entryNames = getFlag(options, keys, "entryNames", mustBeString);
  let chunkNames = getFlag(options, keys, "chunkNames", mustBeString);
  let assetNames = getFlag(options, keys, "assetNames", mustBeString);
  let inject = getFlag(options, keys, "inject", mustBeArray);
  let banner = getFlag(options, keys, "banner", mustBeObject);
  let footer = getFlag(options, keys, "footer", mustBeObject);
  let entryPoints = getFlag(options, keys, "entryPoints", mustBeEntryPoints);
  let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
  let stdin = getFlag(options, keys, "stdin", mustBeObject);
  let write = (_a2 = getFlag(options, keys, "write", mustBeBoolean)) != null ? _a2 : writeDefault;
  let allowOverwrite = getFlag(options, keys, "allowOverwrite", mustBeBoolean);
  let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
  keys.plugins = true;
  checkForInvalidFlags(options, keys, `in ${callName}() call`);
  if (sourcemap) flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
  if (bundle) flags.push("--bundle");
  if (allowOverwrite) flags.push("--allow-overwrite");
  if (splitting) flags.push("--splitting");
  if (preserveSymlinks) flags.push("--preserve-symlinks");
  if (metafile) flags.push(`--metafile`);
  if (outfile) flags.push(`--outfile=${outfile}`);
  if (outdir) flags.push(`--outdir=${outdir}`);
  if (outbase) flags.push(`--outbase=${outbase}`);
  if (tsconfig) flags.push(`--tsconfig=${tsconfig}`);
  if (packages) flags.push(`--packages=${packages}`);
  if (resolveExtensions) {
    let values = [];
    for (let value of resolveExtensions) {
      validateStringValue(value, "resolve extension");
      if (value.indexOf(",") >= 0) throw new Error(`Invalid resolve extension: ${value}`);
      values.push(value);
    }
    flags.push(`--resolve-extensions=${values.join(",")}`);
  }
  if (publicPath) flags.push(`--public-path=${publicPath}`);
  if (entryNames) flags.push(`--entry-names=${entryNames}`);
  if (chunkNames) flags.push(`--chunk-names=${chunkNames}`);
  if (assetNames) flags.push(`--asset-names=${assetNames}`);
  if (mainFields) {
    let values = [];
    for (let value of mainFields) {
      validateStringValue(value, "main field");
      if (value.indexOf(",") >= 0) throw new Error(`Invalid main field: ${value}`);
      values.push(value);
    }
    flags.push(`--main-fields=${values.join(",")}`);
  }
  if (conditions) {
    let values = [];
    for (let value of conditions) {
      validateStringValue(value, "condition");
      if (value.indexOf(",") >= 0) throw new Error(`Invalid condition: ${value}`);
      values.push(value);
    }
    flags.push(`--conditions=${values.join(",")}`);
  }
  if (external) for (let name of external) flags.push(`--external:${validateStringValue(name, "external")}`);
  if (alias) {
    for (let old in alias) {
      if (old.indexOf("=") >= 0) throw new Error(`Invalid package name in alias: ${old}`);
      flags.push(`--alias:${old}=${validateStringValue(alias[old], "alias", old)}`);
    }
  }
  if (banner) {
    for (let type in banner) {
      if (type.indexOf("=") >= 0) throw new Error(`Invalid banner file type: ${type}`);
      flags.push(`--banner:${type}=${validateStringValue(banner[type], "banner", type)}`);
    }
  }
  if (footer) {
    for (let type in footer) {
      if (type.indexOf("=") >= 0) throw new Error(`Invalid footer file type: ${type}`);
      flags.push(`--footer:${type}=${validateStringValue(footer[type], "footer", type)}`);
    }
  }
  if (inject) for (let path3 of inject) flags.push(`--inject:${validateStringValue(path3, "inject")}`);
  if (loader) {
    for (let ext in loader) {
      if (ext.indexOf("=") >= 0) throw new Error(`Invalid loader extension: ${ext}`);
      flags.push(`--loader:${ext}=${validateStringValue(loader[ext], "loader", ext)}`);
    }
  }
  if (outExtension) {
    for (let ext in outExtension) {
      if (ext.indexOf("=") >= 0) throw new Error(`Invalid out extension: ${ext}`);
      flags.push(`--out-extension:${ext}=${validateStringValue(outExtension[ext], "out extension", ext)}`);
    }
  }
  if (entryPoints) {
    if (Array.isArray(entryPoints)) {
      for (let i = 0, n = entryPoints.length; i < n; i++) {
        let entryPoint = entryPoints[i];
        if (typeof entryPoint === "object" && entryPoint !== null) {
          let entryPointKeys = /* @__PURE__ */ Object.create(null);
          let input = getFlag(entryPoint, entryPointKeys, "in", mustBeString);
          let output = getFlag(entryPoint, entryPointKeys, "out", mustBeString);
          checkForInvalidFlags(entryPoint, entryPointKeys, "in entry point at index " + i);
          if (input === void 0) throw new Error('Missing property "in" for entry point at index ' + i);
          if (output === void 0) throw new Error('Missing property "out" for entry point at index ' + i);
          entries.push([output, input]);
        } else {
          entries.push(["", validateStringValue(entryPoint, "entry point at index " + i)]);
        }
      }
    } else {
      for (let key in entryPoints) {
        entries.push([key, validateStringValue(entryPoints[key], "entry point", key)]);
      }
    }
  }
  if (stdin) {
    let stdinKeys = /* @__PURE__ */ Object.create(null);
    let contents = getFlag(stdin, stdinKeys, "contents", mustBeStringOrUint8Array);
    let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
    let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
    let loader2 = getFlag(stdin, stdinKeys, "loader", mustBeString);
    checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');
    if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
    if (loader2) flags.push(`--loader=${loader2}`);
    if (resolveDir) stdinResolveDir = resolveDir;
    if (typeof contents === "string") stdinContents = encodeUTF8(contents);
    else if (contents instanceof Uint8Array) stdinContents = contents;
  }
  let nodePaths = [];
  if (nodePathsInput) {
    for (let value of nodePathsInput) {
      value += "";
      nodePaths.push(value);
    }
  }
  return {
    entries,
    flags,
    write,
    stdinContents,
    stdinResolveDir,
    absWorkingDir,
    nodePaths,
    mangleCache: validateMangleCache(mangleCache)
  };
}
function flagsForTransformOptions(callName, options, isTTY2, logLevelDefault) {
  let flags = [];
  let keys = /* @__PURE__ */ Object.create(null);
  pushLogFlags(flags, options, keys, isTTY2, logLevelDefault);
  pushCommonFlags(flags, options, keys);
  let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
  let sourcefile = getFlag(options, keys, "sourcefile", mustBeString);
  let loader = getFlag(options, keys, "loader", mustBeString);
  let banner = getFlag(options, keys, "banner", mustBeString);
  let footer = getFlag(options, keys, "footer", mustBeString);
  let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
  checkForInvalidFlags(options, keys, `in ${callName}() call`);
  if (sourcemap) flags.push(`--sourcemap=${sourcemap === true ? "external" : sourcemap}`);
  if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
  if (loader) flags.push(`--loader=${loader}`);
  if (banner) flags.push(`--banner=${banner}`);
  if (footer) flags.push(`--footer=${footer}`);
  return {
    flags,
    mangleCache: validateMangleCache(mangleCache)
  };
}
function createChannel(streamIn) {
  const requestCallbacksByKey = {};
  const closeData = { didClose: false, reason: "" };
  let responseCallbacks = {};
  let nextRequestID = 0;
  let nextBuildKey = 0;
  let stdout = new Uint8Array(16 * 1024);
  let stdoutUsed = 0;
  let readFromStdout = (chunk) => {
    let limit = stdoutUsed + chunk.length;
    if (limit > stdout.length) {
      let swap = new Uint8Array(limit * 2);
      swap.set(stdout);
      stdout = swap;
    }
    stdout.set(chunk, stdoutUsed);
    stdoutUsed += chunk.length;
    let offset = 0;
    while (offset + 4 <= stdoutUsed) {
      let length = readUInt32LE(stdout, offset);
      if (offset + 4 + length > stdoutUsed) {
        break;
      }
      offset += 4;
      handleIncomingPacket(stdout.subarray(offset, offset + length));
      offset += length;
    }
    if (offset > 0) {
      stdout.copyWithin(0, offset, stdoutUsed);
      stdoutUsed -= offset;
    }
  };
  let afterClose = (error) => {
    closeData.didClose = true;
    if (error) closeData.reason = ": " + (error.message || error);
    const text = "The service was stopped" + closeData.reason;
    for (let id in responseCallbacks) {
      responseCallbacks[id](text, null);
    }
    responseCallbacks = {};
  };
  let sendRequest = (refs, value, callback) => {
    if (closeData.didClose) return callback("The service is no longer running" + closeData.reason, null);
    let id = nextRequestID++;
    responseCallbacks[id] = (error, response) => {
      try {
        callback(error, response);
      } finally {
        if (refs) refs.unref();
      }
    };
    if (refs) refs.ref();
    streamIn.writeToStdin(encodePacket({ id, isRequest: true, value }));
  };
  let sendResponse = (id, value) => {
    if (closeData.didClose) throw new Error("The service is no longer running" + closeData.reason);
    streamIn.writeToStdin(encodePacket({ id, isRequest: false, value }));
  };
  let handleRequest = async (id, request) => {
    try {
      if (request.command === "ping") {
        sendResponse(id, {});
        return;
      }
      if (typeof request.key === "number") {
        const requestCallbacks = requestCallbacksByKey[request.key];
        if (!requestCallbacks) {
          return;
        }
        const callback = requestCallbacks[request.command];
        if (callback) {
          await callback(id, request);
          return;
        }
      }
      throw new Error(`Invalid command: ` + request.command);
    } catch (e) {
      const errors = [extractErrorMessageV8(e, streamIn, null, void 0, "")];
      try {
        sendResponse(id, { errors });
      } catch {
      }
    }
  };
  let isFirstPacket = true;
  let handleIncomingPacket = (bytes) => {
    if (isFirstPacket) {
      isFirstPacket = false;
      let binaryVersion = String.fromCharCode(...bytes);
      if (binaryVersion !== "0.21.5") {
        throw new Error(`Cannot start service: Host version "${"0.21.5"}" does not match binary version ${quote(binaryVersion)}`);
      }
      return;
    }
    let packet = decodePacket(bytes);
    if (packet.isRequest) {
      handleRequest(packet.id, packet.value);
    } else {
      let callback = responseCallbacks[packet.id];
      delete responseCallbacks[packet.id];
      if (packet.value.error) callback(packet.value.error, {});
      else callback(null, packet.value);
    }
  };
  let buildOrContext = ({ callName, refs, options, isTTY: isTTY2, defaultWD: defaultWD2, callback }) => {
    let refCount = 0;
    const buildKey = nextBuildKey++;
    const requestCallbacks = {};
    const buildRefs = {
      ref() {
        if (++refCount === 1) {
          if (refs) refs.ref();
        }
      },
      unref() {
        if (--refCount === 0) {
          delete requestCallbacksByKey[buildKey];
          if (refs) refs.unref();
        }
      }
    };
    requestCallbacksByKey[buildKey] = requestCallbacks;
    buildRefs.ref();
    buildOrContextImpl(
      callName,
      buildKey,
      sendRequest,
      sendResponse,
      buildRefs,
      streamIn,
      requestCallbacks,
      options,
      isTTY2,
      defaultWD2,
      (err, res) => {
        try {
          callback(err, res);
        } finally {
          buildRefs.unref();
        }
      }
    );
  };
  let transform2 = ({ callName, refs, input, options, isTTY: isTTY2, fs: fs3, callback }) => {
    const details = createObjectStash();
    let start = (inputPath) => {
      try {
        if (typeof input !== "string" && !(input instanceof Uint8Array))
          throw new Error('The input to "transform" must be a string or a Uint8Array');
        let {
          flags,
          mangleCache
        } = flagsForTransformOptions(callName, options, isTTY2, transformLogLevelDefault);
        let request = {
          command: "transform",
          flags,
          inputFS: inputPath !== null,
          input: inputPath !== null ? encodeUTF8(inputPath) : typeof input === "string" ? encodeUTF8(input) : input
        };
        if (mangleCache) request.mangleCache = mangleCache;
        sendRequest(refs, request, (error, response) => {
          if (error) return callback(new Error(error), null);
          let errors = replaceDetailsInMessages(response.errors, details);
          let warnings = replaceDetailsInMessages(response.warnings, details);
          let outstanding = 1;
          let next = () => {
            if (--outstanding === 0) {
              let result = {
                warnings,
                code: response.code,
                map: response.map,
                mangleCache: void 0,
                legalComments: void 0
              };
              if ("legalComments" in response) result.legalComments = response == null ? void 0 : response.legalComments;
              if (response.mangleCache) result.mangleCache = response == null ? void 0 : response.mangleCache;
              callback(null, result);
            }
          };
          if (errors.length > 0) return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
          if (response.codeFS) {
            outstanding++;
            fs3.readFile(response.code, (err, contents) => {
              if (err !== null) {
                callback(err, null);
              } else {
                response.code = contents;
                next();
              }
            });
          }
          if (response.mapFS) {
            outstanding++;
            fs3.readFile(response.map, (err, contents) => {
              if (err !== null) {
                callback(err, null);
              } else {
                response.map = contents;
                next();
              }
            });
          }
          next();
        });
      } catch (e) {
        let flags = [];
        try {
          pushLogFlags(flags, options, {}, isTTY2, transformLogLevelDefault);
        } catch {
        }
        const error = extractErrorMessageV8(e, streamIn, details, void 0, "");
        sendRequest(refs, { command: "error", flags, error }, () => {
          error.detail = details.load(error.detail);
          callback(failureErrorWithLog("Transform failed", [error], []), null);
        });
      }
    };
    if ((typeof input === "string" || input instanceof Uint8Array) && input.length > 1024 * 1024) {
      let next = start;
      start = () => fs3.writeFile(input, next);
    }
    start(null);
  };
  let formatMessages2 = ({ callName, refs, messages, options, callback }) => {
    if (!options) throw new Error(`Missing second argument in ${callName}() call`);
    let keys = {};
    let kind = getFlag(options, keys, "kind", mustBeString);
    let color = getFlag(options, keys, "color", mustBeBoolean);
    let terminalWidth = getFlag(options, keys, "terminalWidth", mustBeInteger);
    checkForInvalidFlags(options, keys, `in ${callName}() call`);
    if (kind === void 0) throw new Error(`Missing "kind" in ${callName}() call`);
    if (kind !== "error" && kind !== "warning") throw new Error(`Expected "kind" to be "error" or "warning" in ${callName}() call`);
    let request = {
      command: "format-msgs",
      messages: sanitizeMessages(messages, "messages", null, "", terminalWidth),
      isWarning: kind === "warning"
    };
    if (color !== void 0) request.color = color;
    if (terminalWidth !== void 0) request.terminalWidth = terminalWidth;
    sendRequest(refs, request, (error, response) => {
      if (error) return callback(new Error(error), null);
      callback(null, response.messages);
    });
  };
  let analyzeMetafile2 = ({ callName, refs, metafile, options, callback }) => {
    if (options === void 0) options = {};
    let keys = {};
    let color = getFlag(options, keys, "color", mustBeBoolean);
    let verbose = getFlag(options, keys, "verbose", mustBeBoolean);
    checkForInvalidFlags(options, keys, `in ${callName}() call`);
    let request = {
      command: "analyze-metafile",
      metafile
    };
    if (color !== void 0) request.color = color;
    if (verbose !== void 0) request.verbose = verbose;
    sendRequest(refs, request, (error, response) => {
      if (error) return callback(new Error(error), null);
      callback(null, response.result);
    });
  };
  return {
    readFromStdout,
    afterClose,
    service: {
      buildOrContext,
      transform: transform2,
      formatMessages: formatMessages2,
      analyzeMetafile: analyzeMetafile2
    }
  };
}
function buildOrContextImpl(callName, buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, isTTY2, defaultWD2, callback) {
  const details = createObjectStash();
  const isContext = callName === "context";
  const handleError = (e, pluginName) => {
    const flags = [];
    try {
      pushLogFlags(flags, options, {}, isTTY2, buildLogLevelDefault);
    } catch {
    }
    const message = extractErrorMessageV8(e, streamIn, details, void 0, pluginName);
    sendRequest(refs, { command: "error", flags, error: message }, () => {
      message.detail = details.load(message.detail);
      callback(failureErrorWithLog(isContext ? "Context failed" : "Build failed", [message], []), null);
    });
  };
  let plugins;
  if (typeof options === "object") {
    const value = options.plugins;
    if (value !== void 0) {
      if (!Array.isArray(value)) return handleError(new Error(`"plugins" must be an array`), "");
      plugins = value;
    }
  }
  if (plugins && plugins.length > 0) {
    if (streamIn.isSync) return handleError(new Error("Cannot use plugins in synchronous API calls"), "");
    handlePlugins(
      buildKey,
      sendRequest,
      sendResponse,
      refs,
      streamIn,
      requestCallbacks,
      options,
      plugins,
      details
    ).then(
      (result) => {
        if (!result.ok) return handleError(result.error, result.pluginName);
        try {
          buildOrContextContinue(result.requestPlugins, result.runOnEndCallbacks, result.scheduleOnDisposeCallbacks);
        } catch (e) {
          handleError(e, "");
        }
      },
      (e) => handleError(e, "")
    );
    return;
  }
  try {
    buildOrContextContinue(null, (result, done) => done([], []), () => {
    });
  } catch (e) {
    handleError(e, "");
  }
  function buildOrContextContinue(requestPlugins, runOnEndCallbacks, scheduleOnDisposeCallbacks) {
    const writeDefault = streamIn.hasFS;
    const {
      entries,
      flags,
      write,
      stdinContents,
      stdinResolveDir,
      absWorkingDir,
      nodePaths,
      mangleCache
    } = flagsForBuildOptions(callName, options, isTTY2, buildLogLevelDefault, writeDefault);
    if (write && !streamIn.hasFS) throw new Error(`The "write" option is unavailable in this environment`);
    const request = {
      command: "build",
      key: buildKey,
      entries,
      flags,
      write,
      stdinContents,
      stdinResolveDir,
      absWorkingDir: absWorkingDir || defaultWD2,
      nodePaths,
      context: isContext
    };
    if (requestPlugins) request.plugins = requestPlugins;
    if (mangleCache) request.mangleCache = mangleCache;
    const buildResponseToResult = (response, callback2) => {
      const result = {
        errors: replaceDetailsInMessages(response.errors, details),
        warnings: replaceDetailsInMessages(response.warnings, details),
        outputFiles: void 0,
        metafile: void 0,
        mangleCache: void 0
      };
      const originalErrors = result.errors.slice();
      const originalWarnings = result.warnings.slice();
      if (response.outputFiles) result.outputFiles = response.outputFiles.map(convertOutputFiles);
      if (response.metafile) result.metafile = JSON.parse(response.metafile);
      if (response.mangleCache) result.mangleCache = response.mangleCache;
      if (response.writeToStdout !== void 0) console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, ""));
      runOnEndCallbacks(result, (onEndErrors, onEndWarnings) => {
        if (originalErrors.length > 0 || onEndErrors.length > 0) {
          const error = failureErrorWithLog("Build failed", originalErrors.concat(onEndErrors), originalWarnings.concat(onEndWarnings));
          return callback2(error, null, onEndErrors, onEndWarnings);
        }
        callback2(null, result, onEndErrors, onEndWarnings);
      });
    };
    let latestResultPromise;
    let provideLatestResult;
    if (isContext)
      requestCallbacks["on-end"] = (id, request2) => new Promise((resolve) => {
        buildResponseToResult(request2, (err, result, onEndErrors, onEndWarnings) => {
          const response = {
            errors: onEndErrors,
            warnings: onEndWarnings
          };
          if (provideLatestResult) provideLatestResult(err, result);
          latestResultPromise = void 0;
          provideLatestResult = void 0;
          sendResponse(id, response);
          resolve();
        });
      });
    sendRequest(refs, request, (error, response) => {
      if (error) return callback(new Error(error), null);
      if (!isContext) {
        return buildResponseToResult(response, (err, res) => {
          scheduleOnDisposeCallbacks();
          return callback(err, res);
        });
      }
      if (response.errors.length > 0) {
        return callback(failureErrorWithLog("Context failed", response.errors, response.warnings), null);
      }
      let didDispose = false;
      const result = {
        rebuild: () => {
          if (!latestResultPromise) latestResultPromise = new Promise((resolve, reject) => {
            let settlePromise;
            provideLatestResult = (err, result2) => {
              if (!settlePromise) settlePromise = () => err ? reject(err) : resolve(result2);
            };
            const triggerAnotherBuild = () => {
              const request2 = {
                command: "rebuild",
                key: buildKey
              };
              sendRequest(refs, request2, (error2, response2) => {
                if (error2) {
                  reject(new Error(error2));
                } else if (settlePromise) {
                  settlePromise();
                } else {
                  triggerAnotherBuild();
                }
              });
            };
            triggerAnotherBuild();
          });
          return latestResultPromise;
        },
        watch: (options2 = {}) => new Promise((resolve, reject) => {
          if (!streamIn.hasFS) throw new Error(`Cannot use the "watch" API in this environment`);
          const keys = {};
          checkForInvalidFlags(options2, keys, `in watch() call`);
          const request2 = {
            command: "watch",
            key: buildKey
          };
          sendRequest(refs, request2, (error2) => {
            if (error2) reject(new Error(error2));
            else resolve(void 0);
          });
        }),
        serve: (options2 = {}) => new Promise((resolve, reject) => {
          if (!streamIn.hasFS) throw new Error(`Cannot use the "serve" API in this environment`);
          const keys = {};
          const port = getFlag(options2, keys, "port", mustBeInteger);
          const host = getFlag(options2, keys, "host", mustBeString);
          const servedir = getFlag(options2, keys, "servedir", mustBeString);
          const keyfile = getFlag(options2, keys, "keyfile", mustBeString);
          const certfile = getFlag(options2, keys, "certfile", mustBeString);
          const fallback = getFlag(options2, keys, "fallback", mustBeString);
          const onRequest = getFlag(options2, keys, "onRequest", mustBeFunction);
          checkForInvalidFlags(options2, keys, `in serve() call`);
          const request2 = {
            command: "serve",
            key: buildKey,
            onRequest: !!onRequest
          };
          if (port !== void 0) request2.port = port;
          if (host !== void 0) request2.host = host;
          if (servedir !== void 0) request2.servedir = servedir;
          if (keyfile !== void 0) request2.keyfile = keyfile;
          if (certfile !== void 0) request2.certfile = certfile;
          if (fallback !== void 0) request2.fallback = fallback;
          sendRequest(refs, request2, (error2, response2) => {
            if (error2) return reject(new Error(error2));
            if (onRequest) {
              requestCallbacks["serve-request"] = (id, request3) => {
                onRequest(request3.args);
                sendResponse(id, {});
              };
            }
            resolve(response2);
          });
        }),
        cancel: () => new Promise((resolve) => {
          if (didDispose) return resolve();
          const request2 = {
            command: "cancel",
            key: buildKey
          };
          sendRequest(refs, request2, () => {
            resolve();
          });
        }),
        dispose: () => new Promise((resolve) => {
          if (didDispose) return resolve();
          didDispose = true;
          const request2 = {
            command: "dispose",
            key: buildKey
          };
          sendRequest(refs, request2, () => {
            resolve();
            scheduleOnDisposeCallbacks();
            refs.unref();
          });
        })
      };
      refs.ref();
      callback(null, result);
    });
  }
}
var handlePlugins = async (buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, initialOptions, plugins, details) => {
  let onStartCallbacks = [];
  let onEndCallbacks = [];
  let onResolveCallbacks = {};
  let onLoadCallbacks = {};
  let onDisposeCallbacks = [];
  let nextCallbackID = 0;
  let i = 0;
  let requestPlugins = [];
  let isSetupDone = false;
  plugins = [...plugins];
  for (let item of plugins) {
    let keys = {};
    if (typeof item !== "object") throw new Error(`Plugin at index ${i} must be an object`);
    const name = getFlag(item, keys, "name", mustBeString);
    if (typeof name !== "string" || name === "") throw new Error(`Plugin at index ${i} is missing a name`);
    try {
      let setup = getFlag(item, keys, "setup", mustBeFunction);
      if (typeof setup !== "function") throw new Error(`Plugin is missing a setup function`);
      checkForInvalidFlags(item, keys, `on plugin ${quote(name)}`);
      let plugin = {
        name,
        onStart: false,
        onEnd: false,
        onResolve: [],
        onLoad: []
      };
      i++;
      let resolve = (path3, options = {}) => {
        if (!isSetupDone) throw new Error('Cannot call "resolve" before plugin setup has completed');
        if (typeof path3 !== "string") throw new Error(`The path to resolve must be a string`);
        let keys2 = /* @__PURE__ */ Object.create(null);
        let pluginName = getFlag(options, keys2, "pluginName", mustBeString);
        let importer = getFlag(options, keys2, "importer", mustBeString);
        let namespace = getFlag(options, keys2, "namespace", mustBeString);
        let resolveDir = getFlag(options, keys2, "resolveDir", mustBeString);
        let kind = getFlag(options, keys2, "kind", mustBeString);
        let pluginData = getFlag(options, keys2, "pluginData", canBeAnything);
        let importAttributes = getFlag(options, keys2, "with", mustBeObject);
        checkForInvalidFlags(options, keys2, "in resolve() call");
        return new Promise((resolve2, reject) => {
          const request = {
            command: "resolve",
            path: path3,
            key: buildKey,
            pluginName: name
          };
          if (pluginName != null) request.pluginName = pluginName;
          if (importer != null) request.importer = importer;
          if (namespace != null) request.namespace = namespace;
          if (resolveDir != null) request.resolveDir = resolveDir;
          if (kind != null) request.kind = kind;
          else throw new Error(`Must specify "kind" when calling "resolve"`);
          if (pluginData != null) request.pluginData = details.store(pluginData);
          if (importAttributes != null) request.with = sanitizeStringMap(importAttributes, "with");
          sendRequest(refs, request, (error, response) => {
            if (error !== null) reject(new Error(error));
            else resolve2({
              errors: replaceDetailsInMessages(response.errors, details),
              warnings: replaceDetailsInMessages(response.warnings, details),
              path: response.path,
              external: response.external,
              sideEffects: response.sideEffects,
              namespace: response.namespace,
              suffix: response.suffix,
              pluginData: details.load(response.pluginData)
            });
          });
        });
      };
      let promise = setup({
        initialOptions,
        resolve,
        onStart(callback) {
          let registeredText = `This error came from the "onStart" callback registered here:`;
          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onStart");
          onStartCallbacks.push({ name, callback, note: registeredNote });
          plugin.onStart = true;
        },
        onEnd(callback) {
          let registeredText = `This error came from the "onEnd" callback registered here:`;
          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onEnd");
          onEndCallbacks.push({ name, callback, note: registeredNote });
          plugin.onEnd = true;
        },
        onResolve(options, callback) {
          let registeredText = `This error came from the "onResolve" callback registered here:`;
          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve");
          let keys2 = {};
          let filter = getFlag(options, keys2, "filter", mustBeRegExp);
          let namespace = getFlag(options, keys2, "namespace", mustBeString);
          checkForInvalidFlags(options, keys2, `in onResolve() call for plugin ${quote(name)}`);
          if (filter == null) throw new Error(`onResolve() call is missing a filter`);
          let id = nextCallbackID++;
          onResolveCallbacks[id] = { name, callback, note: registeredNote };
          plugin.onResolve.push({ id, filter: filter.source, namespace: namespace || "" });
        },
        onLoad(options, callback) {
          let registeredText = `This error came from the "onLoad" callback registered here:`;
          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
          let keys2 = {};
          let filter = getFlag(options, keys2, "filter", mustBeRegExp);
          let namespace = getFlag(options, keys2, "namespace", mustBeString);
          checkForInvalidFlags(options, keys2, `in onLoad() call for plugin ${quote(name)}`);
          if (filter == null) throw new Error(`onLoad() call is missing a filter`);
          let id = nextCallbackID++;
          onLoadCallbacks[id] = { name, callback, note: registeredNote };
          plugin.onLoad.push({ id, filter: filter.source, namespace: namespace || "" });
        },
        onDispose(callback) {
          onDisposeCallbacks.push(callback);
        },
        esbuild: streamIn.esbuild
      });
      if (promise) await promise;
      requestPlugins.push(plugin);
    } catch (e) {
      return { ok: false, error: e, pluginName: name };
    }
  }
  requestCallbacks["on-start"] = async (id, request) => {
    let response = { errors: [], warnings: [] };
    await Promise.all(onStartCallbacks.map(async ({ name, callback, note }) => {
      try {
        let result = await callback();
        if (result != null) {
          if (typeof result !== "object") throw new Error(`Expected onStart() callback in plugin ${quote(name)} to return an object`);
          let keys = {};
          let errors = getFlag(result, keys, "errors", mustBeArray);
          let warnings = getFlag(result, keys, "warnings", mustBeArray);
          checkForInvalidFlags(result, keys, `from onStart() callback in plugin ${quote(name)}`);
          if (errors != null) response.errors.push(...sanitizeMessages(errors, "errors", details, name, void 0));
          if (warnings != null) response.warnings.push(...sanitizeMessages(warnings, "warnings", details, name, void 0));
        }
      } catch (e) {
        response.errors.push(extractErrorMessageV8(e, streamIn, details, note && note(), name));
      }
    }));
    sendResponse(id, response);
  };
  requestCallbacks["on-resolve"] = async (id, request) => {
    let response = {}, name = "", callback, note;
    for (let id2 of request.ids) {
      try {
        ({ name, callback, note } = onResolveCallbacks[id2]);
        let result = await callback({
          path: request.path,
          importer: request.importer,
          namespace: request.namespace,
          resolveDir: request.resolveDir,
          kind: request.kind,
          pluginData: details.load(request.pluginData),
          with: request.with
        });
        if (result != null) {
          if (typeof result !== "object") throw new Error(`Expected onResolve() callback in plugin ${quote(name)} to return an object`);
          let keys = {};
          let pluginName = getFlag(result, keys, "pluginName", mustBeString);
          let path3 = getFlag(result, keys, "path", mustBeString);
          let namespace = getFlag(result, keys, "namespace", mustBeString);
          let suffix = getFlag(result, keys, "suffix", mustBeString);
          let external = getFlag(result, keys, "external", mustBeBoolean);
          let sideEffects = getFlag(result, keys, "sideEffects", mustBeBoolean);
          let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
          let errors = getFlag(result, keys, "errors", mustBeArray);
          let warnings = getFlag(result, keys, "warnings", mustBeArray);
          let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
          let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
          checkForInvalidFlags(result, keys, `from onResolve() callback in plugin ${quote(name)}`);
          response.id = id2;
          if (pluginName != null) response.pluginName = pluginName;
          if (path3 != null) response.path = path3;
          if (namespace != null) response.namespace = namespace;
          if (suffix != null) response.suffix = suffix;
          if (external != null) response.external = external;
          if (sideEffects != null) response.sideEffects = sideEffects;
          if (pluginData != null) response.pluginData = details.store(pluginData);
          if (errors != null) response.errors = sanitizeMessages(errors, "errors", details, name, void 0);
          if (warnings != null) response.warnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
          if (watchFiles != null) response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
          if (watchDirs != null) response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
          break;
        }
      } catch (e) {
        response = { id: id2, errors: [extractErrorMessageV8(e, streamIn, details, note && note(), name)] };
        break;
      }
    }
    sendResponse(id, response);
  };
  requestCallbacks["on-load"] = async (id, request) => {
    let response = {}, name = "", callback, note;
    for (let id2 of request.ids) {
      try {
        ({ name, callback, note } = onLoadCallbacks[id2]);
        let result = await callback({
          path: request.path,
          namespace: request.namespace,
          suffix: request.suffix,
          pluginData: details.load(request.pluginData),
          with: request.with
        });
        if (result != null) {
          if (typeof result !== "object") throw new Error(`Expected onLoad() callback in plugin ${quote(name)} to return an object`);
          let keys = {};
          let pluginName = getFlag(result, keys, "pluginName", mustBeString);
          let contents = getFlag(result, keys, "contents", mustBeStringOrUint8Array);
          let resolveDir = getFlag(result, keys, "resolveDir", mustBeString);
          let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
          let loader = getFlag(result, keys, "loader", mustBeString);
          let errors = getFlag(result, keys, "errors", mustBeArray);
          let warnings = getFlag(result, keys, "warnings", mustBeArray);
          let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
          let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
          checkForInvalidFlags(result, keys, `from onLoad() callback in plugin ${quote(name)}`);
          response.id = id2;
          if (pluginName != null) response.pluginName = pluginName;
          if (contents instanceof Uint8Array) response.contents = contents;
          else if (contents != null) response.contents = encodeUTF8(contents);
          if (resolveDir != null) response.resolveDir = resolveDir;
          if (pluginData != null) response.pluginData = details.store(pluginData);
          if (loader != null) response.loader = loader;
          if (errors != null) response.errors = sanitizeMessages(errors, "errors", details, name, void 0);
          if (warnings != null) response.warnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
          if (watchFiles != null) response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
          if (watchDirs != null) response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
          break;
        }
      } catch (e) {
        response = { id: id2, errors: [extractErrorMessageV8(e, streamIn, details, note && note(), name)] };
        break;
      }
    }
    sendResponse(id, response);
  };
  let runOnEndCallbacks = (result, done) => done([], []);
  if (onEndCallbacks.length > 0) {
    runOnEndCallbacks = (result, done) => {
      (async () => {
        const onEndErrors = [];
        const onEndWarnings = [];
        for (const { name, callback, note } of onEndCallbacks) {
          let newErrors;
          let newWarnings;
          try {
            const value = await callback(result);
            if (value != null) {
              if (typeof value !== "object") throw new Error(`Expected onEnd() callback in plugin ${quote(name)} to return an object`);
              let keys = {};
              let errors = getFlag(value, keys, "errors", mustBeArray);
              let warnings = getFlag(value, keys, "warnings", mustBeArray);
              checkForInvalidFlags(value, keys, `from onEnd() callback in plugin ${quote(name)}`);
              if (errors != null) newErrors = sanitizeMessages(errors, "errors", details, name, void 0);
              if (warnings != null) newWarnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
            }
          } catch (e) {
            newErrors = [extractErrorMessageV8(e, streamIn, details, note && note(), name)];
          }
          if (newErrors) {
            onEndErrors.push(...newErrors);
            try {
              result.errors.push(...newErrors);
            } catch {
            }
          }
          if (newWarnings) {
            onEndWarnings.push(...newWarnings);
            try {
              result.warnings.push(...newWarnings);
            } catch {
            }
          }
        }
        done(onEndErrors, onEndWarnings);
      })();
    };
  }
  let scheduleOnDisposeCallbacks = () => {
    for (const cb of onDisposeCallbacks) {
      setTimeout(() => cb(), 0);
    }
  };
  isSetupDone = true;
  return {
    ok: true,
    requestPlugins,
    runOnEndCallbacks,
    scheduleOnDisposeCallbacks
  };
};
function createObjectStash() {
  const map = /* @__PURE__ */ new Map();
  let nextID = 0;
  return {
    load(id) {
      return map.get(id);
    },
    store(value) {
      if (value === void 0) return -1;
      const id = nextID++;
      map.set(id, value);
      return id;
    }
  };
}
function extractCallerV8(e, streamIn, ident) {
  let note;
  let tried = false;
  return () => {
    if (tried) return note;
    tried = true;
    try {
      let lines = (e.stack + "").split("\n");
      lines.splice(1, 1);
      let location = parseStackLinesV8(streamIn, lines, ident);
      if (location) {
        note = { text: e.message, location };
        return note;
      }
    } catch {
    }
  };
}
function extractErrorMessageV8(e, streamIn, stash, note, pluginName) {
  let text = "Internal error";
  let location = null;
  try {
    text = (e && e.message || e) + "";
  } catch {
  }
  try {
    location = parseStackLinesV8(streamIn, (e.stack + "").split("\n"), "");
  } catch {
  }
  return { id: "", pluginName, text, location, notes: note ? [note] : [], detail: stash ? stash.store(e) : -1 };
}
function parseStackLinesV8(streamIn, lines, ident) {
  let at = "    at ";
  if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
    for (let i = 1; i < lines.length; i++) {
      let line = lines[i];
      if (!line.startsWith(at)) continue;
      line = line.slice(at.length);
      while (true) {
        let match = /^(?:new |async )?\S+ \((.*)\)$/.exec(line);
        if (match) {
          line = match[1];
          continue;
        }
        match = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line);
        if (match) {
          line = match[1];
          continue;
        }
        match = /^(\S+):(\d+):(\d+)$/.exec(line);
        if (match) {
          let contents;
          try {
            contents = streamIn.readFileSync(match[1], "utf8");
          } catch {
            break;
          }
          let lineText = contents.split(/\r\n|\r|\n|\u2028|\u2029/)[+match[2] - 1] || "";
          let column = +match[3] - 1;
          let length = lineText.slice(column, column + ident.length) === ident ? ident.length : 0;
          return {
            file: match[1],
            namespace: "file",
            line: +match[2],
            column: encodeUTF8(lineText.slice(0, column)).length,
            length: encodeUTF8(lineText.slice(column, column + length)).length,
            lineText: lineText + "\n" + lines.slice(1).join("\n"),
            suggestion: ""
          };
        }
        break;
      }
    }
  }
  return null;
}
function failureErrorWithLog(text, errors, warnings) {
  let limit = 5;
  text += errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i) => {
    if (i === limit) return "\n...";
    if (!e.location) return `
error: ${e.text}`;
    let { file, line, column } = e.location;
    let pluginText = e.pluginName ? `[plugin: ${e.pluginName}] ` : "";
    return `
${file}:${line}:${column}: ERROR: ${pluginText}${e.text}`;
  }).join("");
  let error = new Error(text);
  for (const [key, value] of [["errors", errors], ["warnings", warnings]]) {
    Object.defineProperty(error, key, {
      configurable: true,
      enumerable: true,
      get: () => value,
      set: (value2) => Object.defineProperty(error, key, {
        configurable: true,
        enumerable: true,
        value: value2
      })
    });
  }
  return error;
}
function replaceDetailsInMessages(messages, stash) {
  for (const message of messages) {
    message.detail = stash.load(message.detail);
  }
  return messages;
}
function sanitizeLocation(location, where, terminalWidth) {
  if (location == null) return null;
  let keys = {};
  let file = getFlag(location, keys, "file", mustBeString);
  let namespace = getFlag(location, keys, "namespace", mustBeString);
  let line = getFlag(location, keys, "line", mustBeInteger);
  let column = getFlag(location, keys, "column", mustBeInteger);
  let length = getFlag(location, keys, "length", mustBeInteger);
  let lineText = getFlag(location, keys, "lineText", mustBeString);
  let suggestion = getFlag(location, keys, "suggestion", mustBeString);
  checkForInvalidFlags(location, keys, where);
  if (lineText) {
    const relevantASCII = lineText.slice(
      0,
      (column && column > 0 ? column : 0) + (length && length > 0 ? length : 0) + (terminalWidth && terminalWidth > 0 ? terminalWidth : 80)
    );
    if (!/[\x7F-\uFFFF]/.test(relevantASCII) && !/\n/.test(lineText)) {
      lineText = relevantASCII;
    }
  }
  return {
    file: file || "",
    namespace: namespace || "",
    line: line || 0,
    column: column || 0,
    length: length || 0,
    lineText: lineText || "",
    suggestion: suggestion || ""
  };
}
function sanitizeMessages(messages, property, stash, fallbackPluginName, terminalWidth) {
  let messagesClone = [];
  let index = 0;
  for (const message of messages) {
    let keys = {};
    let id = getFlag(message, keys, "id", mustBeString);
    let pluginName = getFlag(message, keys, "pluginName", mustBeString);
    let text = getFlag(message, keys, "text", mustBeString);
    let location = getFlag(message, keys, "location", mustBeObjectOrNull);
    let notes = getFlag(message, keys, "notes", mustBeArray);
    let detail = getFlag(message, keys, "detail", canBeAnything);
    let where = `in element ${index} of "${property}"`;
    checkForInvalidFlags(message, keys, where);
    let notesClone = [];
    if (notes) {
      for (const note of notes) {
        let noteKeys = {};
        let noteText = getFlag(note, noteKeys, "text", mustBeString);
        let noteLocation = getFlag(note, noteKeys, "location", mustBeObjectOrNull);
        checkForInvalidFlags(note, noteKeys, where);
        notesClone.push({
          text: noteText || "",
          location: sanitizeLocation(noteLocation, where, terminalWidth)
        });
      }
    }
    messagesClone.push({
      id: id || "",
      pluginName: pluginName || fallbackPluginName,
      text: text || "",
      location: sanitizeLocation(location, where, terminalWidth),
      notes: notesClone,
      detail: stash ? stash.store(detail) : -1
    });
    index++;
  }
  return messagesClone;
}
function sanitizeStringArray(values, property) {
  const result = [];
  for (const value of values) {
    if (typeof value !== "string") throw new Error(`${quote(property)} must be an array of strings`);
    result.push(value);
  }
  return result;
}
function sanitizeStringMap(map, property) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const key in map) {
    const value = map[key];
    if (typeof value !== "string") throw new Error(`key ${quote(key)} in object ${quote(property)} must be a string`);
    result[key] = value;
  }
  return result;
}
function convertOutputFiles({ path: path3, contents, hash }) {
  let text = null;
  return {
    path: path3,
    contents,
    hash,
    get text() {
      const binary = this.contents;
      if (text === null || binary !== contents) {
        contents = binary;
        text = decodeUTF8(binary);
      }
      return text;
    }
  };
}

// lib/npm/node-platform.ts
var fs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var os = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'os'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var path = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var ESBUILD_BINARY_PATH = process.env.ESBUILD_BINARY_PATH || ESBUILD_BINARY_PATH;
var isValidBinaryPath = (x) => !!x && x !== "/usr/bin/esbuild";
var packageDarwin_arm64 = "@esbuild/darwin-arm64";
var packageDarwin_x64 = "@esbuild/darwin-x64";
var knownWindowsPackages = {
  "win32 arm64 LE": "@esbuild/win32-arm64",
  "win32 ia32 LE": "@esbuild/win32-ia32",
  "win32 x64 LE": "@esbuild/win32-x64"
};
var knownUnixlikePackages = {
  "aix ppc64 BE": "@esbuild/aix-ppc64",
  "android arm64 LE": "@esbuild/android-arm64",
  "darwin arm64 LE": "@esbuild/darwin-arm64",
  "darwin x64 LE": "@esbuild/darwin-x64",
  "freebsd arm64 LE": "@esbuild/freebsd-arm64",
  "freebsd x64 LE": "@esbuild/freebsd-x64",
  "linux arm LE": "@esbuild/linux-arm",
  "linux arm64 LE": "@esbuild/linux-arm64",
  "linux ia32 LE": "@esbuild/linux-ia32",
  "linux mips64el LE": "@esbuild/linux-mips64el",
  "linux ppc64 LE": "@esbuild/linux-ppc64",
  "linux riscv64 LE": "@esbuild/linux-riscv64",
  "linux s390x BE": "@esbuild/linux-s390x",
  "linux x64 LE": "@esbuild/linux-x64",
  "linux loong64 LE": "@esbuild/linux-loong64",
  "netbsd x64 LE": "@esbuild/netbsd-x64",
  "openbsd x64 LE": "@esbuild/openbsd-x64",
  "sunos x64 LE": "@esbuild/sunos-x64"
};
var knownWebAssemblyFallbackPackages = {
  "android arm LE": "@esbuild/android-arm",
  "android x64 LE": "@esbuild/android-x64"
};
function pkgAndSubpathForCurrentPlatform() {
  let pkg;
  let subpath;
  let isWASM = false;
  let platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`;
  if (platformKey in knownWindowsPackages) {
    pkg = knownWindowsPackages[platformKey];
    subpath = "esbuild.exe";
  } else if (platformKey in knownUnixlikePackages) {
    pkg = knownUnixlikePackages[platformKey];
    subpath = "bin/esbuild";
  } else if (platformKey in knownWebAssemblyFallbackPackages) {
    pkg = knownWebAssemblyFallbackPackages[platformKey];
    subpath = "bin/esbuild";
    isWASM = true;
  } else {
    throw new Error(`Unsupported platform: ${platformKey}`);
  }
  return { pkg, subpath, isWASM };
}
function pkgForSomeOtherPlatform() {
  const libMainJS = /*require.resolve*/(/*! esbuild */ "./node_modules/esbuild/lib/main.js");
  const nodeModulesDirectory = path.dirname(path.dirname(path.dirname(libMainJS)));
  if (path.basename(nodeModulesDirectory) === "node_modules") {
    for (const unixKey in knownUnixlikePackages) {
      try {
        const pkg = knownUnixlikePackages[unixKey];
        if (fs.existsSync(path.join(nodeModulesDirectory, pkg))) return pkg;
      } catch {
      }
    }
    for (const windowsKey in knownWindowsPackages) {
      try {
        const pkg = knownWindowsPackages[windowsKey];
        if (fs.existsSync(path.join(nodeModulesDirectory, pkg))) return pkg;
      } catch {
      }
    }
  }
  return null;
}
function downloadedBinPath(pkg, subpath) {
  const esbuildLibDir = path.dirname(/*require.resolve*/(/*! esbuild */ "./node_modules/esbuild/lib/main.js"));
  return path.join(esbuildLibDir, `downloaded-${pkg.replace("/", "-")}-${path.basename(subpath)}`);
}
function generateBinPath() {
  if (isValidBinaryPath(ESBUILD_BINARY_PATH)) {
    if (!fs.existsSync(ESBUILD_BINARY_PATH)) {
      console.warn(`[esbuild] Ignoring bad configuration: ESBUILD_BINARY_PATH=${ESBUILD_BINARY_PATH}`);
    } else {
      return { binPath: ESBUILD_BINARY_PATH, isWASM: false };
    }
  }
  const { pkg, subpath, isWASM } = pkgAndSubpathForCurrentPlatform();
  let binPath;
  try {
    binPath = /*require.resolve*/(__webpack_require__("./node_modules/esbuild/lib sync recursive ^.*\\/.*$").resolve(`${pkg}/${subpath}`));
  } catch (e) {
    binPath = downloadedBinPath(pkg, subpath);
    if (!fs.existsSync(binPath)) {
      try {
        /*require.resolve*/(__webpack_require__("./node_modules/esbuild/lib sync recursive").resolve(pkg));
      } catch {
        const otherPkg = pkgForSomeOtherPlatform();
        if (otherPkg) {
          let suggestions = `
Specifically the "${otherPkg}" package is present but this platform
needs the "${pkg}" package instead. People often get into this
situation by installing esbuild on Windows or macOS and copying "node_modules"
into a Docker image that runs Linux, or by copying "node_modules" between
Windows and WSL environments.

If you are installing with npm, you can try not copying the "node_modules"
directory when you copy the files over, and running "npm ci" or "npm install"
on the destination platform after the copy. Or you could consider using yarn
instead of npm which has built-in support for installing a package on multiple
platforms simultaneously.

If you are installing with yarn, you can try listing both this platform and the
other platform in your ".yarnrc.yml" file using the "supportedArchitectures"
feature: https://yarnpkg.com/configuration/yarnrc/#supportedArchitectures
Keep in mind that this means multiple copies of esbuild will be present.
`;
          if (pkg === packageDarwin_x64 && otherPkg === packageDarwin_arm64 || pkg === packageDarwin_arm64 && otherPkg === packageDarwin_x64) {
            suggestions = `
Specifically the "${otherPkg}" package is present but this platform
needs the "${pkg}" package instead. People often get into this
situation by installing esbuild with npm running inside of Rosetta 2 and then
trying to use it with node running outside of Rosetta 2, or vice versa (Rosetta
2 is Apple's on-the-fly x86_64-to-arm64 translation service).

If you are installing with npm, you can try ensuring that both npm and node are
not running under Rosetta 2 and then reinstalling esbuild. This likely involves
changing how you installed npm and/or node. For example, installing node with
the universal installer here should work: https://nodejs.org/en/download/. Or
you could consider using yarn instead of npm which has built-in support for
installing a package on multiple platforms simultaneously.

If you are installing with yarn, you can try listing both "arm64" and "x64"
in your ".yarnrc.yml" file using the "supportedArchitectures" feature:
https://yarnpkg.com/configuration/yarnrc/#supportedArchitectures
Keep in mind that this means multiple copies of esbuild will be present.
`;
          }
          throw new Error(`
You installed esbuild for another platform than the one you're currently using.
This won't work because esbuild is written with native code and needs to
install a platform-specific binary executable.
${suggestions}
Another alternative is to use the "esbuild-wasm" package instead, which works
the same way on all platforms. But it comes with a heavy performance cost and
can sometimes be 10x slower than the "esbuild" package, so you may also not
want to do that.
`);
        }
        throw new Error(`The package "${pkg}" could not be found, and is needed by esbuild.

If you are installing esbuild with npm, make sure that you don't specify the
"--no-optional" or "--omit=optional" flags. The "optionalDependencies" feature
of "package.json" is used by esbuild to install the correct binary executable
for your current platform.`);
      }
      throw e;
    }
  }
  if (/\.zip\//.test(binPath)) {
    let pnpapi;
    try {
      pnpapi = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'pnpapi'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    } catch (e) {
    }
    if (pnpapi) {
      const root = pnpapi.getPackageInformation(pnpapi.topLevel).packageLocation;
      const binTargetPath = path.join(
        root,
        "node_modules",
        ".cache",
        "esbuild",
        `pnpapi-${pkg.replace("/", "-")}-${"0.21.5"}-${path.basename(subpath)}`
      );
      if (!fs.existsSync(binTargetPath)) {
        fs.mkdirSync(path.dirname(binTargetPath), { recursive: true });
        fs.copyFileSync(binPath, binTargetPath);
        fs.chmodSync(binTargetPath, 493);
      }
      return { binPath: binTargetPath, isWASM };
    }
  }
  return { binPath, isWASM };
}

// lib/npm/node.ts
var child_process = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'child_process'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var crypto = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'crypto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var path2 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var fs2 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var os2 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'os'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var tty = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'tty'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var worker_threads;
if (process.env.ESBUILD_WORKER_THREADS !== "0") {
  try {
    worker_threads = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'worker_threads'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  } catch {
  }
  let [major, minor] = process.versions.node.split(".");
  if (
    // <v12.17.0 does not work
    +major < 12 || +major === 12 && +minor < 17 || +major === 13 && +minor < 13
  ) {
    worker_threads = void 0;
  }
}
var _a;
var isInternalWorkerThread = ((_a = worker_threads == null ? void 0 : worker_threads.workerData) == null ? void 0 : _a.esbuildVersion) === "0.21.5";
var esbuildCommandAndArgs = () => {
  if ((!ESBUILD_BINARY_PATH || false) && (path2.basename(__filename) !== "main.js" || path2.basename(__dirname) !== "lib")) {
    throw new Error(
      `The esbuild JavaScript API cannot be bundled. Please mark the "esbuild" package as external so it's not included in the bundle.

More information: The file containing the code for esbuild's JavaScript API (${__filename}) does not appear to be inside the esbuild package on the file system, which usually means that the esbuild package was bundled into another file. This is problematic because the API needs to run a binary executable inside the esbuild package which is located using a relative path from the API code to the executable. If the esbuild package is bundled, the relative path will be incorrect and the executable won't be found.`
    );
  }
  if (false) {} else {
    const { binPath, isWASM } = generateBinPath();
    if (isWASM) {
      return ["node", [binPath]];
    } else {
      return [binPath, []];
    }
  }
};
var isTTY = () => tty.isatty(2);
var fsSync = {
  readFile(tempFile, callback) {
    try {
      let contents = fs2.readFileSync(tempFile, "utf8");
      try {
        fs2.unlinkSync(tempFile);
      } catch {
      }
      callback(null, contents);
    } catch (err) {
      callback(err, null);
    }
  },
  writeFile(contents, callback) {
    try {
      let tempFile = randomFileName();
      fs2.writeFileSync(tempFile, contents);
      callback(tempFile);
    } catch {
      callback(null);
    }
  }
};
var fsAsync = {
  readFile(tempFile, callback) {
    try {
      fs2.readFile(tempFile, "utf8", (err, contents) => {
        try {
          fs2.unlink(tempFile, () => callback(err, contents));
        } catch {
          callback(err, contents);
        }
      });
    } catch (err) {
      callback(err, null);
    }
  },
  writeFile(contents, callback) {
    try {
      let tempFile = randomFileName();
      fs2.writeFile(tempFile, contents, (err) => err !== null ? callback(null) : callback(tempFile));
    } catch {
      callback(null);
    }
  }
};
var version = "0.21.5";
var build = (options) => ensureServiceIsRunning().build(options);
var context = (buildOptions) => ensureServiceIsRunning().context(buildOptions);
var transform = (input, options) => ensureServiceIsRunning().transform(input, options);
var formatMessages = (messages, options) => ensureServiceIsRunning().formatMessages(messages, options);
var analyzeMetafile = (messages, options) => ensureServiceIsRunning().analyzeMetafile(messages, options);
var buildSync = (options) => {
  if (worker_threads && !isInternalWorkerThread) {
    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
    return workerThreadService.buildSync(options);
  }
  let result;
  runServiceSync((service) => service.buildOrContext({
    callName: "buildSync",
    refs: null,
    options,
    isTTY: isTTY(),
    defaultWD,
    callback: (err, res) => {
      if (err) throw err;
      result = res;
    }
  }));
  return result;
};
var transformSync = (input, options) => {
  if (worker_threads && !isInternalWorkerThread) {
    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
    return workerThreadService.transformSync(input, options);
  }
  let result;
  runServiceSync((service) => service.transform({
    callName: "transformSync",
    refs: null,
    input,
    options: options || {},
    isTTY: isTTY(),
    fs: fsSync,
    callback: (err, res) => {
      if (err) throw err;
      result = res;
    }
  }));
  return result;
};
var formatMessagesSync = (messages, options) => {
  if (worker_threads && !isInternalWorkerThread) {
    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
    return workerThreadService.formatMessagesSync(messages, options);
  }
  let result;
  runServiceSync((service) => service.formatMessages({
    callName: "formatMessagesSync",
    refs: null,
    messages,
    options,
    callback: (err, res) => {
      if (err) throw err;
      result = res;
    }
  }));
  return result;
};
var analyzeMetafileSync = (metafile, options) => {
  if (worker_threads && !isInternalWorkerThread) {
    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
    return workerThreadService.analyzeMetafileSync(metafile, options);
  }
  let result;
  runServiceSync((service) => service.analyzeMetafile({
    callName: "analyzeMetafileSync",
    refs: null,
    metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
    options,
    callback: (err, res) => {
      if (err) throw err;
      result = res;
    }
  }));
  return result;
};
var stop = () => {
  if (stopService) stopService();
  if (workerThreadService) workerThreadService.stop();
  return Promise.resolve();
};
var initializeWasCalled = false;
var initialize = (options) => {
  options = validateInitializeOptions(options || {});
  if (options.wasmURL) throw new Error(`The "wasmURL" option only works in the browser`);
  if (options.wasmModule) throw new Error(`The "wasmModule" option only works in the browser`);
  if (options.worker) throw new Error(`The "worker" option only works in the browser`);
  if (initializeWasCalled) throw new Error('Cannot call "initialize" more than once');
  ensureServiceIsRunning();
  initializeWasCalled = true;
  return Promise.resolve();
};
var defaultWD = process.cwd();
var longLivedService;
var stopService;
var ensureServiceIsRunning = () => {
  if (longLivedService) return longLivedService;
  let [command, args] = esbuildCommandAndArgs();
  let child = child_process.spawn(command, args.concat(`--service=${"0.21.5"}`, "--ping"), {
    windowsHide: true,
    stdio: ["pipe", "pipe", "inherit"],
    cwd: defaultWD
  });
  let { readFromStdout, afterClose, service } = createChannel({
    writeToStdin(bytes) {
      child.stdin.write(bytes, (err) => {
        if (err) afterClose(err);
      });
    },
    readFileSync: fs2.readFileSync,
    isSync: false,
    hasFS: true,
    esbuild: node_exports
  });
  child.stdin.on("error", afterClose);
  child.on("error", afterClose);
  const stdin = child.stdin;
  const stdout = child.stdout;
  stdout.on("data", readFromStdout);
  stdout.on("end", afterClose);
  stopService = () => {
    stdin.destroy();
    stdout.destroy();
    child.kill();
    initializeWasCalled = false;
    longLivedService = void 0;
    stopService = void 0;
  };
  let refCount = 0;
  child.unref();
  if (stdin.unref) {
    stdin.unref();
  }
  if (stdout.unref) {
    stdout.unref();
  }
  const refs = {
    ref() {
      if (++refCount === 1) child.ref();
    },
    unref() {
      if (--refCount === 0) child.unref();
    }
  };
  longLivedService = {
    build: (options) => new Promise((resolve, reject) => {
      service.buildOrContext({
        callName: "build",
        refs,
        options,
        isTTY: isTTY(),
        defaultWD,
        callback: (err, res) => err ? reject(err) : resolve(res)
      });
    }),
    context: (options) => new Promise((resolve, reject) => service.buildOrContext({
      callName: "context",
      refs,
      options,
      isTTY: isTTY(),
      defaultWD,
      callback: (err, res) => err ? reject(err) : resolve(res)
    })),
    transform: (input, options) => new Promise((resolve, reject) => service.transform({
      callName: "transform",
      refs,
      input,
      options: options || {},
      isTTY: isTTY(),
      fs: fsAsync,
      callback: (err, res) => err ? reject(err) : resolve(res)
    })),
    formatMessages: (messages, options) => new Promise((resolve, reject) => service.formatMessages({
      callName: "formatMessages",
      refs,
      messages,
      options,
      callback: (err, res) => err ? reject(err) : resolve(res)
    })),
    analyzeMetafile: (metafile, options) => new Promise((resolve, reject) => service.analyzeMetafile({
      callName: "analyzeMetafile",
      refs,
      metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
      options,
      callback: (err, res) => err ? reject(err) : resolve(res)
    }))
  };
  return longLivedService;
};
var runServiceSync = (callback) => {
  let [command, args] = esbuildCommandAndArgs();
  let stdin = new Uint8Array();
  let { readFromStdout, afterClose, service } = createChannel({
    writeToStdin(bytes) {
      if (stdin.length !== 0) throw new Error("Must run at most one command");
      stdin = bytes;
    },
    isSync: true,
    hasFS: true,
    esbuild: node_exports
  });
  callback(service);
  let stdout = child_process.execFileSync(command, args.concat(`--service=${"0.21.5"}`), {
    cwd: defaultWD,
    windowsHide: true,
    input: stdin,
    // We don't know how large the output could be. If it's too large, the
    // command will fail with ENOBUFS. Reserve 16mb for now since that feels
    // like it should be enough. Also allow overriding this with an environment
    // variable.
    maxBuffer: +process.env.ESBUILD_MAX_BUFFER || 16 * 1024 * 1024
  });
  readFromStdout(stdout);
  afterClose(null);
};
var randomFileName = () => {
  return path2.join(os2.tmpdir(), `esbuild-${crypto.randomBytes(32).toString("hex")}`);
};
var workerThreadService = null;
var startWorkerThreadService = (worker_threads2) => {
  let { port1: mainPort, port2: workerPort } = new worker_threads2.MessageChannel();
  let worker = new worker_threads2.Worker(__filename, {
    workerData: { workerPort, defaultWD, esbuildVersion: "0.21.5" },
    transferList: [workerPort],
    // From node's documentation: https://nodejs.org/api/worker_threads.html
    //
    //   Take care when launching worker threads from preload scripts (scripts loaded
    //   and run using the `-r` command line flag). Unless the `execArgv` option is
    //   explicitly set, new Worker threads automatically inherit the command line flags
    //   from the running process and will preload the same preload scripts as the main
    //   thread. If the preload script unconditionally launches a worker thread, every
    //   thread spawned will spawn another until the application crashes.
    //
    execArgv: []
  });
  let nextID = 0;
  let fakeBuildError = (text) => {
    let error = new Error(`Build failed with 1 error:
error: ${text}`);
    let errors = [{ id: "", pluginName: "", text, location: null, notes: [], detail: void 0 }];
    error.errors = errors;
    error.warnings = [];
    return error;
  };
  let validateBuildSyncOptions = (options) => {
    if (!options) return;
    let plugins = options.plugins;
    if (plugins && plugins.length > 0) throw fakeBuildError(`Cannot use plugins in synchronous API calls`);
  };
  let applyProperties = (object, properties) => {
    for (let key in properties) {
      object[key] = properties[key];
    }
  };
  let runCallSync = (command, args) => {
    let id = nextID++;
    let sharedBuffer = new SharedArrayBuffer(8);
    let sharedBufferView = new Int32Array(sharedBuffer);
    let msg = { sharedBuffer, id, command, args };
    worker.postMessage(msg);
    let status = Atomics.wait(sharedBufferView, 0, 0);
    if (status !== "ok" && status !== "not-equal") throw new Error("Internal error: Atomics.wait() failed: " + status);
    let { message: { id: id2, resolve, reject, properties } } = worker_threads2.receiveMessageOnPort(mainPort);
    if (id !== id2) throw new Error(`Internal error: Expected id ${id} but got id ${id2}`);
    if (reject) {
      applyProperties(reject, properties);
      throw reject;
    }
    return resolve;
  };
  worker.unref();
  return {
    buildSync(options) {
      validateBuildSyncOptions(options);
      return runCallSync("build", [options]);
    },
    transformSync(input, options) {
      return runCallSync("transform", [input, options]);
    },
    formatMessagesSync(messages, options) {
      return runCallSync("formatMessages", [messages, options]);
    },
    analyzeMetafileSync(metafile, options) {
      return runCallSync("analyzeMetafile", [metafile, options]);
    },
    stop() {
      worker.terminate();
      workerThreadService = null;
    }
  };
};
var startSyncServiceWorker = () => {
  let workerPort = worker_threads.workerData.workerPort;
  let parentPort = worker_threads.parentPort;
  let extractProperties = (object) => {
    let properties = {};
    if (object && typeof object === "object") {
      for (let key in object) {
        properties[key] = object[key];
      }
    }
    return properties;
  };
  try {
    let service = ensureServiceIsRunning();
    defaultWD = worker_threads.workerData.defaultWD;
    parentPort.on("message", (msg) => {
      (async () => {
        let { sharedBuffer, id, command, args } = msg;
        let sharedBufferView = new Int32Array(sharedBuffer);
        try {
          switch (command) {
            case "build":
              workerPort.postMessage({ id, resolve: await service.build(args[0]) });
              break;
            case "transform":
              workerPort.postMessage({ id, resolve: await service.transform(args[0], args[1]) });
              break;
            case "formatMessages":
              workerPort.postMessage({ id, resolve: await service.formatMessages(args[0], args[1]) });
              break;
            case "analyzeMetafile":
              workerPort.postMessage({ id, resolve: await service.analyzeMetafile(args[0], args[1]) });
              break;
            default:
              throw new Error(`Invalid command: ${command}`);
          }
        } catch (reject) {
          workerPort.postMessage({ id, reject, properties: extractProperties(reject) });
        }
        Atomics.add(sharedBufferView, 0, 1);
        Atomics.notify(sharedBufferView, 0, Infinity);
      })();
    });
  } catch (reject) {
    parentPort.on("message", (msg) => {
      let { sharedBuffer, id } = msg;
      let sharedBufferView = new Int32Array(sharedBuffer);
      workerPort.postMessage({ id, reject, properties: extractProperties(reject) });
      Atomics.add(sharedBufferView, 0, 1);
      Atomics.notify(sharedBufferView, 0, Infinity);
    });
  }
};
if (isInternalWorkerThread) {
  startSyncServiceWorker();
}
var node_default = node_exports;
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ "./node_modules/esbuild/lib sync recursive":
/*!****************************************!*\
  !*** ./node_modules/esbuild/lib/ sync ***!
  \****************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/esbuild/lib sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "./node_modules/esbuild/lib sync recursive ^.*\\/.*$":
/*!*************************************************!*\
  !*** ./node_modules/esbuild/lib/ sync ^.*\/.*$ ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./main": "./node_modules/esbuild/lib/main.js",
	"./main.d.ts": "./node_modules/esbuild/lib/main.d.ts",
	"./main.js": "./node_modules/esbuild/lib/main.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/esbuild/lib sync recursive ^.*\\/.*$";

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $Error = __webpack_require__(/*! es-errors */ "./node_modules/es-errors/index.js");
var $EvalError = __webpack_require__(/*! es-errors/eval */ "./node_modules/es-errors/eval.js");
var $RangeError = __webpack_require__(/*! es-errors/range */ "./node_modules/es-errors/range.js");
var $ReferenceError = __webpack_require__(/*! es-errors/ref */ "./node_modules/es-errors/ref.js");
var $SyntaxError = __webpack_require__(/*! es-errors/syntax */ "./node_modules/es-errors/syntax.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $URIError = __webpack_require__(/*! es-errors/uri */ "./node_modules/es-errors/uri.js");

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();
var hasProto = __webpack_require__(/*! has-proto */ "./node_modules/has-proto/index.js")();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! hasown */ "./node_modules/hasown/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/gopd/index.js":
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "./node_modules/has-proto/index.js":
/*!*****************************************!*\
  !*** ./node_modules/has-proto/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


var test = {
	__proto__: null,
	foo: {}
};

var $Object = Object;

/** @type {import('.')} */
module.exports = function hasProto() {
	// @ts-expect-error: TS errors on an inherited property for some reason
	return { __proto__: test }.foo === test.foo
		&& !(test instanceof $Object);
};


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/hasown/index.js":
/*!**************************************!*\
  !*** ./node_modules/hasown/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/object-inspect/index.js":
/*!**********************************************!*\
  !*** ./node_modules/object-inspect/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
// ie, `has-tostringtag/shams
var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
    ? Symbol.toStringTag
    : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

function addNumericSeparator(num, str) {
    if (
        num === Infinity
        || num === -Infinity
        || num !== num
        || (num && num > -1000 && num < 1000)
        || $test.call(/e/, str)
    ) {
        return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === 'number') {
        var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
        if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, '$&_') + '.' + $replace.call($replace.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
        }
    }
    return $replace.call(str, sepRegex, '$&_');
}

var utilInspect = __webpack_require__(/*! ./util.inspect */ "?2128");
var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;

module.exports = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
    }

    if (
        has(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === 'bigint') {
        var bigIntStr = String(obj) + 'n';
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function' && !isRegExp(obj)) { // in older engines, regexes are callable
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + $join.call(xs, ', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
            return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
        }
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
            mapForEach.call(obj, function (value, key) {
                mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
            });
        }
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
            setForEach.call(obj, function (value) {
                setParts.push(inspect(value, obj));
            });
        }
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    // note: in IE 8, sometimes `global !== window` but both are the prototypes of each other
    /* eslint-env browser */
    if (typeof window !== 'undefined' && obj === window) {
        return '{ [object Window] }';
    }
    if (
        (typeof globalThis !== 'undefined' && obj === globalThis)
        || (typeof __webpack_require__.g !== 'undefined' && obj === __webpack_require__.g)
    ) {
        return '{ [object globalThis] }';
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + $join.call(ys, ', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return $replace.call(String(s), /"/g, '&quot;');
}

function isArray(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
    }
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = $replace.call($replace.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), ' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
            symMap['$' + syms[k]] = syms[k];
        }
    }

    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/object.assign/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/object.assign/implementation.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var objectKeys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var toObject = Object;
var $push = callBound('Array.prototype.push');
var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
module.exports = function assign(target, source1) {
	if (target == null) { throw new TypeError('target must be an object'); }
	var to = toObject(target); // step 1
	if (arguments.length === 1) {
		return to; // step 2
	}
	for (var s = 1; s < arguments.length; ++s) {
		var from = toObject(arguments[s]); // step 3.a.i

		// step 3.a.ii:
		var keys = objectKeys(from);
		var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			var syms = getSymbols(from);
			for (var j = 0; j < syms.length; ++j) {
				var key = syms[j];
				if ($propIsEnumerable(from, key)) {
					$push(keys, key);
				}
			}
		}

		// step 3.a.iii:
		for (var i = 0; i < keys.length; ++i) {
			var nextKey = keys[i];
			if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
				var propValue = from[nextKey]; // step 3.a.iii.2.a
				to[nextKey] = propValue; // step 3.a.iii.2.b
			}
		}
	}

	return to; // step 4
};


/***/ }),

/***/ "./node_modules/object.assign/polyfill.js":
/*!************************************************!*\
  !*** ./node_modules/object.assign/polyfill.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object.assign/implementation.js");

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	/*
	 * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	 * note: this does not detect the bug unless there's 20 characters
	 */
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	/*
	 * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	 * which is 72% slower than our shim, and Firefox 40's native implementation.
	 */
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/punycode/punycode.js":
/*!*******************************************!*\
  !*** ./node_modules/punycode/punycode.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowEmptyArrays: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decodeDotInKeys: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    duplicates: 'combine',
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictDepth: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = { __proto__: null };

    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    cleanStr = cleanStr.replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        var existing = has.call(obj, key);
        if (existing && options.duplicates === 'combine') {
            obj[key] = utils.combine(obj[key], val);
        } else if (!existing || options.duplicates === 'last') {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = options.allowEmptyArrays && (leaf === '' || (options.strictNullHandling && leaf === null))
                ? []
                : [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, '.') : cleanRoot;
            var index = parseInt(decodedRoot, 10);
            if (!options.parseArrays && decodedRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== decodedRoot
                && String(index) === decodedRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else if (decodedRoot !== '__proto__') {
                obj[decodedRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, check strictDepth option for throw, else just add whatever is left

    if (segment) {
        if (options.strictDepth === true) {
            throw new RangeError('Input depth exceeded depth option of ' + options.depth + ' and strictDepth is true');
        }
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (typeof opts.allowEmptyArrays !== 'undefined' && typeof opts.allowEmptyArrays !== 'boolean') {
        throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
    }

    if (typeof opts.decodeDotInKeys !== 'undefined' && typeof opts.decodeDotInKeys !== 'boolean') {
        throw new TypeError('`decodeDotInKeys` option can only be `true` or `false`, when provided');
    }

    if (opts.decoder !== null && typeof opts.decoder !== 'undefined' && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    var duplicates = typeof opts.duplicates === 'undefined' ? defaults.duplicates : opts.duplicates;

    if (duplicates !== 'combine' && duplicates !== 'first' && duplicates !== 'last') {
        throw new TypeError('The duplicates option must be either combine, first, or last');
    }

    var allowDots = typeof opts.allowDots === 'undefined' ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;

    return {
        allowDots: allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === 'boolean' ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decodeDotInKeys: typeof opts.decodeDotInKeys === 'boolean' ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        duplicates: duplicates,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictDepth: typeof opts.strictDepth === 'boolean' ? !!opts.strictDepth : defaults.strictDepth,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    if (options.allowSparse === true) {
        return obj;
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getSideChannel = __webpack_require__(/*! side-channel */ "./node_modules/side-channel/index.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    allowEmptyArrays: false,
    arrayFormat: 'indices',
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encodeDotInKeys: false,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var sentinel = {};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    commaRoundTrip,
    allowEmptyArrays,
    strictNullHandling,
    skipNulls,
    encodeDotInKeys,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel
) {
    var obj = object;

    var tmpSc = sideChannel;
    var step = 0;
    var findFlag = false;
    while ((tmpSc = tmpSc.get(sentinel)) !== void undefined && !findFlag) {
        // Where object last appeared in the ref tree
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== 'undefined') {
            if (pos === step) {
                throw new RangeError('Cyclic object value');
            } else {
                findFlag = true; // Break while
            }
        }
        if (typeof tmpSc.get(sentinel) === 'undefined') {
            step = 0;
        }
    }

    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        if (encodeValuesOnly && encoder) {
            obj = utils.maybeMap(obj, encoder);
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
    } else if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    var encodedPrefix = encodeDotInKeys ? prefix.replace(/\./g, '%2E') : prefix;

    var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + '[]' : encodedPrefix;

    if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
        return adjustedPrefix + '[]';
    }

    for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var encodedKey = allowDots && encodeDotInKeys ? key.replace(/\./g, '%2E') : key;
        var keyPrefix = isArray(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix
            : adjustedPrefix + (allowDots ? '.' + encodedKey : '[' + encodedKey + ']');

        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            allowEmptyArrays,
            strictNullHandling,
            skipNulls,
            encodeDotInKeys,
            generateArrayPrefix === 'comma' && encodeValuesOnly && isArray(obj) ? null : encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (typeof opts.allowEmptyArrays !== 'undefined' && typeof opts.allowEmptyArrays !== 'boolean') {
        throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
    }

    if (typeof opts.encodeDotInKeys !== 'undefined' && typeof opts.encodeDotInKeys !== 'boolean') {
        throw new TypeError('`encodeDotInKeys` option can only be `true` or `false`, when provided');
    }

    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    var arrayFormat;
    if (opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if ('indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = defaults.arrayFormat;
    }

    if ('commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean') {
        throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
    }

    var allowDots = typeof opts.allowDots === 'undefined' ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === 'boolean' ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        arrayFormat: arrayFormat,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        commaRoundTrip: opts.commaRoundTrip,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encodeDotInKeys: typeof opts.encodeDotInKeys === 'boolean' ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
    var commaRoundTrip = generateArrayPrefix === 'comma' && options.commaRoundTrip;

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    var sideChannel = getSideChannel();
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            commaRoundTrip,
            options.allowEmptyArrays,
            options.strictNullHandling,
            options.skipNulls,
            options.encodeDotInKeys,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var limit = 1024;

/* eslint operator-linebreak: [2, "before"] */

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var j = 0; j < string.length; j += limit) {
        var segment = string.length >= limit ? string.slice(j, j + limit) : string;
        var arr = [];

        for (var i = 0; i < segment.length; ++i) {
            var c = segment.charCodeAt(i);
            if (
                c === 0x2D // -
                || c === 0x2E // .
                || c === 0x5F // _
                || c === 0x7E // ~
                || (c >= 0x30 && c <= 0x39) // 0-9
                || (c >= 0x41 && c <= 0x5A) // a-z
                || (c >= 0x61 && c <= 0x7A) // A-Z
                || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
            ) {
                arr[arr.length] = segment.charAt(i);
                continue;
            }

            if (c < 0x80) {
                arr[arr.length] = hexTable[c];
                continue;
            }

            if (c < 0x800) {
                arr[arr.length] = hexTable[0xC0 | (c >> 6)]
                    + hexTable[0x80 | (c & 0x3F)];
                continue;
            }

            if (c < 0xD800 || c >= 0xE000) {
                arr[arr.length] = hexTable[0xE0 | (c >> 12)]
                    + hexTable[0x80 | ((c >> 6) & 0x3F)]
                    + hexTable[0x80 | (c & 0x3F)];
                continue;
            }

            i += 1;
            c = 0x10000 + (((c & 0x3FF) << 10) | (segment.charCodeAt(i) & 0x3FF));

            arr[arr.length] = hexTable[0xF0 | (c >> 18)]
                + hexTable[0x80 | ((c >> 12) & 0x3F)]
                + hexTable[0x80 | ((c >> 6) & 0x3F)]
                + hexTable[0x80 | (c & 0x3F)];
        }

        out += arr.join('');
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};


/***/ }),

/***/ "./node_modules/rollup/dist/native.js":
/*!********************************************!*\
  !*** ./node_modules/rollup/dist/native.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __dirname = "/";
const { existsSync } = __webpack_require__(/*! node:fs */ "node:fs");
const path = __webpack_require__(/*! node:path */ "node:path");
const { platform, arch, report } = __webpack_require__(/*! node:process */ "node:process");

const isMusl = () => !report.getReport().header.glibcVersionRuntime;

const bindingsByPlatformAndArch = {
	android: {
		arm: { base: 'android-arm-eabi' },
		arm64: { base: 'android-arm64' }
	},
	darwin: {
		arm64: { base: 'darwin-arm64' },
		x64: { base: 'darwin-x64' }
	},
	linux: {
		arm: { base: 'linux-arm-gnueabihf', musl: 'linux-arm-musleabihf' },
		arm64: { base: 'linux-arm64-gnu', musl: 'linux-arm64-musl' },
		ppc64: { base: 'linux-powerpc64le-gnu', musl: null },
		riscv64: { base: 'linux-riscv64-gnu', musl: null },
		s390x: { base: 'linux-s390x-gnu', musl: null },
		x64: { base: 'linux-x64-gnu', musl: 'linux-x64-musl' }
	},
	win32: {
		arm64: { base: 'win32-arm64-msvc' },
		ia32: { base: 'win32-ia32-msvc' },
		x64: { base: 'win32-x64-msvc' }
	}
};

const msvcLinkFilenameByArch = {
	arm64: 'vc_redist.arm64.exe',
	ia32: 'vc_redist.x86.exe',
	x64: 'vc_redist.x64.exe'
};

const packageBase = getPackageBase();
const localName = `./rollup.${packageBase}.node`;
const requireWithFriendlyError = id => {
	try {
		return __webpack_require__("./node_modules/rollup/dist sync recursive")(id);
	} catch (error) {
		if (
			platform === 'win32' &&
			error instanceof Error &&
			error.code === 'ERR_DLOPEN_FAILED' &&
			error.message.includes('The specified module could not be found')
		) {
			const msvcDownloadLink = `https://aka.ms/vs/17/release/${msvcLinkFilenameByArch[arch]}`;
			throw new Error(
				`Failed to load module ${id}. ` +
					'Required DLL was not found. ' +
					'This error usually happens when Microsoft Visual C++ Redistributable is not installed. ' +
					`You can download it from ${msvcDownloadLink}`,
				{ cause: error }
			);
		}

		throw new Error(
			`Cannot find module ${id}. ` +
				`npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). ` +
				'Please try `npm i` again after removing both package-lock.json and node_modules directory.',
			{ cause: error }
		);
	}
};

const { parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16 } = requireWithFriendlyError(
	existsSync(path.join(__dirname, localName)) ? localName : `@rollup/rollup-${packageBase}`
);

function getPackageBase() {
	const imported = bindingsByPlatformAndArch[platform]?.[arch];
	if (!imported) {
		throwUnsupportedError(false);
	}
	if ('musl' in imported && isMusl()) {
		return imported.musl || throwUnsupportedError(true);
	}
	return imported.base;
}

function throwUnsupportedError(isMusl) {
	throw new Error(
		`Your current platform "${platform}${isMusl ? ' (musl)' : ''}" and architecture "${arch}" combination is not yet supported by the native Rollup build. Please use the WASM build "@rollup/wasm-node" instead.

The following platform-architecture combinations are supported:
${Object.entries(bindingsByPlatformAndArch)
	.flatMap(([platformName, architectures]) =>
		Object.entries(architectures).flatMap(([architectureName, { musl }]) => {
			const name = `${platformName}-${architectureName}`;
			return musl ? [name, `${name} (musl)`] : [name];
		})
	)
	.join('\n')}

If this is important to you, please consider supporting Rollup to make a native build for your platform and architecture available.`
	);
}

module.exports.parse = parse;
module.exports.parseAsync = parseAsync;
module.exports.xxhashBase64Url = xxhashBase64Url;
module.exports.xxhashBase36 = xxhashBase36;
module.exports.xxhashBase16 = xxhashBase16;


/***/ }),

/***/ "./node_modules/rollup/dist sync recursive":
/*!****************************************!*\
  !*** ./node_modules/rollup/dist/ sync ***!
  \****************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/rollup/dist sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "./node_modules/set-function-length/index.js":
/*!***************************************************!*\
  !*** ./node_modules/set-function-length/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var define = __webpack_require__(/*! define-data-property */ "./node_modules/define-data-property/index.js");
var hasDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};


/***/ }),

/***/ "./node_modules/side-channel/index.js":
/*!********************************************!*\
  !*** ./node_modules/side-channel/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var inspect = __webpack_require__(/*! object-inspect */ "./node_modules/object-inspect/index.js");

var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);

/*
* This function traverses the list returning the node corresponding to the given key.
*
* That node is also moved to the head of the list, so that if it's accessed again we don't need to traverse the whole list. By doing so, all the recently used nodes can be accessed relatively quickly.
*/
/** @type {import('.').listGetNode} */
var listGetNode = function (list, key) { // eslint-disable-line consistent-return
	/** @type {typeof list | NonNullable<(typeof list)['next']>} */
	var prev = list;
	/** @type {(typeof list)['next']} */
	var curr;
	for (; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			// eslint-disable-next-line no-extra-parens
			curr.next = /** @type {NonNullable<typeof list.next>} */ (list.next);
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

/** @type {import('.').listGet} */
var listGet = function (objects, key) {
	var node = listGetNode(objects, key);
	return node && node.value;
};
/** @type {import('.').listSet} */
var listSet = function (objects, key, value) {
	var node = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = /** @type {import('.').ListNode<typeof value>} */ ({ // eslint-disable-line no-param-reassign, no-extra-parens
			key: key,
			next: objects.next,
			value: value
		});
	}
};
/** @type {import('.').listHas} */
var listHas = function (objects, key) {
	return !!listGetNode(objects, key);
};

/** @type {import('.')} */
module.exports = function getSideChannel() {
	/** @type {WeakMap<object, unknown>} */ var $wm;
	/** @type {Map<object, unknown>} */ var $m;
	/** @type {import('.').RootNode<unknown>} */ var $o;

	/** @type {import('.').Channel} */
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					// Initialize the linked list as an empty node, so that we don't have to special-case handling of the first node: we can always refer to it as (previous node).next, instead of something like (list).head
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*
 * Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */



var punycode = __webpack_require__(/*! punycode/ */ "./node_modules/punycode/punycode.js");

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

/*
 * define these here so at least they only have to be
 * compiled once on the first module load.
 */
var protocolPattern = /^([a-z0-9.+-]+:)/i,
  portPattern = /:[0-9]*$/,

  // Special case for a simple path URL
  simplePathPattern = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,

  /*
   * RFC 2396: characters reserved for delimiting URLs.
   * We actually just auto-escape these.
   */
  delims = [
    '<', '>', '"', '`', ' ', '\r', '\n', '\t'
  ],

  // RFC 2396: characters not allowed for various reasons.
  unwise = [
    '{', '}', '|', '\\', '^', '`'
  ].concat(delims),

  // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
  autoEscape = ['\''].concat(unwise),
  /*
   * Characters that are never ever allowed in a hostname.
   * Note that any invalid chars are also handled, but these
   * are the ones that are *expected* to be seen, so we fast-path
   * them.
   */
  nonHostChars = [
    '%', '/', '?', ';', '#'
  ].concat(autoEscape),
  hostEndingChars = [
    '/', '?', '#'
  ],
  hostnameMaxLen = 255,
  hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
  hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  // protocols that can allow "unsafe" and "unwise" chars.
  unsafeProtocol = {
    javascript: true,
    'javascript:': true
  },
  // protocols that never have a hostname.
  hostlessProtocol = {
    javascript: true,
    'javascript:': true
  },
  // protocols that always contain a // bit.
  slashedProtocol = {
    http: true,
    https: true,
    ftp: true,
    gopher: true,
    file: true,
    'http:': true,
    'https:': true,
    'ftp:': true,
    'gopher:': true,
    'file:': true
  },
  querystring = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && typeof url === 'object' && url instanceof Url) { return url; }

  var u = new Url();
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
  if (typeof url !== 'string') {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  /*
   * Copy chrome, IE, opera backslash-handling behavior.
   * Back slashes before the query string get converted to forward slashes
   * See: https://code.google.com/p/chromium/issues/detail?id=25916
   */
  var queryIndex = url.indexOf('?'),
    splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
    uSplit = url.split(splitter),
    slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  /*
   * trim before proceeding.
   * This is to support parse stuff like "  http://foo.com  \n"
   */
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  /*
   * figure out if it's got a host
   * user@server is *always* interpreted as a hostname, and url
   * resolution will treat //foo/bar as host=foo,path=bar because that's
   * how the browser resolves relative URLs.
   */
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@/]+@[^@/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] && (slashes || (proto && !slashedProtocol[proto]))) {

    /*
     * there's a hostname.
     * the first instance of /, ?, ;, or # ends the host.
     *
     * If there is an @ in the hostname, then non-host chars *are* allowed
     * to the left of the last @ sign, unless some host-ending character
     * comes *before* the @-sign.
     * URLs are obnoxious.
     *
     * ex:
     * http://a@b@c/ => user:a@b host:c
     * http://a@b?@c => user:a host:c path:/?@c
     */

    /*
     * v0.12 TODO(isaacs): This is not quite how Chrome does things.
     * Review our test case against browsers more comprehensively.
     */

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) { hostEnd = hec; }
    }

    /*
     * at this point, either we have an explicit point where the
     * auth portion cannot go past, or the last @ char is the decider.
     */
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      /*
       * atSign must be in auth portion.
       * http://a@b/c@d => host:b auth:a path:/c@d
       */
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    /*
     * Now we have a portion which is definitely the auth.
     * Pull that off.
     */
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) { hostEnd = hec; }
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1) { hostEnd = rest.length; }

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    /*
     * we've indicated that there is a hostname,
     * so even if it's empty, it has to be present.
     */
    this.hostname = this.hostname || '';

    /*
     * if hostname begins with [ and ends with ]
     * assume that it's an IPv6 address.
     */
    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) { continue; }
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              /*
               * we replace non-ASCII char with a temporary placeholder
               * we need this to make sure size of hostname is not
               * broken by replacing non-ASCII by nothing
               */
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      /*
       * IDNA Support: Returns a punycoded representation of "domain".
       * It only converts parts of the domain name that
       * have non-ASCII characters, i.e. it doesn't matter if
       * you call it with a domain that already is ASCII-only.
       */
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    /*
     * strip [ and ] from the hostname
     * the host field still retains them, though
     */
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  /*
   * now rest is set to the post-host stuff.
   * chop off any delim chars.
   */
  if (!unsafeProtocol[lowerProto]) {

    /*
     * First, make 100% sure that any "autoEscape" chars get
     * escaped, even if encodeURIComponent doesn't think they
     * need to be.
     */
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1) { continue; }
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }

  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) { this.pathname = rest; }
  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  // to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  /*
   * ensure it's an object, and not a string url.
   * If it's an obj, this is a no-op.
   * this way, you can call url_format() on strings
   * to clean up potentially wonky urls.
   */
  if (typeof obj === 'string') { obj = urlParse(obj); }
  if (!(obj instanceof Url)) { return Url.prototype.format.call(obj); }
  return obj.format();
}

Url.prototype.format = function () {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
    pathname = this.pathname || '',
    hash = this.hash || '',
    host = false,
    query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query && typeof this.query === 'object' && Object.keys(this.query).length) {
    query = querystring.stringify(this.query, {
      arrayFormat: 'repeat',
      addQueryPrefix: false
    });
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') { protocol += ':'; }

  /*
   * only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
   * unless they had them to begin with.
   */
  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') { pathname = '/' + pathname; }
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') { hash = '#' + hash; }
  if (search && search.charAt(0) !== '?') { search = '?' + search; }

  pathname = pathname.replace(/[?#]/g, function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function (relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) { return relative; }
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function (relative) {
  if (typeof relative === 'string') {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  /*
   * hash is always overridden, no matter what.
   * even href="" will remove it.
   */
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol') { result[rkey] = relative[rkey]; }
    }

    // urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
      result.pathname = '/';
      result.path = result.pathname;
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    /*
     * if it's a known url protocol, then changing
     * the protocol does weird things
     * first, if it's not file:, then we MUST have a host,
     * and if there was a path
     * to begin with, then we MUST have a path.
     * if it is file:, then the host is dropped,
     * because that's known to be hostless.
     * anything else is assumed to be absolute.
     */
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift())) { }
      if (!relative.host) { relative.host = ''; }
      if (!relative.hostname) { relative.hostname = ''; }
      if (relPath[0] !== '') { relPath.unshift(''); }
      if (relPath.length < 2) { relPath.unshift(''); }
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
    isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
    mustEndAbs = isRelAbs || isSourceAbs || (result.host && relative.pathname),
    removeAllDots = mustEndAbs,
    srcPath = result.pathname && result.pathname.split('/') || [],
    relPath = relative.pathname && relative.pathname.split('/') || [],
    psychotic = result.protocol && !slashedProtocol[result.protocol];

  /*
   * if the url is a non-slashed url, then relative
   * links like ../.. should be able
   * to crawl up to the hostname, as well.  This is strange.
   * result.protocol has already been set by now.
   * Later on, put the first path part into the host field.
   */
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') { srcPath[0] = result.host; } else { srcPath.unshift(result.host); }
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') { relPath[0] = relative.host; } else { relPath.unshift(relative.host); }
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = relative.host || relative.host === '' ? relative.host : result.host;
    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    /*
     * it's relative
     * throw away the existing file, and take the new path instead.
     */
    if (!srcPath) { srcPath = []; }
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (relative.search != null) {
    /*
     * just pull out the search.
     * like href='?foo'.
     * Put this after the other two cases because it simplifies the booleans
     */
    if (psychotic) {
      result.host = srcPath.shift();
      result.hostname = result.host;
      /*
       * occationaly the auth can get stuck only in host
       * this especially happens in cases like
       * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
       */
      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.hostname = authInHost.shift();
        result.host = result.hostname;
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    // to support http.request
    if (result.pathname !== null || result.search !== null) {
      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    /*
     * no path at all.  easy.
     * we've already handled the other stuff above.
     */
    result.pathname = null;
    // to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  /*
   * if a url ENDs in . or .., then it must get a trailing slash.
   * however, if it ends in anything else non-slashy,
   * then it must NOT get a trailing slash.
   */
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === '';

  /*
   * strip single dots, resolve double dots to parent dir
   * if the path tries to go above the root, `up` ends up > 0
   */
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' || (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
    result.host = result.hostname;
    /*
     * occationaly the auth can get stuck only in host
     * this especially happens in cases like
     * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
     */
    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.hostname = authInHost.shift();
      result.host = result.hostname;
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (srcPath.length > 0) {
    result.pathname = srcPath.join('/');
  } else {
    result.pathname = null;
    result.path = null;
  }

  // to support request.http
  if (result.pathname !== null || result.search !== null) {
    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function () {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) { this.hostname = host; }
};

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;


/***/ }),

/***/ "./node_modules/util/node_modules/inherits/inherits_browser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \*********************************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/util/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/vite/dist/node/chunks lazy recursive":
/*!**************************************************************************!*\
  !*** ./node_modules/vite/dist/node/chunks/ lazy strict namespace object ***!
  \**************************************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./node_modules/vite/dist/node/chunks lazy recursive";
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ "./node_modules/vite/dist/node lazy recursive":
/*!*******************************************************************!*\
  !*** ./node_modules/vite/dist/node/ lazy strict namespace object ***!
  \*******************************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./node_modules/vite/dist/node lazy recursive";
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ "./node_modules/vite/package.json":
/*!****************************************!*\
  !*** ./node_modules/vite/package.json ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "b1e8ee659462bb58.json";

/***/ }),

/***/ "?2128":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./node_modules/rollup/dist/es/parseAst.js":
/*!*************************************************!*\
  !*** ./node_modules/rollup/dist/es/parseAst.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseAst: () => (/* reexport safe */ _shared_parseAst_js__WEBPACK_IMPORTED_MODULE_1__.parseAst),
/* harmony export */   parseAstAsync: () => (/* reexport safe */ _shared_parseAst_js__WEBPACK_IMPORTED_MODULE_1__.parseAstAsync)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../native.js */ "./node_modules/rollup/dist/native.js");
/* harmony import */ var _shared_parseAst_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/parseAst.js */ "./node_modules/rollup/dist/es/shared/parseAst.js");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:path */ "node:path");
/*
  @license
	Rollup.js v4.21.0
	Sun, 18 Aug 2024 05:55:06 GMT - commit c4bb050938778bcbe7b3b3ea3419f7fa70d60f5b

	https://github.com/rollup/rollup

	Released under the MIT License.
*/





/***/ }),

/***/ "./node_modules/rollup/dist/es/shared/parseAst.js":
/*!********************************************************!*\
  !*** ./node_modules/rollup/dist/es/shared/parseAst.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ANNOTATION_KEY: () => (/* binding */ ANNOTATION_KEY),
/* harmony export */   ArrowFunctionExpression: () => (/* binding */ ArrowFunctionExpression),
/* harmony export */   BLANK: () => (/* binding */ BLANK),
/* harmony export */   BlockStatement: () => (/* binding */ BlockStatement),
/* harmony export */   CallExpression: () => (/* binding */ CallExpression),
/* harmony export */   CatchClause: () => (/* binding */ CatchClause),
/* harmony export */   EMPTY_ARRAY: () => (/* binding */ EMPTY_ARRAY),
/* harmony export */   EMPTY_OBJECT: () => (/* binding */ EMPTY_OBJECT),
/* harmony export */   EMPTY_SET: () => (/* binding */ EMPTY_SET),
/* harmony export */   ExportDefaultDeclaration: () => (/* binding */ ExportDefaultDeclaration),
/* harmony export */   ExpressionStatement: () => (/* binding */ ExpressionStatement),
/* harmony export */   FIXED_STRINGS: () => (/* binding */ FIXED_STRINGS),
/* harmony export */   INVALID_ANNOTATION_KEY: () => (/* binding */ INVALID_ANNOTATION_KEY),
/* harmony export */   Identifier: () => (/* binding */ Identifier),
/* harmony export */   LOGLEVEL_DEBUG: () => (/* binding */ LOGLEVEL_DEBUG),
/* harmony export */   LOGLEVEL_ERROR: () => (/* binding */ LOGLEVEL_ERROR),
/* harmony export */   LOGLEVEL_INFO: () => (/* binding */ LOGLEVEL_INFO),
/* harmony export */   LOGLEVEL_WARN: () => (/* binding */ LOGLEVEL_WARN),
/* harmony export */   Literal: () => (/* binding */ Literal),
/* harmony export */   Program: () => (/* binding */ Program),
/* harmony export */   Property: () => (/* binding */ Property),
/* harmony export */   ReturnStatement: () => (/* binding */ ReturnStatement),
/* harmony export */   StaticBlock: () => (/* binding */ StaticBlock),
/* harmony export */   TemplateLiteral: () => (/* binding */ TemplateLiteral),
/* harmony export */   URL_OUTPUT_AMD_BASEPATH: () => (/* binding */ URL_OUTPUT_AMD_BASEPATH),
/* harmony export */   URL_OUTPUT_AMD_ID: () => (/* binding */ URL_OUTPUT_AMD_ID),
/* harmony export */   URL_OUTPUT_DIR: () => (/* binding */ URL_OUTPUT_DIR),
/* harmony export */   URL_OUTPUT_EXTERNALIMPORTATTRIBUTES: () => (/* binding */ URL_OUTPUT_EXTERNALIMPORTATTRIBUTES),
/* harmony export */   URL_OUTPUT_FORMAT: () => (/* binding */ URL_OUTPUT_FORMAT),
/* harmony export */   URL_OUTPUT_GENERATEDCODE: () => (/* binding */ URL_OUTPUT_GENERATEDCODE),
/* harmony export */   URL_OUTPUT_INLINEDYNAMICIMPORTS: () => (/* binding */ URL_OUTPUT_INLINEDYNAMICIMPORTS),
/* harmony export */   URL_OUTPUT_INTEROP: () => (/* binding */ URL_OUTPUT_INTEROP),
/* harmony export */   URL_OUTPUT_MANUALCHUNKS: () => (/* binding */ URL_OUTPUT_MANUALCHUNKS),
/* harmony export */   URL_OUTPUT_SOURCEMAPBASEURL: () => (/* binding */ URL_OUTPUT_SOURCEMAPBASEURL),
/* harmony export */   URL_OUTPUT_SOURCEMAPFILE: () => (/* binding */ URL_OUTPUT_SOURCEMAPFILE),
/* harmony export */   URL_PRESERVEENTRYSIGNATURES: () => (/* binding */ URL_PRESERVEENTRYSIGNATURES),
/* harmony export */   URL_TREESHAKE: () => (/* binding */ URL_TREESHAKE),
/* harmony export */   URL_TREESHAKE_MODULESIDEEFFECTS: () => (/* binding */ URL_TREESHAKE_MODULESIDEEFFECTS),
/* harmony export */   URL_WATCH: () => (/* binding */ URL_WATCH),
/* harmony export */   VariableDeclarator: () => (/* binding */ VariableDeclarator),
/* harmony export */   addTrailingSlashIfMissed: () => (/* binding */ addTrailingSlashIfMissed),
/* harmony export */   augmentCodeLocation: () => (/* binding */ augmentCodeLocation),
/* harmony export */   augmentLogMessage: () => (/* binding */ augmentLogMessage),
/* harmony export */   convertAnnotations: () => (/* binding */ convertAnnotations),
/* harmony export */   convertNode: () => (/* binding */ convertNode),
/* harmony export */   error: () => (/* binding */ error),
/* harmony export */   getAliasName: () => (/* binding */ getAliasName),
/* harmony export */   getAstBuffer: () => (/* binding */ getAstBuffer),
/* harmony export */   getImportPath: () => (/* binding */ getImportPath),
/* harmony export */   getRollupError: () => (/* binding */ getRollupError),
/* harmony export */   isAbsolute: () => (/* binding */ isAbsolute),
/* harmony export */   isPathFragment: () => (/* binding */ isPathFragment),
/* harmony export */   isRelative: () => (/* binding */ isRelative),
/* harmony export */   isValidUrl: () => (/* binding */ isValidUrl),
/* harmony export */   locate: () => (/* binding */ locate),
/* harmony export */   logAddonNotGenerated: () => (/* binding */ logAddonNotGenerated),
/* harmony export */   logAlreadyClosed: () => (/* binding */ logAlreadyClosed),
/* harmony export */   logAmbiguousExternalNamespaces: () => (/* binding */ logAmbiguousExternalNamespaces),
/* harmony export */   logAnonymousPluginCache: () => (/* binding */ logAnonymousPluginCache),
/* harmony export */   logAssetNotFinalisedForFileName: () => (/* binding */ logAssetNotFinalisedForFileName),
/* harmony export */   logAssetReferenceIdNotFoundForSetSource: () => (/* binding */ logAssetReferenceIdNotFoundForSetSource),
/* harmony export */   logAssetSourceAlreadySet: () => (/* binding */ logAssetSourceAlreadySet),
/* harmony export */   logBadLoader: () => (/* binding */ logBadLoader),
/* harmony export */   logCannotAssignModuleToChunk: () => (/* binding */ logCannotAssignModuleToChunk),
/* harmony export */   logCannotCallNamespace: () => (/* binding */ logCannotCallNamespace),
/* harmony export */   logCannotEmitFromOptionsHook: () => (/* binding */ logCannotEmitFromOptionsHook),
/* harmony export */   logChunkInvalid: () => (/* binding */ logChunkInvalid),
/* harmony export */   logChunkNotGeneratedForFileName: () => (/* binding */ logChunkNotGeneratedForFileName),
/* harmony export */   logCircularDependency: () => (/* binding */ logCircularDependency),
/* harmony export */   logCircularReexport: () => (/* binding */ logCircularReexport),
/* harmony export */   logConflictingSourcemapSources: () => (/* binding */ logConflictingSourcemapSources),
/* harmony export */   logConstVariableReassignError: () => (/* binding */ logConstVariableReassignError),
/* harmony export */   logCyclicCrossChunkReexport: () => (/* binding */ logCyclicCrossChunkReexport),
/* harmony export */   logDuplicateArgumentNameError: () => (/* binding */ logDuplicateArgumentNameError),
/* harmony export */   logDuplicateExportError: () => (/* binding */ logDuplicateExportError),
/* harmony export */   logDuplicatePluginName: () => (/* binding */ logDuplicatePluginName),
/* harmony export */   logEmptyChunk: () => (/* binding */ logEmptyChunk),
/* harmony export */   logEntryCannotBeExternal: () => (/* binding */ logEntryCannotBeExternal),
/* harmony export */   logEval: () => (/* binding */ logEval),
/* harmony export */   logExternalModulesCannotBeIncludedInManualChunks: () => (/* binding */ logExternalModulesCannotBeIncludedInManualChunks),
/* harmony export */   logExternalModulesCannotBeTransformedToModules: () => (/* binding */ logExternalModulesCannotBeTransformedToModules),
/* harmony export */   logExternalSyntheticExports: () => (/* binding */ logExternalSyntheticExports),
/* harmony export */   logFailedValidation: () => (/* binding */ logFailedValidation),
/* harmony export */   logFileNameConflict: () => (/* binding */ logFileNameConflict),
/* harmony export */   logFileReferenceIdNotFoundForFilename: () => (/* binding */ logFileReferenceIdNotFoundForFilename),
/* harmony export */   logFirstSideEffect: () => (/* binding */ logFirstSideEffect),
/* harmony export */   logIllegalIdentifierAsName: () => (/* binding */ logIllegalIdentifierAsName),
/* harmony export */   logIllegalImportReassignment: () => (/* binding */ logIllegalImportReassignment),
/* harmony export */   logImplicitDependantCannotBeExternal: () => (/* binding */ logImplicitDependantCannotBeExternal),
/* harmony export */   logImplicitDependantIsNotIncluded: () => (/* binding */ logImplicitDependantIsNotIncluded),
/* harmony export */   logImportAttributeIsInvalid: () => (/* binding */ logImportAttributeIsInvalid),
/* harmony export */   logImportOptionsAreInvalid: () => (/* binding */ logImportOptionsAreInvalid),
/* harmony export */   logIncompatibleExportOptionValue: () => (/* binding */ logIncompatibleExportOptionValue),
/* harmony export */   logInconsistentImportAttributes: () => (/* binding */ logInconsistentImportAttributes),
/* harmony export */   logInputHookInOutputPlugin: () => (/* binding */ logInputHookInOutputPlugin),
/* harmony export */   logInternalIdCannotBeExternal: () => (/* binding */ logInternalIdCannotBeExternal),
/* harmony export */   logInvalidAddonPluginHook: () => (/* binding */ logInvalidAddonPluginHook),
/* harmony export */   logInvalidAnnotation: () => (/* binding */ logInvalidAnnotation),
/* harmony export */   logInvalidExportOptionValue: () => (/* binding */ logInvalidExportOptionValue),
/* harmony export */   logInvalidFormatForTopLevelAwait: () => (/* binding */ logInvalidFormatForTopLevelAwait),
/* harmony export */   logInvalidFunctionPluginHook: () => (/* binding */ logInvalidFunctionPluginHook),
/* harmony export */   logInvalidLogPosition: () => (/* binding */ logInvalidLogPosition),
/* harmony export */   logInvalidOption: () => (/* binding */ logInvalidOption),
/* harmony export */   logInvalidRollupPhaseForChunkEmission: () => (/* binding */ logInvalidRollupPhaseForChunkEmission),
/* harmony export */   logInvalidSetAssetSourceCall: () => (/* binding */ logInvalidSetAssetSourceCall),
/* harmony export */   logInvalidSourcemapForError: () => (/* binding */ logInvalidSourcemapForError),
/* harmony export */   logLevelPriority: () => (/* binding */ logLevelPriority),
/* harmony export */   logMissingEntryExport: () => (/* binding */ logMissingEntryExport),
/* harmony export */   logMissingExport: () => (/* binding */ logMissingExport),
/* harmony export */   logMissingFileOrDirOption: () => (/* binding */ logMissingFileOrDirOption),
/* harmony export */   logMissingGlobalName: () => (/* binding */ logMissingGlobalName),
/* harmony export */   logMissingNameOptionForIifeExport: () => (/* binding */ logMissingNameOptionForIifeExport),
/* harmony export */   logMissingNameOptionForUmdExport: () => (/* binding */ logMissingNameOptionForUmdExport),
/* harmony export */   logMissingNodeBuiltins: () => (/* binding */ logMissingNodeBuiltins),
/* harmony export */   logMixedExport: () => (/* binding */ logMixedExport),
/* harmony export */   logModuleLevelDirective: () => (/* binding */ logModuleLevelDirective),
/* harmony export */   logModuleParseError: () => (/* binding */ logModuleParseError),
/* harmony export */   logNamespaceConflict: () => (/* binding */ logNamespaceConflict),
/* harmony export */   logNoAssetSourceSet: () => (/* binding */ logNoAssetSourceSet),
/* harmony export */   logNoTransformMapOrAstWithoutCode: () => (/* binding */ logNoTransformMapOrAstWithoutCode),
/* harmony export */   logOptimizeChunkStatus: () => (/* binding */ logOptimizeChunkStatus),
/* harmony export */   logParseError: () => (/* binding */ logParseError),
/* harmony export */   logPluginError: () => (/* binding */ logPluginError),
/* harmony export */   logRedeclarationError: () => (/* binding */ logRedeclarationError),
/* harmony export */   logShimmedExport: () => (/* binding */ logShimmedExport),
/* harmony export */   logSourcemapBroken: () => (/* binding */ logSourcemapBroken),
/* harmony export */   logSyntheticNamedExportsNeedNamespaceExport: () => (/* binding */ logSyntheticNamedExportsNeedNamespaceExport),
/* harmony export */   logThisIsUndefined: () => (/* binding */ logThisIsUndefined),
/* harmony export */   logUnexpectedNamedImport: () => (/* binding */ logUnexpectedNamedImport),
/* harmony export */   logUnexpectedNamespaceReexport: () => (/* binding */ logUnexpectedNamespaceReexport),
/* harmony export */   logUnknownOption: () => (/* binding */ logUnknownOption),
/* harmony export */   logUnresolvedEntry: () => (/* binding */ logUnresolvedEntry),
/* harmony export */   logUnresolvedImplicitDependant: () => (/* binding */ logUnresolvedImplicitDependant),
/* harmony export */   logUnresolvedImport: () => (/* binding */ logUnresolvedImport),
/* harmony export */   logUnresolvedImportTreatedAsExternal: () => (/* binding */ logUnresolvedImportTreatedAsExternal),
/* harmony export */   logUnusedExternalImports: () => (/* binding */ logUnusedExternalImports),
/* harmony export */   normalize: () => (/* binding */ normalize),
/* harmony export */   parseAst: () => (/* binding */ parseAst),
/* harmony export */   parseAstAsync: () => (/* binding */ parseAstAsync),
/* harmony export */   printQuotedStringList: () => (/* binding */ printQuotedStringList),
/* harmony export */   relative: () => (/* binding */ relative),
/* harmony export */   relativeId: () => (/* binding */ relativeId),
/* harmony export */   warnDeprecation: () => (/* binding */ warnDeprecation)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../native.js */ "./node_modules/rollup/dist/native.js");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
/*
  @license
	Rollup.js v4.21.0
	Sun, 18 Aug 2024 05:55:06 GMT - commit c4bb050938778bcbe7b3b3ea3419f7fa70d60f5b

	https://github.com/rollup/rollup

	Released under the MIT License.
*/



// This file is generated by scripts/generate-node-types.js.
// Do not edit this file directly.
const ArrowFunctionExpression = 'ArrowFunctionExpression';
const BlockStatement = 'BlockStatement';
const CallExpression = 'CallExpression';
const CatchClause = 'CatchClause';
const ExportDefaultDeclaration = 'ExportDefaultDeclaration';
const ExpressionStatement = 'ExpressionStatement';
const Identifier = 'Identifier';
const Literal = 'Literal';
const PanicError = 'PanicError';
const ParseError = 'ParseError';
const Program = 'Program';
const Property = 'Property';
const ReturnStatement = 'ReturnStatement';
const StaticBlock = 'StaticBlock';
const TemplateLiteral = 'TemplateLiteral';
const VariableDeclarator = 'VariableDeclarator';

const BLANK = Object.freeze(Object.create(null));
const EMPTY_OBJECT = Object.freeze({});
const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_SET = Object.freeze(new (class extends Set {
    add() {
        throw new Error('Cannot add to empty set');
    }
})());

// This file is generated by scripts/generate-string-constants.js.
// Do not edit this file directly.
const FIXED_STRINGS = [
    'var',
    'let',
    'const',
    'init',
    'get',
    'set',
    'constructor',
    'method',
    '-',
    '+',
    '!',
    '~',
    'typeof',
    'void',
    'delete',
    '++',
    '--',
    '==',
    '!=',
    '===',
    '!==',
    '<',
    '<=',
    '>',
    '>=',
    '<<',
    '>>',
    '>>>',
    '+',
    '-',
    '*',
    '/',
    '%',
    '|',
    '^',
    '&',
    '||',
    '&&',
    'in',
    'instanceof',
    '**',
    '??',
    '=',
    '+=',
    '-=',
    '*=',
    '/=',
    '%=',
    '<<=',
    '>>=',
    '>>>=',
    '|=',
    '^=',
    '&=',
    '**=',
    '&&=',
    '||=',
    '??=',
    'pure',
    'noSideEffects',
    'sourcemap',
    'using',
    'await using'
];

const ANNOTATION_KEY = '_rollupAnnotations';
const INVALID_ANNOTATION_KEY = '_rollupRemoved';
const convertAnnotations = (position, buffer) => {
    if (position === 0)
        return EMPTY_ARRAY;
    const length = buffer[position++];
    const list = [];
    for (let index = 0; index < length; index++) {
        list.push(convertAnnotation(buffer[position++], buffer));
    }
    return list;
};
const convertAnnotation = (position, buffer) => {
    const start = buffer[position++];
    const end = buffer[position++];
    const type = FIXED_STRINGS[buffer[position]];
    return { end, start, type };
};

/** @typedef {import('./types').Location} Location */

/**
 * @param {import('./types').Range} range
 * @param {number} index
 */
function rangeContains(range, index) {
	return range.start <= index && index < range.end;
}

/**
 * @param {string} source
 * @param {import('./types').Options} [options]
 */
function getLocator(source, options = {}) {
	const { offsetLine = 0, offsetColumn = 0 } = options;

	let start = 0;
	const ranges = source.split('\n').map((line, i) => {
		const end = start + line.length + 1;

		/** @type {import('./types').Range} */
		const range = { start, end, line: i };

		start = end;
		return range;
	});

	let i = 0;

	/**
	 * @param {string | number} search
	 * @param {number} [index]
	 * @returns {Location | undefined}
	 */
	function locator(search, index) {
		if (typeof search === 'string') {
			search = source.indexOf(search, index ?? 0);
		}

		if (search === -1) return undefined;

		let range = ranges[i];

		const d = search >= range.end ? 1 : -1;

		while (range) {
			if (rangeContains(range, search)) {
				return {
					line: offsetLine + range.line,
					column: offsetColumn + search - range.start,
					character: search
				};
			}

			i += d;
			range = ranges[i];
		}
	}

	return locator;
}

/**
 * @param {string} source
 * @param {string | number} search
 * @param {import('./types').Options} [options]
 * @returns {Location | undefined}
 */
function locate(source, search, options) {
	return getLocator(source, options)(search, options && options.startIndex);
}

function spaces(index) {
    let result = '';
    while (index--)
        result += ' ';
    return result;
}
function tabsToSpaces(value) {
    return value.replace(/^\t+/, match => match.split('\t').join('  '));
}
const LINE_TRUNCATE_LENGTH = 120;
const MIN_CHARACTERS_SHOWN_AFTER_LOCATION = 10;
const ELLIPSIS = '...';
function getCodeFrame(source, line, column) {
    let lines = source.split('\n');
    // Needed if a plugin did not generate correct sourcemaps
    if (line > lines.length)
        return '';
    const maxLineLength = Math.max(tabsToSpaces(lines[line - 1].slice(0, column)).length +
        MIN_CHARACTERS_SHOWN_AFTER_LOCATION +
        ELLIPSIS.length, LINE_TRUNCATE_LENGTH);
    const frameStart = Math.max(0, line - 3);
    let frameEnd = Math.min(line + 2, lines.length);
    lines = lines.slice(frameStart, frameEnd);
    while (!/\S/.test(lines[lines.length - 1])) {
        lines.pop();
        frameEnd -= 1;
    }
    const digits = String(frameEnd).length;
    return lines
        .map((sourceLine, index) => {
        const isErrorLine = frameStart + index + 1 === line;
        let lineNumber = String(index + frameStart + 1);
        while (lineNumber.length < digits)
            lineNumber = ` ${lineNumber}`;
        let displayedLine = tabsToSpaces(sourceLine);
        if (displayedLine.length > maxLineLength) {
            displayedLine = `${displayedLine.slice(0, maxLineLength - ELLIPSIS.length)}${ELLIPSIS}`;
        }
        if (isErrorLine) {
            const indicator = spaces(digits + 2 + tabsToSpaces(sourceLine.slice(0, column)).length) + '^';
            return `${lineNumber}: ${displayedLine}\n${indicator}`;
        }
        return `${lineNumber}: ${displayedLine}`;
    })
        .join('\n');
}

const LOGLEVEL_SILENT = 'silent';
const LOGLEVEL_ERROR = 'error';
const LOGLEVEL_WARN = 'warn';
const LOGLEVEL_INFO = 'info';
const LOGLEVEL_DEBUG = 'debug';
const logLevelPriority = {
    [LOGLEVEL_DEBUG]: 0,
    [LOGLEVEL_INFO]: 1,
    [LOGLEVEL_SILENT]: 3,
    [LOGLEVEL_WARN]: 2
};

const ABSOLUTE_PATH_REGEX = /^(?:\/|(?:[A-Za-z]:)?[/\\|])/;
const RELATIVE_PATH_REGEX = /^\.?\.(\/|$)/;
function isAbsolute(path) {
    return ABSOLUTE_PATH_REGEX.test(path);
}
function isRelative(path) {
    return RELATIVE_PATH_REGEX.test(path);
}
const BACKSLASH_REGEX = /\\/g;
function normalize(path) {
    return path.replace(BACKSLASH_REGEX, '/');
}

function printQuotedStringList(list, verbs) {
    const isSingleItem = list.length <= 1;
    const quotedList = list.map(item => `"${item}"`);
    let output = isSingleItem
        ? quotedList[0]
        : `${quotedList.slice(0, -1).join(', ')} and ${quotedList.slice(-1)[0]}`;
    if (verbs) {
        output += ` ${isSingleItem ? verbs[0] : verbs[1]}`;
    }
    return output;
}

const ANY_SLASH_REGEX = /[/\\]/;
function relative(from, to) {
    const fromParts = from.split(ANY_SLASH_REGEX).filter(Boolean);
    const toParts = to.split(ANY_SLASH_REGEX).filter(Boolean);
    if (fromParts[0] === '.')
        fromParts.shift();
    if (toParts[0] === '.')
        toParts.shift();
    while (fromParts[0] && toParts[0] && fromParts[0] === toParts[0]) {
        fromParts.shift();
        toParts.shift();
    }
    while (toParts[0] === '..' && fromParts.length > 0) {
        toParts.shift();
        fromParts.pop();
    }
    while (fromParts.pop()) {
        toParts.unshift('..');
    }
    return toParts.join('/');
}

function getAliasName(id) {
    const base = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.basename)(id);
    return base.slice(0, Math.max(0, base.length - (0,node_path__WEBPACK_IMPORTED_MODULE_1__.extname)(id).length));
}
function relativeId(id) {
    if (!isAbsolute(id))
        return id;
    return relative((0,node_path__WEBPACK_IMPORTED_MODULE_1__.resolve)(), id);
}
function isPathFragment(name) {
    // starting with "/", "./", "../", "C:/"
    return (name[0] === '/' || (name[0] === '.' && (name[1] === '/' || name[1] === '.')) || isAbsolute(name));
}
const UPPER_DIR_REGEX = /^(\.\.\/)*\.\.$/;
function getImportPath(importerId, targetPath, stripJsExtension, ensureFileName) {
    while (targetPath.startsWith('../')) {
        targetPath = targetPath.slice(3);
        importerId = '_/' + importerId;
    }
    let relativePath = normalize(relative((0,node_path__WEBPACK_IMPORTED_MODULE_1__.dirname)(importerId), targetPath));
    if (stripJsExtension && relativePath.endsWith('.js')) {
        relativePath = relativePath.slice(0, -3);
    }
    if (ensureFileName) {
        if (relativePath === '')
            return '../' + (0,node_path__WEBPACK_IMPORTED_MODULE_1__.basename)(targetPath);
        if (UPPER_DIR_REGEX.test(relativePath)) {
            return [...relativePath.split('/'), '..', (0,node_path__WEBPACK_IMPORTED_MODULE_1__.basename)(targetPath)].join('/');
        }
    }
    return relativePath ? (relativePath.startsWith('..') ? relativePath : './' + relativePath) : '.';
}

function isValidUrl(url) {
    try {
        new URL(url);
    }
    catch {
        return false;
    }
    return true;
}
function getRollupUrl(snippet) {
    return `https://rollupjs.org/${snippet}`;
}
function addTrailingSlashIfMissed(url) {
    if (!url.endsWith('/')) {
        return url + '/';
    }
    return url;
}

// troubleshooting
const URL_AVOIDING_EVAL = 'troubleshooting/#avoiding-eval';
const URL_NAME_IS_NOT_EXPORTED = 'troubleshooting/#error-name-is-not-exported-by-module';
const URL_THIS_IS_UNDEFINED = 'troubleshooting/#error-this-is-undefined';
const URL_TREATING_MODULE_AS_EXTERNAL_DEPENDENCY = 'troubleshooting/#warning-treating-module-as-external-dependency';
const URL_SOURCEMAP_IS_LIKELY_TO_BE_INCORRECT = 'troubleshooting/#warning-sourcemap-is-likely-to-be-incorrect';
const URL_OUTPUT_AMD_ID = 'configuration-options/#output-amd-id';
const URL_OUTPUT_AMD_BASEPATH = 'configuration-options/#output-amd-basepath';
const URL_OUTPUT_DIR = 'configuration-options/#output-dir';
const URL_OUTPUT_EXPORTS = 'configuration-options/#output-exports';
const URL_OUTPUT_EXTEND = 'configuration-options/#output-extend';
const URL_OUTPUT_EXTERNALIMPORTATTRIBUTES = 'configuration-options/#output-externalimportattributes';
const URL_OUTPUT_FORMAT = 'configuration-options/#output-format';
const URL_OUTPUT_GENERATEDCODE = 'configuration-options/#output-generatedcode';
const URL_OUTPUT_GLOBALS = 'configuration-options/#output-globals';
const URL_OUTPUT_INLINEDYNAMICIMPORTS = 'configuration-options/#output-inlinedynamicimports';
const URL_OUTPUT_INTEROP = 'configuration-options/#output-interop';
const URL_OUTPUT_MANUALCHUNKS = 'configuration-options/#output-manualchunks';
const URL_OUTPUT_NAME = 'configuration-options/#output-name';
const URL_OUTPUT_SOURCEMAPBASEURL = 'configuration-options/#output-sourcemapbaseurl';
const URL_OUTPUT_SOURCEMAPFILE = 'configuration-options/#output-sourcemapfile';
const URL_PRESERVEENTRYSIGNATURES = 'configuration-options/#preserveentrysignatures';
const URL_TREESHAKE = 'configuration-options/#treeshake';
const URL_TREESHAKE_PURE = 'configuration-options/#pure';
const URL_TREESHAKE_NOSIDEEFFECTS = 'configuration-options/#no-side-effects';
const URL_TREESHAKE_MODULESIDEEFFECTS = 'configuration-options/#treeshake-modulesideeffects';
const URL_WATCH = 'configuration-options/#watch';

function error(base) {
    throw base instanceof Error ? base : getRollupError(base);
}
function getRollupError(base) {
    augmentLogMessage(base);
    const errorInstance = Object.assign(new Error(base.message), base);
    Object.defineProperty(errorInstance, 'name', {
        value: 'RollupError',
        writable: true
    });
    return errorInstance;
}
function augmentCodeLocation(properties, pos, source, id) {
    if (typeof pos === 'object') {
        const { line, column } = pos;
        properties.loc = { column, file: id, line };
    }
    else {
        properties.pos = pos;
        const location = locate(source, pos, { offsetLine: 1 });
        if (!location) {
            return;
        }
        const { line, column } = location;
        properties.loc = { column, file: id, line };
    }
    if (properties.frame === undefined) {
        const { line, column } = properties.loc;
        properties.frame = getCodeFrame(source, line, column);
    }
}
const symbolAugmented = Symbol('augmented');
function augmentLogMessage(log) {
    // Make sure to only augment the log message once
    if (!(log.plugin || log.loc) || log[symbolAugmented]) {
        return;
    }
    log[symbolAugmented] = true;
    let prefix = '';
    if (log.plugin) {
        prefix += `[plugin ${log.plugin}] `;
    }
    const id = log.id || log.loc?.file;
    if (id) {
        const position = log.loc ? ` (${log.loc.line}:${log.loc.column})` : '';
        prefix += `${relativeId(id)}${position}: `;
    }
    log.message = prefix + log.message;
}
// Error codes should be sorted alphabetically while errors should be sorted by
// error code below
const ADDON_ERROR = 'ADDON_ERROR', ALREADY_CLOSED = 'ALREADY_CLOSED', AMBIGUOUS_EXTERNAL_NAMESPACES = 'AMBIGUOUS_EXTERNAL_NAMESPACES', ANONYMOUS_PLUGIN_CACHE = 'ANONYMOUS_PLUGIN_CACHE', ASSET_NOT_FINALISED = 'ASSET_NOT_FINALISED', ASSET_NOT_FOUND = 'ASSET_NOT_FOUND', ASSET_SOURCE_ALREADY_SET = 'ASSET_SOURCE_ALREADY_SET', ASSET_SOURCE_MISSING = 'ASSET_SOURCE_MISSING', BAD_LOADER = 'BAD_LOADER', CANNOT_CALL_NAMESPACE = 'CANNOT_CALL_NAMESPACE', CANNOT_EMIT_FROM_OPTIONS_HOOK = 'CANNOT_EMIT_FROM_OPTIONS_HOOK', CHUNK_NOT_GENERATED = 'CHUNK_NOT_GENERATED', CHUNK_INVALID = 'CHUNK_INVALID', CIRCULAR_DEPENDENCY = 'CIRCULAR_DEPENDENCY', CIRCULAR_REEXPORT = 'CIRCULAR_REEXPORT', CONST_REASSIGN = 'CONST_REASSIGN', CYCLIC_CROSS_CHUNK_REEXPORT = 'CYCLIC_CROSS_CHUNK_REEXPORT', DEPRECATED_FEATURE = 'DEPRECATED_FEATURE', DUPLICATE_ARGUMENT_NAME = 'DUPLICATE_ARGUMENT_NAME', DUPLICATE_EXPORT = 'DUPLICATE_EXPORT', DUPLICATE_PLUGIN_NAME = 'DUPLICATE_PLUGIN_NAME', EMPTY_BUNDLE = 'EMPTY_BUNDLE', EVAL = 'EVAL', EXTERNAL_MODULES_CANNOT_BE_INCLUDED_IN_MANUAL_CHUNKS = 'EXTERNAL_MODULES_CANNOT_BE_INCLUDED_IN_MANUAL_CHUNKS', EXTERNAL_MODULES_CANNOT_BE_TRANSFORMED_TO_MODULES = 'EXTERNAL_MODULES_CANNOT_BE_TRANSFORMED_TO_MODULES', EXTERNAL_SYNTHETIC_EXPORTS = 'EXTERNAL_SYNTHETIC_EXPORTS', FILE_NAME_CONFLICT = 'FILE_NAME_CONFLICT', FILE_NOT_FOUND = 'FILE_NOT_FOUND', FIRST_SIDE_EFFECT = 'FIRST_SIDE_EFFECT', ILLEGAL_IDENTIFIER_AS_NAME = 'ILLEGAL_IDENTIFIER_AS_NAME', ILLEGAL_REASSIGNMENT = 'ILLEGAL_REASSIGNMENT', INCONSISTENT_IMPORT_ATTRIBUTES = 'INCONSISTENT_IMPORT_ATTRIBUTES', INVALID_ANNOTATION = 'INVALID_ANNOTATION', INPUT_HOOK_IN_OUTPUT_PLUGIN = 'INPUT_HOOK_IN_OUTPUT_PLUGIN', INVALID_CHUNK = 'INVALID_CHUNK', INVALID_EXPORT_OPTION = 'INVALID_EXPORT_OPTION', INVALID_EXTERNAL_ID = 'INVALID_EXTERNAL_ID', INVALID_IMPORT_ATTRIBUTE = 'INVALID_IMPORT_ATTRIBUTE', INVALID_LOG_POSITION = 'INVALID_LOG_POSITION', INVALID_OPTION = 'INVALID_OPTION', INVALID_PLUGIN_HOOK = 'INVALID_PLUGIN_HOOK', INVALID_ROLLUP_PHASE = 'INVALID_ROLLUP_PHASE', INVALID_SETASSETSOURCE = 'INVALID_SETASSETSOURCE', INVALID_TLA_FORMAT = 'INVALID_TLA_FORMAT', MISSING_EXPORT = 'MISSING_EXPORT', MISSING_GLOBAL_NAME = 'MISSING_GLOBAL_NAME', MISSING_IMPLICIT_DEPENDANT = 'MISSING_IMPLICIT_DEPENDANT', MISSING_NAME_OPTION_FOR_IIFE_EXPORT = 'MISSING_NAME_OPTION_FOR_IIFE_EXPORT', MISSING_NODE_BUILTINS = 'MISSING_NODE_BUILTINS', MISSING_OPTION = 'MISSING_OPTION', MIXED_EXPORTS = 'MIXED_EXPORTS', MODULE_LEVEL_DIRECTIVE = 'MODULE_LEVEL_DIRECTIVE', NAMESPACE_CONFLICT = 'NAMESPACE_CONFLICT', NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE = 'NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE', OPTIMIZE_CHUNK_STATUS = 'OPTIMIZE_CHUNK_STATUS', PARSE_ERROR = 'PARSE_ERROR', PLUGIN_ERROR = 'PLUGIN_ERROR', REDECLARATION_ERROR = 'REDECLARATION_ERROR', SHIMMED_EXPORT = 'SHIMMED_EXPORT', SOURCEMAP_BROKEN = 'SOURCEMAP_BROKEN', SOURCEMAP_ERROR = 'SOURCEMAP_ERROR', SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT = 'SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT', THIS_IS_UNDEFINED = 'THIS_IS_UNDEFINED', UNEXPECTED_NAMED_IMPORT = 'UNEXPECTED_NAMED_IMPORT', UNKNOWN_OPTION = 'UNKNOWN_OPTION', UNRESOLVED_ENTRY = 'UNRESOLVED_ENTRY', UNRESOLVED_IMPORT = 'UNRESOLVED_IMPORT', UNUSED_EXTERNAL_IMPORT = 'UNUSED_EXTERNAL_IMPORT', VALIDATION_ERROR = 'VALIDATION_ERROR';
function logAddonNotGenerated(message, hook, plugin) {
    return {
        code: ADDON_ERROR,
        message: `Could not retrieve "${hook}". Check configuration of plugin "${plugin}".
\tError Message: ${message}`
    };
}
function logAlreadyClosed() {
    return {
        code: ALREADY_CLOSED,
        message: 'Bundle is already closed, no more calls to "generate" or "write" are allowed.'
    };
}
function logAmbiguousExternalNamespaces(binding, reexportingModule, usedModule, sources) {
    return {
        binding,
        code: AMBIGUOUS_EXTERNAL_NAMESPACES,
        ids: sources,
        message: `Ambiguous external namespace resolution: "${relativeId(reexportingModule)}" re-exports "${binding}" from one of the external modules ${printQuotedStringList(sources.map(module => relativeId(module)))}, guessing "${relativeId(usedModule)}".`,
        reexporter: reexportingModule
    };
}
function logAnonymousPluginCache() {
    return {
        code: ANONYMOUS_PLUGIN_CACHE,
        message: 'A plugin is trying to use the Rollup cache but is not declaring a plugin name or cacheKey.'
    };
}
function logAssetNotFinalisedForFileName(name) {
    return {
        code: ASSET_NOT_FINALISED,
        message: `Plugin error - Unable to get file name for asset "${name}". Ensure that the source is set and that generate is called first. If you reference assets via import.meta.ROLLUP_FILE_URL_<referenceId>, you need to either have set their source after "renderStart" or need to provide an explicit "fileName" when emitting them.`
    };
}
function logAssetReferenceIdNotFoundForSetSource(assetReferenceId) {
    return {
        code: ASSET_NOT_FOUND,
        message: `Plugin error - Unable to set the source for unknown asset "${assetReferenceId}".`
    };
}
function logAssetSourceAlreadySet(name) {
    return {
        code: ASSET_SOURCE_ALREADY_SET,
        message: `Unable to set the source for asset "${name}", source already set.`
    };
}
function logNoAssetSourceSet(assetName) {
    return {
        code: ASSET_SOURCE_MISSING,
        message: `Plugin error creating asset "${assetName}" - no asset source set.`
    };
}
function logBadLoader(id) {
    return {
        code: BAD_LOADER,
        message: `Error loading "${relativeId(id)}": plugin load hook should return a string, a { code, map } object, or nothing/null.`
    };
}
function logCannotCallNamespace(name) {
    return {
        code: CANNOT_CALL_NAMESPACE,
        message: `Cannot call a namespace ("${name}").`
    };
}
function logCannotEmitFromOptionsHook() {
    return {
        code: CANNOT_EMIT_FROM_OPTIONS_HOOK,
        message: `Cannot emit files or set asset sources in the "outputOptions" hook, use the "renderStart" hook instead.`
    };
}
function logChunkNotGeneratedForFileName(name) {
    return {
        code: CHUNK_NOT_GENERATED,
        message: `Plugin error - Unable to get file name for emitted chunk "${name}". You can only get file names once chunks have been generated after the "renderStart" hook.`
    };
}
function logChunkInvalid({ fileName, code }, { pos, message }) {
    const errorProperties = {
        code: CHUNK_INVALID,
        message: `Chunk "${fileName}" is not valid JavaScript: ${message}.`
    };
    augmentCodeLocation(errorProperties, pos, code, fileName);
    return errorProperties;
}
function logCircularDependency(cyclePath) {
    return {
        code: CIRCULAR_DEPENDENCY,
        ids: cyclePath,
        message: `Circular dependency: ${cyclePath.map(relativeId).join(' -> ')}`
    };
}
function logCircularReexport(exportName, exporter) {
    return {
        code: CIRCULAR_REEXPORT,
        exporter,
        message: `"${exportName}" cannot be exported from "${relativeId(exporter)}" as it is a reexport that references itself.`
    };
}
function logCyclicCrossChunkReexport(exportName, exporter, reexporter, importer, preserveModules) {
    return {
        code: CYCLIC_CROSS_CHUNK_REEXPORT,
        exporter,
        id: importer,
        message: `Export "${exportName}" of module "${relativeId(exporter)}" was reexported through module "${relativeId(reexporter)}" while both modules are dependencies of each other and will end up in different chunks by current Rollup settings. This scenario is not well supported at the moment as it will produce a circular dependency between chunks and will likely lead to broken execution order.\nEither change the import in "${relativeId(importer)}" to point directly to the exporting module or ${preserveModules ? 'do not use "output.preserveModules"' : 'reconfigure "output.manualChunks"'} to ensure these modules end up in the same chunk.`,
        reexporter
    };
}
function logDeprecation(deprecation, urlSnippet, plugin) {
    return {
        code: DEPRECATED_FEATURE,
        message: deprecation,
        url: getRollupUrl(urlSnippet),
        ...({})
    };
}
function logConstVariableReassignError() {
    return {
        code: CONST_REASSIGN,
        message: 'Cannot reassign a variable declared with `const`'
    };
}
function logDuplicateArgumentNameError(name) {
    return {
        code: DUPLICATE_ARGUMENT_NAME,
        message: `Duplicate argument name "${name}"`
    };
}
function logDuplicateExportError(name) {
    return { code: DUPLICATE_EXPORT, message: `Duplicate export "${name}"` };
}
function logDuplicatePluginName(plugin) {
    return {
        code: DUPLICATE_PLUGIN_NAME,
        message: `The plugin name ${plugin} is being used twice in the same build. Plugin names must be distinct or provide a cacheKey (please post an issue to the plugin if you are a plugin user).`
    };
}
function logEmptyChunk(chunkName) {
    return {
        code: EMPTY_BUNDLE,
        message: `Generated an empty chunk: "${chunkName}".`,
        names: [chunkName]
    };
}
function logEval(id) {
    return {
        code: EVAL,
        id,
        message: `Use of eval in "${relativeId(id)}" is strongly discouraged as it poses security risks and may cause issues with minification.`,
        url: getRollupUrl(URL_AVOIDING_EVAL)
    };
}
function logExternalSyntheticExports(id, importer) {
    return {
        code: EXTERNAL_SYNTHETIC_EXPORTS,
        exporter: id,
        message: `External "${id}" cannot have "syntheticNamedExports" enabled (imported by "${relativeId(importer)}").`
    };
}
function logFileNameConflict(fileName) {
    return {
        code: FILE_NAME_CONFLICT,
        message: `The emitted file "${fileName}" overwrites a previously emitted file of the same name.`
    };
}
function logFileReferenceIdNotFoundForFilename(assetReferenceId) {
    return {
        code: FILE_NOT_FOUND,
        message: `Plugin error - Unable to get file name for unknown file "${assetReferenceId}".`
    };
}
function logFirstSideEffect(source, id, { line, column }) {
    return {
        code: FIRST_SIDE_EFFECT,
        message: `First side effect in ${relativeId(id)} is at (${line}:${column})\n${getCodeFrame(source, line, column)}`
    };
}
function logIllegalIdentifierAsName(name) {
    return {
        code: ILLEGAL_IDENTIFIER_AS_NAME,
        message: `Given name "${name}" is not a legal JS identifier. If you need this, you can try "output.extend: true".`,
        url: getRollupUrl(URL_OUTPUT_EXTEND)
    };
}
function logIllegalImportReassignment(name, importingId) {
    return {
        code: ILLEGAL_REASSIGNMENT,
        message: `Illegal reassignment of import "${name}" in "${relativeId(importingId)}".`
    };
}
function logInconsistentImportAttributes(existingAttributes, newAttributes, source, importer) {
    return {
        code: INCONSISTENT_IMPORT_ATTRIBUTES,
        message: `Module "${relativeId(importer)}" tried to import "${relativeId(source)}" with ${formatAttributes(newAttributes)} attributes, but it was already imported elsewhere with ${formatAttributes(existingAttributes)} attributes. Please ensure that import attributes for the same module are always consistent.`
    };
}
const formatAttributes = (attributes) => {
    const entries = Object.entries(attributes);
    if (entries.length === 0)
        return 'no';
    return entries.map(([key, value]) => `"${key}": "${value}"`).join(', ');
};
function logInvalidAnnotation(comment, id, type) {
    return {
        code: INVALID_ANNOTATION,
        id,
        message: `A comment\n\n"${comment}"\n\nin "${relativeId(id)}" contains an annotation that Rollup cannot interpret due to the position of the comment. The comment will be removed to avoid issues.`,
        url: getRollupUrl(type === 'noSideEffects' ? URL_TREESHAKE_NOSIDEEFFECTS : URL_TREESHAKE_PURE)
    };
}
function logInputHookInOutputPlugin(pluginName, hookName) {
    return {
        code: INPUT_HOOK_IN_OUTPUT_PLUGIN,
        message: `The "${hookName}" hook used by the output plugin ${pluginName} is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.`
    };
}
function logCannotAssignModuleToChunk(moduleId, assignToAlias, currentAlias) {
    return {
        code: INVALID_CHUNK,
        message: `Cannot assign "${relativeId(moduleId)}" to the "${assignToAlias}" chunk as it is already in the "${currentAlias}" chunk.`
    };
}
function logInvalidExportOptionValue(optionValue) {
    return {
        code: INVALID_EXPORT_OPTION,
        message: `"output.exports" must be "default", "named", "none", "auto", or left unspecified (defaults to "auto"), received "${optionValue}".`,
        url: getRollupUrl(URL_OUTPUT_EXPORTS)
    };
}
function logIncompatibleExportOptionValue(optionValue, keys, entryModule) {
    return {
        code: INVALID_EXPORT_OPTION,
        message: `"${optionValue}" was specified for "output.exports", but entry module "${relativeId(entryModule)}" has the following exports: ${printQuotedStringList(keys)}`,
        url: getRollupUrl(URL_OUTPUT_EXPORTS)
    };
}
function logInternalIdCannotBeExternal(source, importer) {
    return {
        code: INVALID_EXTERNAL_ID,
        message: `"${source}" is imported as an external by "${relativeId(importer)}", but is already an existing non-external module id.`
    };
}
function logImportOptionsAreInvalid(importer) {
    return {
        code: INVALID_IMPORT_ATTRIBUTE,
        message: `Rollup could not statically analyze the options argument of a dynamic import in "${relativeId(importer)}". Dynamic import options need to be an object with a nested attributes object.`
    };
}
function logImportAttributeIsInvalid(importer) {
    return {
        code: INVALID_IMPORT_ATTRIBUTE,
        message: `Rollup could not statically analyze an import attribute of a dynamic import in "${relativeId(importer)}". Import attributes need to have string keys and values. The attribute will be removed.`
    };
}
function logInvalidLogPosition(plugin) {
    return {
        code: INVALID_LOG_POSITION,
        message: `Plugin "${plugin}" tried to add a file position to a log or warning. This is only supported in the "transform" hook at the moment and will be ignored.`
    };
}
function logInvalidOption(option, urlSnippet, explanation, value) {
    return {
        code: INVALID_OPTION,
        message: `Invalid value ${value === undefined ? '' : `${JSON.stringify(value)} `}for option "${option}" - ${explanation}.`,
        url: getRollupUrl(urlSnippet)
    };
}
function logInvalidAddonPluginHook(hook, plugin) {
    return {
        code: INVALID_PLUGIN_HOOK,
        hook,
        message: `Error running plugin hook "${hook}" for plugin "${plugin}", expected a string, a function hook or an object with a "handler" string or function.`,
        plugin
    };
}
function logInvalidFunctionPluginHook(hook, plugin) {
    return {
        code: INVALID_PLUGIN_HOOK,
        hook,
        message: `Error running plugin hook "${hook}" for plugin "${plugin}", expected a function hook or an object with a "handler" function.`,
        plugin
    };
}
function logInvalidRollupPhaseForChunkEmission() {
    return {
        code: INVALID_ROLLUP_PHASE,
        message: `Cannot emit chunks after module loading has finished.`
    };
}
function logInvalidSetAssetSourceCall() {
    return {
        code: INVALID_SETASSETSOURCE,
        message: `setAssetSource cannot be called in transform for caching reasons. Use emitFile with a source, or call setAssetSource in another hook.`
    };
}
function logInvalidFormatForTopLevelAwait(id, format) {
    return {
        code: INVALID_TLA_FORMAT,
        id,
        message: `Module format "${format}" does not support top-level await. Use the "es" or "system" output formats rather.`
    };
}
function logMissingEntryExport(binding, exporter) {
    return {
        binding,
        code: MISSING_EXPORT,
        exporter,
        message: `Exported variable "${binding}" is not defined in "${relativeId(exporter)}".`,
        url: getRollupUrl(URL_NAME_IS_NOT_EXPORTED)
    };
}
function logMissingExport(binding, importingModule, exporter) {
    const isJson = (0,node_path__WEBPACK_IMPORTED_MODULE_1__.extname)(exporter) === '.json';
    return {
        binding,
        code: MISSING_EXPORT,
        exporter,
        id: importingModule,
        message: `"${binding}" is not exported by "${relativeId(exporter)}", imported by "${relativeId(importingModule)}".${isJson ? ' (Note that you need @rollup/plugin-json to import JSON files)' : ''}`,
        url: getRollupUrl(URL_NAME_IS_NOT_EXPORTED)
    };
}
function logMissingGlobalName(externalId, guess) {
    return {
        code: MISSING_GLOBAL_NAME,
        id: externalId,
        message: `No name was provided for external module "${externalId}" in "output.globals" – guessing "${guess}".`,
        names: [guess],
        url: getRollupUrl(URL_OUTPUT_GLOBALS)
    };
}
function logImplicitDependantCannotBeExternal(unresolvedId, implicitlyLoadedBefore) {
    return {
        code: MISSING_IMPLICIT_DEPENDANT,
        message: `Module "${relativeId(unresolvedId)}" that should be implicitly loaded before "${relativeId(implicitlyLoadedBefore)}" cannot be external.`
    };
}
function logUnresolvedImplicitDependant(unresolvedId, implicitlyLoadedBefore) {
    return {
        code: MISSING_IMPLICIT_DEPENDANT,
        message: `Module "${relativeId(unresolvedId)}" that should be implicitly loaded before "${relativeId(implicitlyLoadedBefore)}" could not be resolved.`
    };
}
function logImplicitDependantIsNotIncluded(module) {
    const implicitDependencies = [...module.implicitlyLoadedBefore]
        .map(dependency => relativeId(dependency.id))
        .sort();
    return {
        code: MISSING_IMPLICIT_DEPENDANT,
        message: `Module "${relativeId(module.id)}" that should be implicitly loaded before ${printQuotedStringList(implicitDependencies)} is not included in the module graph. Either it was not imported by an included module or only via a tree-shaken dynamic import, or no imported bindings were used and it had otherwise no side-effects.`
    };
}
function logMissingNameOptionForIifeExport() {
    return {
        code: MISSING_NAME_OPTION_FOR_IIFE_EXPORT,
        message: `If you do not supply "output.name", you may not be able to access the exports of an IIFE bundle.`,
        url: getRollupUrl(URL_OUTPUT_NAME)
    };
}
function logMissingNameOptionForUmdExport() {
    return {
        code: MISSING_NAME_OPTION_FOR_IIFE_EXPORT,
        message: 'You must supply "output.name" for UMD bundles that have exports so that the exports are accessible in environments without a module loader.',
        url: getRollupUrl(URL_OUTPUT_NAME)
    };
}
function logMissingNodeBuiltins(externalBuiltins) {
    return {
        code: MISSING_NODE_BUILTINS,
        ids: externalBuiltins,
        message: `Creating a browser bundle that depends on Node.js built-in modules (${printQuotedStringList(externalBuiltins)}). You might need to include https://github.com/FredKSchott/rollup-plugin-polyfill-node`
    };
}
// eslint-disable-next-line unicorn/prevent-abbreviations
function logMissingFileOrDirOption() {
    return {
        code: MISSING_OPTION,
        message: 'You must specify "output.file" or "output.dir" for the build.',
        url: getRollupUrl(URL_OUTPUT_DIR)
    };
}
function logMixedExport(facadeModuleId, name) {
    return {
        code: MIXED_EXPORTS,
        id: facadeModuleId,
        message: `Entry module "${relativeId(facadeModuleId)}" is using named and default exports together. Consumers of your bundle will have to use \`${name || 'chunk'}.default\` to access the default export, which may not be what you want. Use \`output.exports: "named"\` to disable this warning.`,
        url: getRollupUrl(URL_OUTPUT_EXPORTS)
    };
}
function logModuleLevelDirective(directive, id) {
    return {
        code: MODULE_LEVEL_DIRECTIVE,
        id,
        message: `Module level directives cause errors when bundled, "${directive}" in "${relativeId(id)}" was ignored.`
    };
}
function logNamespaceConflict(binding, reexportingModuleId, sources) {
    return {
        binding,
        code: NAMESPACE_CONFLICT,
        ids: sources,
        message: `Conflicting namespaces: "${relativeId(reexportingModuleId)}" re-exports "${binding}" from one of the modules ${printQuotedStringList(sources.map(moduleId => relativeId(moduleId)))} (will be ignored).`,
        reexporter: reexportingModuleId
    };
}
function logNoTransformMapOrAstWithoutCode(pluginName) {
    return {
        code: NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE,
        message: `The plugin "${pluginName}" returned a "map" or "ast" without returning ` +
            'a "code". This will be ignored.'
    };
}
function logOptimizeChunkStatus(chunks, smallChunks, pointInTime) {
    return {
        code: OPTIMIZE_CHUNK_STATUS,
        message: `${pointInTime}, there are\n` +
            `${chunks} chunks, of which\n` +
            `${smallChunks} are below minChunkSize.`
    };
}
function logParseError(message, pos) {
    return { code: PARSE_ERROR, message, pos };
}
function logRedeclarationError(name) {
    return {
        code: REDECLARATION_ERROR,
        message: `Identifier "${name}" has already been declared`
    };
}
function logModuleParseError(error, moduleId) {
    let message = error.message.replace(/ \(\d+:\d+\)$/, '');
    if (moduleId.endsWith('.json')) {
        message += ' (Note that you need @rollup/plugin-json to import JSON files)';
    }
    else if (!moduleId.endsWith('.js')) {
        message += ' (Note that you need plugins to import files that are not JavaScript)';
    }
    return {
        cause: error,
        code: PARSE_ERROR,
        id: moduleId,
        message,
        stack: error.stack
    };
}
function logPluginError(error, plugin, { hook, id } = {}) {
    const code = error.code;
    if (!error.pluginCode &&
        code != null &&
        (typeof code !== 'string' || !code.startsWith('PLUGIN_'))) {
        error.pluginCode = code;
    }
    error.code = PLUGIN_ERROR;
    error.plugin = plugin;
    if (hook) {
        error.hook = hook;
    }
    if (id) {
        error.id = id;
    }
    return error;
}
function logShimmedExport(id, binding) {
    return {
        binding,
        code: SHIMMED_EXPORT,
        exporter: id,
        message: `Missing export "${binding}" has been shimmed in module "${relativeId(id)}".`
    };
}
function logSourcemapBroken(plugin) {
    return {
        code: SOURCEMAP_BROKEN,
        message: `Sourcemap is likely to be incorrect: a plugin (${plugin}) was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help`,
        plugin,
        url: getRollupUrl(URL_SOURCEMAP_IS_LIKELY_TO_BE_INCORRECT)
    };
}
function logConflictingSourcemapSources(filename) {
    return {
        code: SOURCEMAP_BROKEN,
        message: `Multiple conflicting contents for sourcemap source ${filename}`
    };
}
function logInvalidSourcemapForError(error, id, column, line, pos) {
    return {
        cause: error,
        code: SOURCEMAP_ERROR,
        id,
        loc: {
            column,
            file: id,
            line
        },
        message: `Error when using sourcemap for reporting an error: ${error.message}`,
        pos
    };
}
function logSyntheticNamedExportsNeedNamespaceExport(id, syntheticNamedExportsOption) {
    return {
        code: SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT,
        exporter: id,
        message: `Module "${relativeId(id)}" that is marked with \`syntheticNamedExports: ${JSON.stringify(syntheticNamedExportsOption)}\` needs ${typeof syntheticNamedExportsOption === 'string' && syntheticNamedExportsOption !== 'default'
            ? `an explicit export named "${syntheticNamedExportsOption}"`
            : 'a default export'} that does not reexport an unresolved named export of the same module.`
    };
}
function logThisIsUndefined() {
    return {
        code: THIS_IS_UNDEFINED,
        message: `The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten`,
        url: getRollupUrl(URL_THIS_IS_UNDEFINED)
    };
}
function logUnexpectedNamedImport(id, imported, isReexport) {
    const importType = isReexport ? 'reexport' : 'import';
    return {
        code: UNEXPECTED_NAMED_IMPORT,
        exporter: id,
        message: `The named export "${imported}" was ${importType}ed from the external module "${relativeId(id)}" even though its interop type is "defaultOnly". Either remove or change this ${importType} or change the value of the "output.interop" option.`,
        url: getRollupUrl(URL_OUTPUT_INTEROP)
    };
}
function logUnexpectedNamespaceReexport(id) {
    return {
        code: UNEXPECTED_NAMED_IMPORT,
        exporter: id,
        message: `There was a namespace "*" reexport from the external module "${relativeId(id)}" even though its interop type is "defaultOnly". This will be ignored as namespace reexports only reexport named exports. If this is not intended, either remove or change this reexport or change the value of the "output.interop" option.`,
        url: getRollupUrl(URL_OUTPUT_INTEROP)
    };
}
function logUnknownOption(optionType, unknownOptions, validOptions) {
    return {
        code: UNKNOWN_OPTION,
        message: `Unknown ${optionType}: ${unknownOptions.join(', ')}. Allowed options: ${validOptions.join(', ')}`
    };
}
function logEntryCannotBeExternal(unresolvedId) {
    return {
        code: UNRESOLVED_ENTRY,
        message: `Entry module "${relativeId(unresolvedId)}" cannot be external.`
    };
}
function logExternalModulesCannotBeIncludedInManualChunks(source) {
    return {
        code: EXTERNAL_MODULES_CANNOT_BE_INCLUDED_IN_MANUAL_CHUNKS,
        message: `"${source}" cannot be included in manualChunks because it is resolved as an external module by the "external" option or plugins.`
    };
}
function logExternalModulesCannotBeTransformedToModules(source) {
    return {
        code: EXTERNAL_MODULES_CANNOT_BE_TRANSFORMED_TO_MODULES,
        message: `${source} is resolved as a module now, but it was an external module before. Please check whether there are conflicts in your Rollup options "external" and "manualChunks", manualChunks cannot include external modules.`
    };
}
function logUnresolvedEntry(unresolvedId) {
    return {
        code: UNRESOLVED_ENTRY,
        message: `Could not resolve entry module "${relativeId(unresolvedId)}".`
    };
}
function logUnresolvedImport(source, importer) {
    return {
        code: UNRESOLVED_IMPORT,
        exporter: source,
        id: importer,
        message: `Could not resolve "${source}" from "${relativeId(importer)}"`
    };
}
function logUnresolvedImportTreatedAsExternal(source, importer) {
    return {
        code: UNRESOLVED_IMPORT,
        exporter: source,
        id: importer,
        message: `"${source}" is imported by "${relativeId(importer)}", but could not be resolved – treating it as an external dependency.`,
        url: getRollupUrl(URL_TREATING_MODULE_AS_EXTERNAL_DEPENDENCY)
    };
}
function logUnusedExternalImports(externalId, names, importers) {
    return {
        code: UNUSED_EXTERNAL_IMPORT,
        exporter: externalId,
        ids: importers,
        message: `${printQuotedStringList(names, [
            'is',
            'are'
        ])} imported from external module "${externalId}" but never used in ${printQuotedStringList(importers.map(importer => relativeId(importer)))}.`,
        names
    };
}
function logFailedValidation(message) {
    return {
        code: VALIDATION_ERROR,
        message
    };
}
function warnDeprecation(deprecation, urlSnippet, activeDeprecation, options, plugin) {
    warnDeprecationWithOptions(deprecation, urlSnippet, activeDeprecation, options.onLog, options.strictDeprecations);
}
function warnDeprecationWithOptions(deprecation, urlSnippet, activeDeprecation, log, strictDeprecations, plugin) {
    {
        const warning = logDeprecation(deprecation, urlSnippet);
        if (strictDeprecations) {
            return error(warning);
        }
        log(LOGLEVEL_WARN, warning);
    }
}

// This file is generated by scripts/generate-buffer-to-ast.js.
// Do not edit this file directly.
function convertProgram(buffer) {
    const node = convertNode(0, buffer);
    switch (node.type) {
        case PanicError: {
            return error(getRollupError(logParseError(node.message)));
        }
        case ParseError: {
            return error(getRollupError(logParseError(node.message, node.start)));
        }
        default: {
            return node;
        }
    }
}
/* eslint-disable sort-keys */
const nodeConverters = [
    function panicError(position, buffer) {
        return {
            type: 'PanicError',
            start: buffer[position],
            end: buffer[position + 1],
            message: buffer.convertString(buffer[position + 2])
        };
    },
    function parseError(position, buffer) {
        return {
            type: 'ParseError',
            start: buffer[position],
            end: buffer[position + 1],
            message: buffer.convertString(buffer[position + 2])
        };
    },
    function arrayExpression(position, buffer) {
        return {
            type: 'ArrayExpression',
            start: buffer[position],
            end: buffer[position + 1],
            elements: convertNodeList(buffer[position + 2], buffer)
        };
    },
    function arrayPattern(position, buffer) {
        return {
            type: 'ArrayPattern',
            start: buffer[position],
            end: buffer[position + 1],
            elements: convertNodeList(buffer[position + 2], buffer)
        };
    },
    function arrowFunctionExpression(position, buffer) {
        const flags = buffer[position + 2];
        const annotations = convertAnnotations(buffer[position + 3], buffer);
        return {
            type: 'ArrowFunctionExpression',
            start: buffer[position],
            end: buffer[position + 1],
            async: (flags & 1) === 1,
            expression: (flags & 2) === 2,
            generator: (flags & 4) === 4,
            ...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
            params: convertNodeList(buffer[position + 4], buffer),
            body: convertNode(buffer[position + 5], buffer),
            id: null
        };
    },
    function assignmentExpression(position, buffer) {
        return {
            type: 'AssignmentExpression',
            start: buffer[position],
            end: buffer[position + 1],
            operator: FIXED_STRINGS[buffer[position + 2]],
            left: convertNode(buffer[position + 3], buffer),
            right: convertNode(buffer[position + 4], buffer)
        };
    },
    function assignmentPattern(position, buffer) {
        return {
            type: 'AssignmentPattern',
            start: buffer[position],
            end: buffer[position + 1],
            left: convertNode(buffer[position + 2], buffer),
            right: convertNode(buffer[position + 3], buffer)
        };
    },
    function awaitExpression(position, buffer) {
        return {
            type: 'AwaitExpression',
            start: buffer[position],
            end: buffer[position + 1],
            argument: convertNode(buffer[position + 2], buffer)
        };
    },
    function binaryExpression(position, buffer) {
        return {
            type: 'BinaryExpression',
            start: buffer[position],
            end: buffer[position + 1],
            operator: FIXED_STRINGS[buffer[position + 2]],
            left: convertNode(buffer[position + 3], buffer),
            right: convertNode(buffer[position + 4], buffer)
        };
    },
    function blockStatement(position, buffer) {
        return {
            type: 'BlockStatement',
            start: buffer[position],
            end: buffer[position + 1],
            body: convertNodeList(buffer[position + 2], buffer)
        };
    },
    function breakStatement(position, buffer) {
        const labelPosition = buffer[position + 2];
        return {
            type: 'BreakStatement',
            start: buffer[position],
            end: buffer[position + 1],
            label: labelPosition === 0 ? null : convertNode(labelPosition, buffer)
        };
    },
    function callExpression(position, buffer) {
        const flags = buffer[position + 2];
        const annotations = convertAnnotations(buffer[position + 3], buffer);
        return {
            type: 'CallExpression',
            start: buffer[position],
            end: buffer[position + 1],
            optional: (flags & 1) === 1,
            ...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
            callee: convertNode(buffer[position + 4], buffer),
            arguments: convertNodeList(buffer[position + 5], buffer)
        };
    },
    function catchClause(position, buffer) {
        const parameterPosition = buffer[position + 2];
        return {
            type: 'CatchClause',
            start: buffer[position],
            end: buffer[position + 1],
            param: parameterPosition === 0 ? null : convertNode(parameterPosition, buffer),
            body: convertNode(buffer[position + 3], buffer)
        };
    },
    function chainExpression(position, buffer) {
        return {
            type: 'ChainExpression',
            start: buffer[position],
            end: buffer[position + 1],
            expression: convertNode(buffer[position + 2], buffer)
        };
    },
    function classBody(position, buffer) {
        return {
            type: 'ClassBody',
            start: buffer[position],
            end: buffer[position + 1],
            body: convertNodeList(buffer[position + 2], buffer)
        };
    },
    function classDeclaration(position, buffer) {
        const idPosition = buffer[position + 3];
        const superClassPosition = buffer[position + 4];
        return {
            type: 'ClassDeclaration',
            start: buffer[position],
            end: buffer[position + 1],
            decorators: convertNodeList(buffer[position + 2], buffer),
            id: idPosition === 0 ? null : convertNode(idPosition, buffer),
            superClass: superClassPosition === 0 ? null : convertNode(superClassPosition, buffer),
            body: convertNode(buffer[position + 5], buffer)
        };
    },
    function classExpression(position, buffer) {
        const idPosition = buffer[position + 3];
        const superClassPosition = buffer[position + 4];
        return {
            type: 'ClassExpression',
            start: buffer[position],
            end: buffer[position + 1],
            decorators: convertNodeList(buffer[position + 2], buffer),
            id: idPosition === 0 ? null : convertNode(idPosition, buffer),
            superClass: superClassPosition === 0 ? null : convertNode(superClassPosition, buffer),
            body: convertNode(buffer[position + 5], buffer)
        };
    },
    function conditionalExpression(position, buffer) {
        return {
            type: 'ConditionalExpression',
            start: buffer[position],
            end: buffer[position + 1],
            test: convertNode(buffer[position + 2], buffer),
            consequent: convertNode(buffer[position + 3], buffer),
            alternate: convertNode(buffer[position + 4], buffer)
        };
    },
    function continueStatement(position, buffer) {
        const labelPosition = buffer[position + 2];
        return {
            type: 'ContinueStatement',
            start: buffer[position],
            end: buffer[position + 1],
            label: labelPosition === 0 ? null : convertNode(labelPosition, buffer)
        };
    },
    function debuggerStatement(position, buffer) {
        return {
            type: 'DebuggerStatement',
            start: buffer[position],
            end: buffer[position + 1]
        };
    },
    function decorator(position, buffer) {
        return {
            type: 'Decorator',
            start: buffer[position],
            end: buffer[position + 1],
            expression: convertNode(buffer[position + 2], buffer)
        };
    },
    function directive(position, buffer) {
        return {
            type: 'ExpressionStatement',
            start: buffer[position],
            end: buffer[position + 1],
            directive: buffer.convertString(buffer[position + 2]),
            expression: convertNode(buffer[position + 3], buffer)
        };
    },
    function doWhileStatement(position, buffer) {
        return {
            type: 'DoWhileStatement',
            start: buffer[position],
            end: buffer[position + 1],
            body: convertNode(buffer[position + 2], buffer),
            test: convertNode(buffer[position + 3], buffer)
        };
    },
    function emptyStatement(position, buffer) {
        return {
            type: 'EmptyStatement',
            start: buffer[position],
            end: buffer[position + 1]
        };
    },
    function exportAllDeclaration(position, buffer) {
        const exportedPosition = buffer[position + 2];
        return {
            type: 'ExportAllDeclaration',
            start: buffer[position],
            end: buffer[position + 1],
            exported: exportedPosition === 0 ? null : convertNode(exportedPosition, buffer),
            source: convertNode(buffer[position + 3], buffer),
            attributes: convertNodeList(buffer[position + 4], buffer)
        };
    },
    function exportDefaultDeclaration(position, buffer) {
        return {
            type: 'ExportDefaultDeclaration',
            start: buffer[position],
            end: buffer[position + 1],
            declaration: convertNode(buffer[position + 2], buffer)
        };
    },
    function exportNamedDeclaration(position, buffer) {
        const sourcePosition = buffer[position + 3];
        const declarationPosition = buffer[position + 5];
        return {
            type: 'ExportNamedDeclaration',
            start: buffer[position],
            end: buffer[position + 1],
            specifiers: convertNodeList(buffer[position + 2], buffer),
            source: sourcePosition === 0 ? null : convertNode(sourcePosition, buffer),
            attributes: convertNodeList(buffer[position + 4], buffer),
            declaration: declarationPosition === 0 ? null : convertNode(declarationPosition, buffer)
        };
    },
    function exportSpecifier(position, buffer) {
        const local = convertNode(buffer[position + 2], buffer);
        const exportedPosition = buffer[position + 3];
        return {
            type: 'ExportSpecifier',
            start: buffer[position],
            end: buffer[position + 1],
            local,
            exported: exportedPosition === 0 ? { ...local } : convertNode(exportedPosition, buffer)
        };
    },
    function expressionStatement(position, buffer) {
        return {
            type: 'ExpressionStatement',
            start: buffer[position],
            end: buffer[position + 1],
            expression: convertNode(buffer[position + 2], buffer)
        };
    },
    function forInStatement(position, buffer) {
        return {
            type: 'ForInStatement',
            start: buffer[position],
            end: buffer[position + 1],
            left: convertNode(buffer[position + 2], buffer),
            right: convertNode(buffer[position + 3], buffer),
            body: convertNode(buffer[position + 4], buffer)
        };
    },
    function forOfStatement(position, buffer) {
        const flags = buffer[position + 2];
        return {
            type: 'ForOfStatement',
            start: buffer[position],
            end: buffer[position + 1],
            await: (flags & 1) === 1,
            left: convertNode(buffer[position + 3], buffer),
            right: convertNode(buffer[position + 4], buffer),
            body: convertNode(buffer[position + 5], buffer)
        };
    },
    function forStatement(position, buffer) {
        const initPosition = buffer[position + 2];
        const testPosition = buffer[position + 3];
        const updatePosition = buffer[position + 4];
        return {
            type: 'ForStatement',
            start: buffer[position],
            end: buffer[position + 1],
            init: initPosition === 0 ? null : convertNode(initPosition, buffer),
            test: testPosition === 0 ? null : convertNode(testPosition, buffer),
            update: updatePosition === 0 ? null : convertNode(updatePosition, buffer),
            body: convertNode(buffer[position + 5], buffer)
        };
    },
    function functionDeclaration(position, buffer) {
        const flags = buffer[position + 2];
        const annotations = convertAnnotations(buffer[position + 3], buffer);
        const idPosition = buffer[position + 4];
        return {
            type: 'FunctionDeclaration',
            start: buffer[position],
            end: buffer[position + 1],
            async: (flags & 1) === 1,
            generator: (flags & 2) === 2,
            ...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
            id: idPosition === 0 ? null : convertNode(idPosition, buffer),
            params: convertNodeList(buffer[position + 5], buffer),
            body: convertNode(buffer[position + 6], buffer),
            expression: false
        };
    },
    function functionExpression(position, buffer) {
        const flags = buffer[position + 2];
        const annotations = convertAnnotations(buffer[position + 3], buffer);
        const idPosition = buffer[position + 4];
        return {
            type: 'FunctionExpression',
            start: buffer[position],
            end: buffer[position + 1],
            async: (flags & 1) === 1,
            generator: (flags & 2) === 2,
            ...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
            id: idPosition === 0 ? null : convertNode(idPosition, buffer),
            params: convertNodeList(buffer[position + 5], buffer),
            body: convertNode(buffer[position + 6], buffer),
            expression: false
        };
    },
    function identifier(position, buffer) {
        return {
            type: 'Identifier',
            start: buffer[position],
            end: buffer[position + 1],
            name: buffer.convertString(buffer[position + 2])
        };
    },
    function ifStatement(position, buffer) {
        const alternatePosition = buffer[position + 4];
        return {
            type: 'IfStatement',
            start: buffer[position],
            end: buffer[position + 1],
            test: convertNode(buffer[position + 2], buffer),
            consequent: convertNode(buffer[position + 3], buffer),
            alternate: alternatePosition === 0 ? null : convertNode(alternatePosition, buffer)
        };
    },
    function importAttribute(position, buffer) {
        return {
            type: 'ImportAttribute',
            start: buffer[position],
            end: buffer[position + 1],
            key: convertNode(buffer[position + 2], buffer),
            value: convertNode(buffer[position + 3], buffer)
        };
    },
    function importDeclaration(position, buffer) {
        return {
            type: 'ImportDeclaration',
            start: buffer[position],
            end: buffer[position + 1],
            specifiers: convertNodeList(buffer[position + 2], buffer),
            source: convertNode(buffer[position + 3], buffer),
            attributes: convertNodeList(buffer[position + 4], buffer)
        };
    },
    function importDefaultSpecifier(position, buffer) {
        return {
            type: 'ImportDefaultSpecifier',
            start: buffer[position],
            end: buffer[position + 1],
            local: convertNode(buffer[position + 2], buffer)
        };
    },
    function importExpression(position, buffer) {
        const optionsPosition = buffer[position + 3];
        return {
            type: 'ImportExpression',
            start: buffer[position],
            end: buffer[position + 1],
            source: convertNode(buffer[position + 2], buffer),
            options: optionsPosition === 0 ? null : convertNode(optionsPosition, buffer)
        };
    },
    function importNamespaceSpecifier(position, buffer) {
        return {
            type: 'ImportNamespaceSpecifier',
            start: buffer[position],
            end: buffer[position + 1],
            local: convertNode(buffer[position + 2], buffer)
        };
    },
    function importSpecifier(position, buffer) {
        const importedPosition = buffer[position + 2];
        const local = convertNode(buffer[position + 3], buffer);
        return {
            type: 'ImportSpecifier',
            start: buffer[position],
            end: buffer[position + 1],
            imported: importedPosition === 0 ? { ...local } : convertNode(importedPosition, buffer),
            local
        };
    },
    function labeledStatement(position, buffer) {
        return {
            type: 'LabeledStatement',
            start: buffer[position],
            end: buffer[position + 1],
            label: convertNode(buffer[position + 2], buffer),
            body: convertNode(buffer[position + 3], buffer)
        };
    },
    function literalBigInt(position, buffer) {
        const bigint = buffer.convertString(buffer[position + 2]);
        return {
            type: 'Literal',
            start: buffer[position],
            end: buffer[position + 1],
            bigint,
            raw: buffer.convertString(buffer[position + 3]),
            value: BigInt(bigint)
        };
    },
    function literalBoolean(position, buffer) {
        const flags = buffer[position + 2];
        const value = (flags & 1) === 1;
        return {
            type: 'Literal',
            start: buffer[position],
            end: buffer[position + 1],
            value,
            raw: value ? 'true' : 'false'
        };
    },
    function literalNull(position, buffer) {
        return {
            type: 'Literal',
            start: buffer[position],
            end: buffer[position + 1],
            raw: 'null',
            value: null
        };
    },
    function literalNumber(position, buffer) {
        const rawPosition = buffer[position + 2];
        return {
            type: 'Literal',
            start: buffer[position],
            end: buffer[position + 1],
            raw: rawPosition === 0 ? undefined : buffer.convertString(rawPosition),
            value: new DataView(buffer.buffer).getFloat64((position + 3) << 2, true)
        };
    },
    function literalRegExp(position, buffer) {
        const flags = buffer.convertString(buffer[position + 2]);
        const pattern = buffer.convertString(buffer[position + 3]);
        return {
            type: 'Literal',
            start: buffer[position],
            end: buffer[position + 1],
            raw: `/${pattern}/${flags}`,
            regex: { flags, pattern },
            value: new RegExp(pattern, flags)
        };
    },
    function literalString(position, buffer) {
        const rawPosition = buffer[position + 3];
        return {
            type: 'Literal',
            start: buffer[position],
            end: buffer[position + 1],
            value: buffer.convertString(buffer[position + 2]),
            raw: rawPosition === 0 ? undefined : buffer.convertString(rawPosition)
        };
    },
    function logicalExpression(position, buffer) {
        return {
            type: 'LogicalExpression',
            start: buffer[position],
            end: buffer[position + 1],
            operator: FIXED_STRINGS[buffer[position + 2]],
            left: convertNode(buffer[position + 3], buffer),
            right: convertNode(buffer[position + 4], buffer)
        };
    },
    function memberExpression(position, buffer) {
        const flags = buffer[position + 2];
        return {
            type: 'MemberExpression',
            start: buffer[position],
            end: buffer[position + 1],
            computed: (flags & 1) === 1,
            optional: (flags & 2) === 2,
            object: convertNode(buffer[position + 3], buffer),
            property: convertNode(buffer[position + 4], buffer)
        };
    },
    function metaProperty(position, buffer) {
        return {
            type: 'MetaProperty',
            start: buffer[position],
            end: buffer[position + 1],
            meta: convertNode(buffer[position + 2], buffer),
            property: convertNode(buffer[position + 3], buffer)
        };
    },
    function methodDefinition(position, buffer) {
        const flags = buffer[position + 2];
        return {
            type: 'MethodDefinition',
            start: buffer[position],
            end: buffer[position + 1],
            static: (flags & 1) === 1,
            computed: (flags & 2) === 2,
            decorators: convertNodeList(buffer[position + 3], buffer),
            key: convertNode(buffer[position + 4], buffer),
            value: convertNode(buffer[position + 5], buffer),
            kind: FIXED_STRINGS[buffer[position + 6]]
        };
    },
    function newExpression(position, buffer) {
        const annotations = convertAnnotations(buffer[position + 2], buffer);
        return {
            type: 'NewExpression',
            start: buffer[position],
            end: buffer[position + 1],
            ...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
            callee: convertNode(buffer[position + 3], buffer),
            arguments: convertNodeList(buffer[position + 4], buffer)
        };
    },
    function objectExpression(position, buffer) {
        return {
            type: 'ObjectExpression',
            start: buffer[position],
            end: buffer[position + 1],
            properties: convertNodeList(buffer[position + 2], buffer)
        };
    },
    function objectPattern(position, buffer) {
        return {
            type: 'ObjectPattern',
            start: buffer[position],
            end: buffer[position + 1],
            properties: convertNodeList(buffer[position + 2], buffer)
        };
    },
    function privateIdentifier(position, buffer) {
        return {
            type: 'PrivateIdentifier',
            start: buffer[position],
            end: buffer[position + 1],
            name: buffer.convertString(buffer[position + 2])
        };
    },
    function program(position, buffer) {
        const invalidAnnotations = convertAnnotations(buffer[position + 3], buffer);
        return {
            type: 'Program',
            start: buffer[position],
            end: buffer[position + 1],
            body: convertNodeList(buffer[position + 2], buffer),
            ...(invalidAnnotations.length > 0 ? { [INVALID_ANNOTATION_KEY]: invalidAnnotations } : {}),
            sourceType: 'module'
        };
    },
    function property(position, buffer) {
        const flags = buffer[position + 2];
        const keyPosition = buffer[position + 3];
        const value = convertNode(buffer[position + 4], buffer);
        return {
            type: 'Property',
            start: buffer[position],
            end: buffer[position + 1],
            method: (flags & 1) === 1,
            shorthand: (flags & 2) === 2,
            computed: (flags & 4) === 4,
            key: keyPosition === 0 ? { ...value } : convertNode(keyPosition, buffer),
            value,
            kind: FIXED_STRINGS[buffer[position + 5]]
        };
    },
    function propertyDefinition(position, buffer) {
        const flags = buffer[position + 2];
        const valuePosition = buffer[position + 5];
        return {
            type: 'PropertyDefinition',
            start: buffer[position],
            end: buffer[position + 1],
            static: (flags & 1) === 1,
            computed: (flags & 2) === 2,
            decorators: convertNodeList(buffer[position + 3], buffer),
            key: convertNode(buffer[position + 4], buffer),
            value: valuePosition === 0 ? null : convertNode(valuePosition, buffer)
        };
    },
    function restElement(position, buffer) {
        return {
            type: 'RestElement',
            start: buffer[position],
            end: buffer[position + 1],
            argument: convertNode(buffer[position + 2], buffer)
        };
    },
    function returnStatement(position, buffer) {
        const argumentPosition = buffer[position + 2];
        return {
            type: 'ReturnStatement',
            start: buffer[position],
            end: buffer[position + 1],
            argument: argumentPosition === 0 ? null : convertNode(argumentPosition, buffer)
        };
    },
    function sequenceExpression(position, buffer) {
        return {
            type: 'SequenceExpression',
            start: buffer[position],
            end: buffer[position + 1],
            expressions: convertNodeList(buffer[position + 2], buffer)
        };
    },
    function spreadElement(position, buffer) {
        return {
            type: 'SpreadElement',
            start: buffer[position],
            end: buffer[position + 1],
            argument: convertNode(buffer[position + 2], buffer)
        };
    },
    function staticBlock(position, buffer) {
        return {
            type: 'StaticBlock',
            start: buffer[position],
            end: buffer[position + 1],
            body: convertNodeList(buffer[position + 2], buffer)
        };
    },
    function superElement(position, buffer) {
        return {
            type: 'Super',
            start: buffer[position],
            end: buffer[position + 1]
        };
    },
    function switchCase(position, buffer) {
        const testPosition = buffer[position + 2];
        return {
            type: 'SwitchCase',
            start: buffer[position],
            end: buffer[position + 1],
            test: testPosition === 0 ? null : convertNode(testPosition, buffer),
            consequent: convertNodeList(buffer[position + 3], buffer)
        };
    },
    function switchStatement(position, buffer) {
        return {
            type: 'SwitchStatement',
            start: buffer[position],
            end: buffer[position + 1],
            discriminant: convertNode(buffer[position + 2], buffer),
            cases: convertNodeList(buffer[position + 3], buffer)
        };
    },
    function taggedTemplateExpression(position, buffer) {
        return {
            type: 'TaggedTemplateExpression',
            start: buffer[position],
            end: buffer[position + 1],
            tag: convertNode(buffer[position + 2], buffer),
            quasi: convertNode(buffer[position + 3], buffer)
        };
    },
    function templateElement(position, buffer) {
        const flags = buffer[position + 2];
        const cookedPosition = buffer[position + 3];
        const cooked = cookedPosition === 0 ? undefined : buffer.convertString(cookedPosition);
        const raw = buffer.convertString(buffer[position + 4]);
        return {
            type: 'TemplateElement',
            start: buffer[position],
            end: buffer[position + 1],
            tail: (flags & 1) === 1,
            value: { cooked, raw }
        };
    },
    function templateLiteral(position, buffer) {
        return {
            type: 'TemplateLiteral',
            start: buffer[position],
            end: buffer[position + 1],
            quasis: convertNodeList(buffer[position + 2], buffer),
            expressions: convertNodeList(buffer[position + 3], buffer)
        };
    },
    function thisExpression(position, buffer) {
        return {
            type: 'ThisExpression',
            start: buffer[position],
            end: buffer[position + 1]
        };
    },
    function throwStatement(position, buffer) {
        return {
            type: 'ThrowStatement',
            start: buffer[position],
            end: buffer[position + 1],
            argument: convertNode(buffer[position + 2], buffer)
        };
    },
    function tryStatement(position, buffer) {
        const handlerPosition = buffer[position + 3];
        const finalizerPosition = buffer[position + 4];
        return {
            type: 'TryStatement',
            start: buffer[position],
            end: buffer[position + 1],
            block: convertNode(buffer[position + 2], buffer),
            handler: handlerPosition === 0 ? null : convertNode(handlerPosition, buffer),
            finalizer: finalizerPosition === 0 ? null : convertNode(finalizerPosition, buffer)
        };
    },
    function unaryExpression(position, buffer) {
        return {
            type: 'UnaryExpression',
            start: buffer[position],
            end: buffer[position + 1],
            operator: FIXED_STRINGS[buffer[position + 2]],
            argument: convertNode(buffer[position + 3], buffer),
            prefix: true
        };
    },
    function updateExpression(position, buffer) {
        const flags = buffer[position + 2];
        return {
            type: 'UpdateExpression',
            start: buffer[position],
            end: buffer[position + 1],
            prefix: (flags & 1) === 1,
            operator: FIXED_STRINGS[buffer[position + 3]],
            argument: convertNode(buffer[position + 4], buffer)
        };
    },
    function variableDeclaration(position, buffer) {
        return {
            type: 'VariableDeclaration',
            start: buffer[position],
            end: buffer[position + 1],
            kind: FIXED_STRINGS[buffer[position + 2]],
            declarations: convertNodeList(buffer[position + 3], buffer)
        };
    },
    function variableDeclarator(position, buffer) {
        const initPosition = buffer[position + 3];
        return {
            type: 'VariableDeclarator',
            start: buffer[position],
            end: buffer[position + 1],
            id: convertNode(buffer[position + 2], buffer),
            init: initPosition === 0 ? null : convertNode(initPosition, buffer)
        };
    },
    function whileStatement(position, buffer) {
        return {
            type: 'WhileStatement',
            start: buffer[position],
            end: buffer[position + 1],
            test: convertNode(buffer[position + 2], buffer),
            body: convertNode(buffer[position + 3], buffer)
        };
    },
    function yieldExpression(position, buffer) {
        const flags = buffer[position + 2];
        const argumentPosition = buffer[position + 3];
        return {
            type: 'YieldExpression',
            start: buffer[position],
            end: buffer[position + 1],
            delegate: (flags & 1) === 1,
            argument: argumentPosition === 0 ? null : convertNode(argumentPosition, buffer)
        };
    }
];
function convertNode(position, buffer) {
    const nodeType = buffer[position];
    const converter = nodeConverters[nodeType];
    /* istanbul ignore if: This should never be executed but is a safeguard against faulty buffers */
    if (!converter) {
        console.trace();
        throw new Error(`Unknown node type: ${nodeType}`);
    }
    return converter(position + 1, buffer);
}
function convertNodeList(position, buffer) {
    if (position === 0)
        return EMPTY_ARRAY;
    const length = buffer[position++];
    const list = [];
    for (let index = 0; index < length; index++) {
        const nodePosition = buffer[position++];
        list.push(nodePosition ? convertNode(nodePosition, buffer) : null);
    }
    return list;
}

function getAstBuffer(astBuffer) {
    const array = new Uint32Array(astBuffer.buffer);
    let convertString;
    if (typeof Buffer !== 'undefined' && astBuffer instanceof Buffer) {
        convertString = (position) => {
            const length = array[position++];
            const bytePosition = position << 2;
            return astBuffer.toString('utf8', bytePosition, bytePosition + length);
        };
    }
    else {
        const textDecoder = new TextDecoder();
        convertString = (position) => {
            const length = array[position++];
            const bytePosition = position << 2;
            return textDecoder.decode(astBuffer.subarray(bytePosition, bytePosition + length));
        };
    }
    return Object.assign(array, { convertString });
}

const parseAst = (input, { allowReturnOutsideFunction = false } = {}) => convertProgram(getAstBuffer((0,_native_js__WEBPACK_IMPORTED_MODULE_0__.parse)(input, allowReturnOutsideFunction)));
const parseAstAsync = async (input, { allowReturnOutsideFunction = false, signal } = {}) => convertProgram(getAstBuffer(await (0,_native_js__WEBPACK_IMPORTED_MODULE_0__.parseAsync)(input, allowReturnOutsideFunction, signal)));




/***/ }),

/***/ "./node_modules/vite/dist/node/chunks/dep-BzOvws4Y.js":
false,

/***/ "./node_modules/vite/dist/node/constants.js":
/*!**************************************************!*\
  !*** ./node_modules/vite/dist/node/constants.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT_DIR: () => (/* binding */ CLIENT_DIR),
/* harmony export */   CLIENT_ENTRY: () => (/* binding */ CLIENT_ENTRY),
/* harmony export */   CLIENT_PUBLIC_PATH: () => (/* binding */ CLIENT_PUBLIC_PATH),
/* harmony export */   CSS_LANGS_RE: () => (/* binding */ CSS_LANGS_RE),
/* harmony export */   DEFAULT_ASSETS_INLINE_LIMIT: () => (/* binding */ DEFAULT_ASSETS_INLINE_LIMIT),
/* harmony export */   DEFAULT_ASSETS_RE: () => (/* binding */ DEFAULT_ASSETS_RE),
/* harmony export */   DEFAULT_CONFIG_FILES: () => (/* binding */ DEFAULT_CONFIG_FILES),
/* harmony export */   DEFAULT_DEV_PORT: () => (/* binding */ DEFAULT_DEV_PORT),
/* harmony export */   DEFAULT_EXTENSIONS: () => (/* binding */ DEFAULT_EXTENSIONS),
/* harmony export */   DEFAULT_MAIN_FIELDS: () => (/* binding */ DEFAULT_MAIN_FIELDS),
/* harmony export */   DEFAULT_PREVIEW_PORT: () => (/* binding */ DEFAULT_PREVIEW_PORT),
/* harmony export */   DEP_VERSION_RE: () => (/* binding */ DEP_VERSION_RE),
/* harmony export */   ENV_ENTRY: () => (/* binding */ ENV_ENTRY),
/* harmony export */   ENV_PUBLIC_PATH: () => (/* binding */ ENV_PUBLIC_PATH),
/* harmony export */   ESBUILD_MODULES_TARGET: () => (/* binding */ ESBUILD_MODULES_TARGET),
/* harmony export */   FS_PREFIX: () => (/* binding */ FS_PREFIX),
/* harmony export */   JS_TYPES_RE: () => (/* binding */ JS_TYPES_RE),
/* harmony export */   KNOWN_ASSET_TYPES: () => (/* binding */ KNOWN_ASSET_TYPES),
/* harmony export */   METADATA_FILENAME: () => (/* binding */ METADATA_FILENAME),
/* harmony export */   OPTIMIZABLE_ENTRY_RE: () => (/* binding */ OPTIMIZABLE_ENTRY_RE),
/* harmony export */   SPECIAL_QUERY_RE: () => (/* binding */ SPECIAL_QUERY_RE),
/* harmony export */   VERSION: () => (/* binding */ VERSION),
/* harmony export */   VITE_PACKAGE_DIR: () => (/* binding */ VITE_PACKAGE_DIR),
/* harmony export */   loopbackHosts: () => (/* binding */ loopbackHosts),
/* harmony export */   wildcardHosts: () => (/* binding */ wildcardHosts)
/* harmony export */ });
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:fs */ "node:fs");




const { version } = JSON.parse(
  (0,node_fs__WEBPACK_IMPORTED_MODULE_2__.readFileSync)(new URL(/* asset import */ __webpack_require__(/*! ../../package.json */ "./node_modules/vite/package.json"), __webpack_require__.b)).toString()
);
const VERSION = version;
const DEFAULT_MAIN_FIELDS = [
  "browser",
  "module",
  "jsnext:main",
  // moment still uses this...
  "jsnext"
];
const ESBUILD_MODULES_TARGET = [
  "es2020",
  // support import.meta.url
  "edge88",
  "firefox78",
  "chrome87",
  "safari14"
];
const DEFAULT_EXTENSIONS = [
  ".mjs",
  ".js",
  ".mts",
  ".ts",
  ".jsx",
  ".tsx",
  ".json"
];
const DEFAULT_CONFIG_FILES = [
  "vite.config.js",
  "vite.config.mjs",
  "vite.config.ts",
  "vite.config.cjs",
  "vite.config.mts",
  "vite.config.cts"
];
const JS_TYPES_RE = /\.(?:j|t)sx?$|\.mjs$/;
const CSS_LANGS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
const OPTIMIZABLE_ENTRY_RE = /\.[cm]?[jt]s$/;
const SPECIAL_QUERY_RE = /[?&](?:worker|sharedworker|raw|url)\b/;
const FS_PREFIX = `/@fs/`;
const CLIENT_PUBLIC_PATH = `/@vite/client`;
const ENV_PUBLIC_PATH = `/@vite/env`;
const VITE_PACKAGE_DIR = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.resolve)(
  // import.meta.url is `dist/node/constants.js` after bundle
  (0,node_url__WEBPACK_IMPORTED_MODULE_1__.fileURLToPath)("file:///C:/xampp/htdocs/back/ard-alfn/node_modules/vite/dist/node/constants.js"),
  "../../.."
);
const CLIENT_ENTRY = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.resolve)(VITE_PACKAGE_DIR, "dist/client/client.mjs");
const ENV_ENTRY = (0,node_path__WEBPACK_IMPORTED_MODULE_0__.resolve)(VITE_PACKAGE_DIR, "dist/client/env.mjs");
const CLIENT_DIR = node_path__WEBPACK_IMPORTED_MODULE_0__.dirname(CLIENT_ENTRY);
const KNOWN_ASSET_TYPES = [
  // images
  "apng",
  "bmp",
  "png",
  "jpe?g",
  "jfif",
  "pjpeg",
  "pjp",
  "gif",
  "svg",
  "ico",
  "webp",
  "avif",
  // media
  "mp4",
  "webm",
  "ogg",
  "mp3",
  "wav",
  "flac",
  "aac",
  "opus",
  "mov",
  "m4a",
  "vtt",
  // fonts
  "woff2?",
  "eot",
  "ttf",
  "otf",
  // other
  "webmanifest",
  "pdf",
  "txt"
];
const DEFAULT_ASSETS_RE = new RegExp(
  `\\.(` + KNOWN_ASSET_TYPES.join("|") + `)(\\?.*)?$`
);
const DEP_VERSION_RE = /[?&](v=[\w.-]+)\b/;
const loopbackHosts = /* @__PURE__ */ new Set([
  "localhost",
  "127.0.0.1",
  "::1",
  "0000:0000:0000:0000:0000:0000:0000:0001"
]);
const wildcardHosts = /* @__PURE__ */ new Set([
  "0.0.0.0",
  "::",
  "0000:0000:0000:0000:0000:0000:0000:0000"
]);
const DEFAULT_DEV_PORT = 5173;
const DEFAULT_PREVIEW_PORT = 4173;
const DEFAULT_ASSETS_INLINE_LIMIT = 4096;
const METADATA_FILENAME = "_metadata.json";




/***/ }),

/***/ "./node_modules/vite/dist/node/runtime.js":
/*!************************************************!*\
  !*** ./node_modules/vite/dist/node/runtime.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ESModulesRunner: () => (/* binding */ ESModulesRunner),
/* harmony export */   ModuleCacheMap: () => (/* binding */ ModuleCacheMap),
/* harmony export */   ViteRuntime: () => (/* binding */ ViteRuntime),
/* harmony export */   ssrDynamicImportKey: () => (/* binding */ ssrDynamicImportKey),
/* harmony export */   ssrExportAllKey: () => (/* binding */ ssrExportAllKey),
/* harmony export */   ssrImportKey: () => (/* binding */ ssrImportKey),
/* harmony export */   ssrImportMetaKey: () => (/* binding */ ssrImportMetaKey),
/* harmony export */   ssrModuleExportsKey: () => (/* binding */ ssrModuleExportsKey)
/* harmony export */ });
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
const VALID_ID_PREFIX = "/@id/", NULL_BYTE_PLACEHOLDER = "__x00__";
let SOURCEMAPPING_URL = "sourceMa";
SOURCEMAPPING_URL += "ppingURL";
const isWindows = typeof process < "u" && process.platform === "win32";
function wrapId(id) {
  return id.startsWith(VALID_ID_PREFIX) ? id : VALID_ID_PREFIX + id.replace("\0", NULL_BYTE_PLACEHOLDER);
}
function unwrapId(id) {
  return id.startsWith(VALID_ID_PREFIX) ? id.slice(VALID_ID_PREFIX.length).replace(NULL_BYTE_PLACEHOLDER, "\0") : id;
}
const windowsSlashRE = /\\/g;
function slash(p) {
  return p.replace(windowsSlashRE, "/");
}
const postfixRE = /[?#].*$/;
function cleanUrl(url) {
  return url.replace(postfixRE, "");
}
function isPrimitive(value) {
  return !value || typeof value != "object" && typeof value != "function";
}
function withTrailingSlash(path) {
  return path[path.length - 1] !== "/" ? `${path}/` : path;
}
const AsyncFunction = async function() {
}.constructor, _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  return input && input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/, _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  return typeof process < "u" && typeof process.cwd == "function" ? process.cwd().replace(/\\/g, "/") : "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "", resolvedAbsolute = !1;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    !path || path.length === 0 || (resolvedPath = `${path}/${resolvedPath}`, resolvedAbsolute = isAbsolute(path));
  }
  return resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute), resolvedAbsolute && !isAbsolute(resolvedPath) ? `/${resolvedPath}` : resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length)
      char = path[index];
    else {
      if (char === "/")
        break;
      char = "/";
    }
    if (char === "/") {
      if (!(lastSlash === index - 1 || dots === 1)) if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            lastSlashIndex === -1 ? (res = "", lastSegmentLength = 0) : (res = res.slice(0, lastSlashIndex), lastSegmentLength = res.length - 1 - res.lastIndexOf("/")), lastSlash = index, dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "", lastSegmentLength = 0, lastSlash = index, dots = 0;
            continue;
          }
        }
        allowAboveRoot && (res += res.length > 0 ? "/.." : "..", lastSegmentLength = 2);
      } else
        res.length > 0 ? res += `/${path.slice(lastSlash + 1, index)}` : res = path.slice(lastSlash + 1, index), lastSegmentLength = index - lastSlash - 1;
      lastSlash = index, dots = 0;
    } else char === "." && dots !== -1 ? ++dots : dots = -1;
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
}, dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  return segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0]) && (segments[0] += "/"), segments.join("/") || (isAbsolute(p) ? "/" : ".");
}, decodeBase64 = typeof atob < "u" ? atob : (str) => Buffer.from(str, "base64").toString("utf-8"), CHAR_FORWARD_SLASH = 47, CHAR_BACKWARD_SLASH = 92, percentRegEx = /%/g, backslashRegEx = /\\/g, newlineRegEx = /\n/g, carriageReturnRegEx = /\r/g, tabRegEx = /\t/g, questionRegex = /\?/g, hashRegex = /#/g;
function encodePathChars(filepath) {
  return filepath.indexOf("%") !== -1 && (filepath = filepath.replace(percentRegEx, "%25")), !isWindows && filepath.indexOf("\\") !== -1 && (filepath = filepath.replace(backslashRegEx, "%5C")), filepath.indexOf(`
`) !== -1 && (filepath = filepath.replace(newlineRegEx, "%0A")), filepath.indexOf("\r") !== -1 && (filepath = filepath.replace(carriageReturnRegEx, "%0D")), filepath.indexOf("	") !== -1 && (filepath = filepath.replace(tabRegEx, "%09")), filepath;
}
const posixDirname = dirname, posixResolve = resolve;
function posixPathToFileHref(posixPath) {
  let resolved = posixResolve(posixPath);
  const filePathLast = posixPath.charCodeAt(posixPath.length - 1);
  return (filePathLast === CHAR_FORWARD_SLASH || isWindows && filePathLast === CHAR_BACKWARD_SLASH) && resolved[resolved.length - 1] !== "/" && (resolved += "/"), resolved = encodePathChars(resolved), resolved.indexOf("?") !== -1 && (resolved = resolved.replace(questionRegex, "%3F")), resolved.indexOf("#") !== -1 && (resolved = resolved.replace(hashRegex, "%23")), new URL(`file://${resolved}`).href;
}
function toWindowsPath(path) {
  return path.replace(/\//g, "\\");
}
const comma = 44, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", intToChar = new Uint8Array(64), charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
  const c = chars.charCodeAt(i);
  intToChar[i] = c, charToInt[c] = i;
}
function decodeInteger(reader, relative) {
  let value = 0, shift = 0, integer = 0;
  do {
    const c = reader.next();
    integer = charToInt[c], value |= (integer & 31) << shift, shift += 5;
  } while (integer & 32);
  const shouldNegate = value & 1;
  return value >>>= 1, shouldNegate && (value = -2147483648 | -value), relative + value;
}
function hasMoreVlq(reader, max) {
  return reader.pos >= max ? !1 : reader.peek() !== comma;
}
class StringReader {
  constructor(buffer) {
    this.pos = 0, this.buffer = buffer;
  }
  next() {
    return this.buffer.charCodeAt(this.pos++);
  }
  peek() {
    return this.buffer.charCodeAt(this.pos);
  }
  indexOf(char) {
    const { buffer, pos } = this, idx = buffer.indexOf(char, pos);
    return idx === -1 ? buffer.length : idx;
  }
}
function decode(mappings) {
  const { length } = mappings, reader = new StringReader(mappings), decoded = [];
  let genColumn = 0, sourcesIndex = 0, sourceLine = 0, sourceColumn = 0, namesIndex = 0;
  do {
    const semi = reader.indexOf(";"), line = [];
    let sorted = !0, lastCol = 0;
    for (genColumn = 0; reader.pos < semi; ) {
      let seg;
      genColumn = decodeInteger(reader, genColumn), genColumn < lastCol && (sorted = !1), lastCol = genColumn, hasMoreVlq(reader, semi) ? (sourcesIndex = decodeInteger(reader, sourcesIndex), sourceLine = decodeInteger(reader, sourceLine), sourceColumn = decodeInteger(reader, sourceColumn), hasMoreVlq(reader, semi) ? (namesIndex = decodeInteger(reader, namesIndex), seg = [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex]) : seg = [genColumn, sourcesIndex, sourceLine, sourceColumn]) : seg = [genColumn], line.push(seg), reader.pos++;
    }
    sorted || sort(line), decoded.push(line), reader.pos = semi + 1;
  } while (reader.pos <= length);
  return decoded;
}
function sort(line) {
  line.sort(sortComparator);
}
function sortComparator(a, b) {
  return a[0] - b[0];
}
const COLUMN = 0, SOURCES_INDEX = 1, SOURCE_LINE = 2, SOURCE_COLUMN = 3, NAMES_INDEX = 4;
let found = !1;
function binarySearch(haystack, needle, low, high) {
  for (; low <= high; ) {
    const mid = low + (high - low >> 1), cmp = haystack[mid][COLUMN] - needle;
    if (cmp === 0)
      return found = !0, mid;
    cmp < 0 ? low = mid + 1 : high = mid - 1;
  }
  return found = !1, low - 1;
}
function upperBound(haystack, needle, index) {
  for (let i = index + 1; i < haystack.length && haystack[i][COLUMN] === needle; index = i++)
    ;
  return index;
}
function lowerBound(haystack, needle, index) {
  for (let i = index - 1; i >= 0 && haystack[i][COLUMN] === needle; index = i--)
    ;
  return index;
}
function memoizedBinarySearch(haystack, needle, state, key) {
  const { lastKey, lastNeedle, lastIndex } = state;
  let low = 0, high = haystack.length - 1;
  if (key === lastKey) {
    if (needle === lastNeedle)
      return found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle, lastIndex;
    needle >= lastNeedle ? low = lastIndex === -1 ? 0 : lastIndex : high = lastIndex;
  }
  return state.lastKey = key, state.lastNeedle = needle, state.lastIndex = binarySearch(haystack, needle, low, high);
}
const LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)", COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)", LEAST_UPPER_BOUND = -1, GREATEST_LOWER_BOUND = 1;
function cast(map) {
  return map;
}
function decodedMappings(map) {
  var _a;
  return (_a = map)._decoded || (_a._decoded = decode(map._encoded));
}
function originalPositionFor(map, needle) {
  let { line, column, bias } = needle;
  if (line--, line < 0)
    throw new Error(LINE_GTR_ZERO);
  if (column < 0)
    throw new Error(COL_GTR_EQ_ZERO);
  const decoded = decodedMappings(map);
  if (line >= decoded.length)
    return OMapping(null, null, null, null);
  const segments = decoded[line], index = traceSegmentInternal(segments, map._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND);
  if (index === -1)
    return OMapping(null, null, null, null);
  const segment = segments[index];
  if (segment.length === 1)
    return OMapping(null, null, null, null);
  const { names, resolvedSources } = map;
  return OMapping(resolvedSources[segment[SOURCES_INDEX]], segment[SOURCE_LINE] + 1, segment[SOURCE_COLUMN], segment.length === 5 ? names[segment[NAMES_INDEX]] : null);
}
function OMapping(source, line, column, name) {
  return { source, line, column, name };
}
function traceSegmentInternal(segments, memo, line, column, bias) {
  let index = memoizedBinarySearch(segments, column, memo, line);
  return found ? index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index) : bias === LEAST_UPPER_BOUND && index++, index === -1 || index === segments.length ? -1 : index;
}
class DecodedMap {
  constructor(map, from) {
    this.map = map;
    const { mappings, names, sources } = map;
    this.version = map.version, this.names = names || [], this._encoded = mappings || "", this._decodedMemo = memoizedState(), this.url = from, this.resolvedSources = (sources || []).map(
      (s) => posixResolve(s || "", from)
    );
  }
  _encoded;
  _decoded;
  _decodedMemo;
  url;
  version;
  names = [];
  resolvedSources;
}
function memoizedState() {
  return {
    lastKey: -1,
    lastNeedle: -1,
    lastIndex: -1
  };
}
function getOriginalPosition(map, needle) {
  const result = originalPositionFor(map, needle);
  return result.column == null ? null : result;
}
const VITE_RUNTIME_SOURCEMAPPING_REGEXP = new RegExp(
  `//# ${SOURCEMAPPING_URL}=data:application/json;base64,(.+)`
);
class ModuleCacheMap extends Map {
  root;
  constructor(root, entries) {
    super(entries), this.root = withTrailingSlash(root);
  }
  normalize(fsPath) {
    return normalizeModuleId(fsPath, this.root);
  }
  /**
   * Assign partial data to the map
   */
  update(fsPath, mod) {
    return fsPath = this.normalize(fsPath), super.has(fsPath) ? Object.assign(super.get(fsPath), mod) : this.setByModuleId(fsPath, mod), this;
  }
  setByModuleId(modulePath, mod) {
    return super.set(modulePath, mod);
  }
  set(fsPath, mod) {
    return this.setByModuleId(this.normalize(fsPath), mod);
  }
  getByModuleId(modulePath) {
    super.has(modulePath) || this.setByModuleId(modulePath, {});
    const mod = super.get(modulePath);
    return mod.imports || Object.assign(mod, {
      imports: /* @__PURE__ */ new Set(),
      importers: /* @__PURE__ */ new Set()
    }), mod;
  }
  get(fsPath) {
    return this.getByModuleId(this.normalize(fsPath));
  }
  deleteByModuleId(modulePath) {
    return super.delete(modulePath);
  }
  delete(fsPath) {
    return this.deleteByModuleId(this.normalize(fsPath));
  }
  invalidate(id) {
    const module = this.get(id);
    module.evaluated = !1, module.meta = void 0, module.map = void 0, module.promise = void 0, module.exports = void 0, module.imports?.clear();
  }
  isImported({
    importedId,
    importedBy
  }, seen = /* @__PURE__ */ new Set()) {
    if (importedId = this.normalize(importedId), importedBy = this.normalize(importedBy), importedBy === importedId) return !0;
    if (seen.has(importedId)) return !1;
    seen.add(importedId);
    const importers = this.getByModuleId(importedId)?.importers;
    if (!importers) return !1;
    if (importers.has(importedBy)) return !0;
    for (const importer of importers)
      if (this.isImported({
        importedBy,
        importedId: importer
      }))
        return !0;
    return !1;
  }
  /**
   * Invalidate modules that dependent on the given modules, up to the main entry
   */
  invalidateDepTree(ids, invalidated = /* @__PURE__ */ new Set()) {
    for (const _id of ids) {
      const id = this.normalize(_id);
      if (invalidated.has(id)) continue;
      invalidated.add(id);
      const mod = super.get(id);
      mod?.importers && this.invalidateDepTree(mod.importers, invalidated), super.delete(id);
    }
    return invalidated;
  }
  /**
   * Invalidate dependency modules of the given modules, down to the bottom-level dependencies
   */
  invalidateSubDepTree(ids, invalidated = /* @__PURE__ */ new Set()) {
    for (const _id of ids) {
      const id = this.normalize(_id);
      if (invalidated.has(id)) continue;
      invalidated.add(id);
      const subIds = Array.from(super.entries()).filter(([, mod]) => mod.importers?.has(id)).map(([key]) => key);
      subIds.length && this.invalidateSubDepTree(subIds, invalidated), super.delete(id);
    }
    return invalidated;
  }
  getSourceMap(moduleId) {
    const mod = this.get(moduleId);
    if (mod.map) return mod.map;
    if (!mod.meta || !("code" in mod.meta)) return null;
    const mapString = VITE_RUNTIME_SOURCEMAPPING_REGEXP.exec(mod.meta.code)?.[1];
    if (!mapString) return null;
    const baseFile = mod.meta.file || moduleId.split("?")[0];
    return mod.map = new DecodedMap(JSON.parse(decodeBase64(mapString)), baseFile), mod.map;
  }
}
const prefixedBuiltins = /* @__PURE__ */ new Set(["node:test"]);
function normalizeModuleId(file, root) {
  if (prefixedBuiltins.has(file)) return file;
  let unixFile = slash(file).replace(/^\/@fs\//, isWindows ? "" : "/").replace(/^node:/, "").replace(/^\/+/, "/");
  return unixFile.startsWith(root) && (unixFile = unixFile.slice(root.length - 1)), unixFile.replace(/^file:\//, "/");
}
class HMRContext {
  constructor(hmrClient, ownerPath) {
    this.hmrClient = hmrClient, this.ownerPath = ownerPath, hmrClient.dataMap.has(ownerPath) || hmrClient.dataMap.set(ownerPath, {});
    const mod = hmrClient.hotModulesMap.get(ownerPath);
    mod && (mod.callbacks = []);
    const staleListeners = hmrClient.ctxToListenersMap.get(ownerPath);
    if (staleListeners)
      for (const [event, staleFns] of staleListeners) {
        const listeners = hmrClient.customListenersMap.get(event);
        listeners && hmrClient.customListenersMap.set(
          event,
          listeners.filter((l) => !staleFns.includes(l))
        );
      }
    this.newListeners = /* @__PURE__ */ new Map(), hmrClient.ctxToListenersMap.set(ownerPath, this.newListeners);
  }
  newListeners;
  get data() {
    return this.hmrClient.dataMap.get(this.ownerPath);
  }
  accept(deps, callback) {
    if (typeof deps == "function" || !deps)
      this.acceptDeps([this.ownerPath], ([mod]) => deps?.(mod));
    else if (typeof deps == "string")
      this.acceptDeps([deps], ([mod]) => callback?.(mod));
    else if (Array.isArray(deps))
      this.acceptDeps(deps, callback);
    else
      throw new Error("invalid hot.accept() usage.");
  }
  // export names (first arg) are irrelevant on the client side, they're
  // extracted in the server for propagation
  acceptExports(_, callback) {
    this.acceptDeps([this.ownerPath], ([mod]) => callback?.(mod));
  }
  dispose(cb) {
    this.hmrClient.disposeMap.set(this.ownerPath, cb);
  }
  prune(cb) {
    this.hmrClient.pruneMap.set(this.ownerPath, cb);
  }
  // Kept for backward compatibility (#11036)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  decline() {
  }
  invalidate(message) {
    this.hmrClient.notifyListeners("vite:invalidate", {
      path: this.ownerPath,
      message
    }), this.send("vite:invalidate", { path: this.ownerPath, message }), this.hmrClient.logger.debug(
      `[vite] invalidate ${this.ownerPath}${message ? `: ${message}` : ""}`
    );
  }
  on(event, cb) {
    const addToMap = (map) => {
      const existing = map.get(event) || [];
      existing.push(cb), map.set(event, existing);
    };
    addToMap(this.hmrClient.customListenersMap), addToMap(this.newListeners);
  }
  off(event, cb) {
    const removeFromMap = (map) => {
      const existing = map.get(event);
      if (existing === void 0)
        return;
      const pruned = existing.filter((l) => l !== cb);
      if (pruned.length === 0) {
        map.delete(event);
        return;
      }
      map.set(event, pruned);
    };
    removeFromMap(this.hmrClient.customListenersMap), removeFromMap(this.newListeners);
  }
  send(event, data) {
    this.hmrClient.messenger.send(
      JSON.stringify({ type: "custom", event, data })
    );
  }
  acceptDeps(deps, callback = () => {
  }) {
    const mod = this.hmrClient.hotModulesMap.get(this.ownerPath) || {
      id: this.ownerPath,
      callbacks: []
    };
    mod.callbacks.push({
      deps,
      fn: callback
    }), this.hmrClient.hotModulesMap.set(this.ownerPath, mod);
  }
}
class HMRMessenger {
  constructor(connection) {
    this.connection = connection;
  }
  queue = [];
  send(message) {
    this.queue.push(message), this.flush();
  }
  flush() {
    this.connection.isReady() && (this.queue.forEach((msg) => this.connection.send(msg)), this.queue = []);
  }
}
class HMRClient {
  constructor(logger, connection, importUpdatedModule) {
    this.logger = logger, this.importUpdatedModule = importUpdatedModule, this.messenger = new HMRMessenger(connection);
  }
  hotModulesMap = /* @__PURE__ */ new Map();
  disposeMap = /* @__PURE__ */ new Map();
  pruneMap = /* @__PURE__ */ new Map();
  dataMap = /* @__PURE__ */ new Map();
  customListenersMap = /* @__PURE__ */ new Map();
  ctxToListenersMap = /* @__PURE__ */ new Map();
  messenger;
  async notifyListeners(event, data) {
    const cbs = this.customListenersMap.get(event);
    cbs && await Promise.allSettled(cbs.map((cb) => cb(data)));
  }
  clear() {
    this.hotModulesMap.clear(), this.disposeMap.clear(), this.pruneMap.clear(), this.dataMap.clear(), this.customListenersMap.clear(), this.ctxToListenersMap.clear();
  }
  // After an HMR update, some modules are no longer imported on the page
  // but they may have left behind side effects that need to be cleaned up
  // (.e.g style injections)
  async prunePaths(paths) {
    await Promise.all(
      paths.map((path) => {
        const disposer = this.disposeMap.get(path);
        if (disposer) return disposer(this.dataMap.get(path));
      })
    ), paths.forEach((path) => {
      const fn = this.pruneMap.get(path);
      fn && fn(this.dataMap.get(path));
    });
  }
  warnFailedUpdate(err, path) {
    err.message.includes("fetch") || this.logger.error(err), this.logger.error(
      `[hmr] Failed to reload ${path}. This could be due to syntax errors or importing non-existent modules. (see errors above)`
    );
  }
  updateQueue = [];
  pendingUpdateQueue = !1;
  /**
   * buffer multiple hot updates triggered by the same src change
   * so that they are invoked in the same order they were sent.
   * (otherwise the order may be inconsistent because of the http request round trip)
   */
  async queueUpdate(payload) {
    if (this.updateQueue.push(this.fetchUpdate(payload)), !this.pendingUpdateQueue) {
      this.pendingUpdateQueue = !0, await Promise.resolve(), this.pendingUpdateQueue = !1;
      const loading = [...this.updateQueue];
      this.updateQueue = [], (await Promise.all(loading)).forEach((fn) => fn && fn());
    }
  }
  async fetchUpdate(update) {
    const { path, acceptedPath } = update, mod = this.hotModulesMap.get(path);
    if (!mod)
      return;
    let fetchedModule;
    const isSelfUpdate = path === acceptedPath, qualifiedCallbacks = mod.callbacks.filter(
      ({ deps }) => deps.includes(acceptedPath)
    );
    if (isSelfUpdate || qualifiedCallbacks.length > 0) {
      const disposer = this.disposeMap.get(acceptedPath);
      disposer && await disposer(this.dataMap.get(acceptedPath));
      try {
        fetchedModule = await this.importUpdatedModule(update);
      } catch (e) {
        this.warnFailedUpdate(e, acceptedPath);
      }
    }
    return () => {
      for (const { deps, fn } of qualifiedCallbacks)
        fn(
          deps.map((dep) => dep === acceptedPath ? fetchedModule : void 0)
        );
      const loggedPath = isSelfUpdate ? path : `${acceptedPath} via ${path}`;
      this.logger.debug(`[vite] hot updated: ${loggedPath}`);
    };
  }
}
function analyzeImportedModDifference(mod, rawId, moduleType, metadata) {
  if (!metadata?.isDynamicImport && metadata?.importedNames?.length) {
    const missingBindings = metadata.importedNames.filter((s) => !(s in mod));
    if (missingBindings.length) {
      const lastBinding = missingBindings[missingBindings.length - 1];
      throw moduleType === "module" ? new SyntaxError(
        `[vite] The requested module '${rawId}' does not provide an export named '${lastBinding}'`
      ) : new SyntaxError(`[vite] Named export '${lastBinding}' not found. The requested module '${rawId}' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from '${rawId}';
const {${missingBindings.join(", ")}} = pkg;
`);
    }
  }
}
const ssrModuleExportsKey = "__vite_ssr_exports__", ssrImportKey = "__vite_ssr_import__", ssrDynamicImportKey = "__vite_ssr_dynamic_import__", ssrExportAllKey = "__vite_ssr_exportAll__", ssrImportMetaKey = "__vite_ssr_import_meta__", noop = () => {
}, silentConsole = {
  debug: noop,
  error: noop
};
function createHMRHandler(runtime) {
  const queue = new Queue();
  return (payload) => queue.enqueue(() => handleHMRPayload(runtime, payload));
}
async function handleHMRPayload(runtime, payload) {
  const hmrClient = runtime.hmrClient;
  if (!(!hmrClient || runtime.isDestroyed()))
    switch (payload.type) {
      case "connected":
        hmrClient.logger.debug("[vite] connected."), hmrClient.messenger.flush();
        break;
      case "update":
        await hmrClient.notifyListeners("vite:beforeUpdate", payload), await Promise.all(
          payload.updates.map(async (update) => {
            if (update.type === "js-update")
              return update.acceptedPath = unwrapId(update.acceptedPath), update.path = unwrapId(update.path), hmrClient.queueUpdate(update);
            hmrClient.logger.error(
              "[vite] css hmr is not supported in runtime mode."
            );
          })
        ), await hmrClient.notifyListeners("vite:afterUpdate", payload);
        break;
      case "custom": {
        await hmrClient.notifyListeners(payload.event, payload.data);
        break;
      }
      case "full-reload": {
        const { triggeredBy } = payload, clearEntrypoints = triggeredBy ? [...runtime.entrypoints].filter(
          (entrypoint) => runtime.moduleCache.isImported({
            importedId: triggeredBy,
            importedBy: entrypoint
          })
        ) : [...runtime.entrypoints];
        if (!clearEntrypoints.length) break;
        hmrClient.logger.debug("[vite] program reload"), await hmrClient.notifyListeners("vite:beforeFullReload", payload), runtime.moduleCache.clear();
        for (const id of clearEntrypoints)
          await runtime.executeUrl(id);
        break;
      }
      case "prune":
        await hmrClient.notifyListeners("vite:beforePrune", payload), await hmrClient.prunePaths(payload.paths);
        break;
      case "error": {
        await hmrClient.notifyListeners("vite:error", payload);
        const err = payload.err;
        hmrClient.logger.error(
          `[vite] Internal Server Error
${err.message}
${err.stack}`
        );
        break;
      }
      default:
        return payload;
    }
}
class Queue {
  queue = [];
  pending = !1;
  enqueue(promise) {
    return new Promise((resolve2, reject) => {
      this.queue.push({
        promise,
        resolve: resolve2,
        reject
      }), this.dequeue();
    });
  }
  dequeue() {
    if (this.pending)
      return !1;
    const item = this.queue.shift();
    return item ? (this.pending = !0, item.promise().then(item.resolve).catch(item.reject).finally(() => {
      this.pending = !1, this.dequeue();
    }), !0) : !1;
  }
}
const sourceMapCache = {}, fileContentsCache = {}, moduleGraphs = /* @__PURE__ */ new Set(), retrieveFileHandlers = /* @__PURE__ */ new Set(), retrieveSourceMapHandlers = /* @__PURE__ */ new Set(), createExecHandlers = (handlers) => (...args) => {
  for (const handler of handlers) {
    const result = handler(...args);
    if (result) return result;
  }
  return null;
}, retrieveFileFromHandlers = createExecHandlers(retrieveFileHandlers), retrieveSourceMapFromHandlers = createExecHandlers(
  retrieveSourceMapHandlers
);
let overridden = !1;
const originalPrepare = Error.prepareStackTrace;
function resetInterceptor(runtime, options) {
  moduleGraphs.delete(runtime.moduleCache), options.retrieveFile && retrieveFileHandlers.delete(options.retrieveFile), options.retrieveSourceMap && retrieveSourceMapHandlers.delete(options.retrieveSourceMap), moduleGraphs.size === 0 && (Error.prepareStackTrace = originalPrepare, overridden = !1);
}
function interceptStackTrace(runtime, options = {}) {
  return overridden || (Error.prepareStackTrace = prepareStackTrace, overridden = !0), moduleGraphs.add(runtime.moduleCache), options.retrieveFile && retrieveFileHandlers.add(options.retrieveFile), options.retrieveSourceMap && retrieveSourceMapHandlers.add(options.retrieveSourceMap), () => resetInterceptor(runtime, options);
}
function supportRelativeURL(file, url) {
  if (!file) return url;
  const dir = posixDirname(slash(file)), match = /^\w+:\/\/[^/]*/.exec(dir);
  let protocol = match ? match[0] : "";
  const startPath = dir.slice(protocol.length);
  return protocol && /^\/\w:/.test(startPath) ? (protocol += "/", protocol + slash(posixResolve(startPath, url))) : protocol + posixResolve(startPath, url);
}
function getRuntimeSourceMap(position) {
  for (const moduleCache of moduleGraphs) {
    const sourceMap = moduleCache.getSourceMap(position.source);
    if (sourceMap)
      return {
        url: position.source,
        map: sourceMap,
        vite: !0
      };
  }
  return null;
}
function retrieveFile(path) {
  if (path in fileContentsCache) return fileContentsCache[path];
  const content = retrieveFileFromHandlers(path);
  return typeof content == "string" ? (fileContentsCache[path] = content, content) : null;
}
function retrieveSourceMapURL(source) {
  const fileData = retrieveFile(source);
  if (!fileData) return null;
  const re = /\/\/[@#]\s*sourceMappingURL=([^\s'"]+)\s*$|\/\*[@#]\s*sourceMappingURL=[^\s*'"]+\s*\*\/\s*$/gm;
  let lastMatch, match;
  for (; match = re.exec(fileData); ) lastMatch = match;
  return lastMatch ? lastMatch[1] : null;
}
const reSourceMap = /^data:application\/json[^,]+base64,/;
function retrieveSourceMap(source) {
  const urlAndMap = retrieveSourceMapFromHandlers(source);
  if (urlAndMap) return urlAndMap;
  let sourceMappingURL = retrieveSourceMapURL(source);
  if (!sourceMappingURL) return null;
  let sourceMapData;
  if (reSourceMap.test(sourceMappingURL)) {
    const rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(",") + 1);
    sourceMapData = Buffer.from(rawData, "base64").toString(), sourceMappingURL = source;
  } else
    sourceMappingURL = supportRelativeURL(source, sourceMappingURL), sourceMapData = retrieveFile(sourceMappingURL);
  return sourceMapData ? {
    url: sourceMappingURL,
    map: sourceMapData
  } : null;
}
function mapSourcePosition(position) {
  if (!position.source) return position;
  let sourceMap = getRuntimeSourceMap(position);
  if (sourceMap || (sourceMap = sourceMapCache[position.source]), !sourceMap) {
    const urlAndMap = retrieveSourceMap(position.source);
    if (urlAndMap && urlAndMap.map) {
      const url = urlAndMap.url;
      sourceMap = sourceMapCache[position.source] = {
        url,
        map: new DecodedMap(
          typeof urlAndMap.map == "string" ? JSON.parse(urlAndMap.map) : urlAndMap.map,
          url
        )
      };
      const contents = sourceMap.map?.map.sourcesContent;
      sourceMap.map && contents && sourceMap.map.resolvedSources.forEach((source, i) => {
        const content = contents[i];
        if (content && source && url) {
          const contentUrl = supportRelativeURL(url, source);
          fileContentsCache[contentUrl] = content;
        }
      });
    } else
      sourceMap = sourceMapCache[position.source] = {
        url: null,
        map: null
      };
  }
  if (sourceMap && sourceMap.map && sourceMap.url) {
    const originalPosition = getOriginalPosition(sourceMap.map, position);
    if (originalPosition && originalPosition.source != null)
      return originalPosition.source = supportRelativeURL(
        sourceMap.url,
        originalPosition.source
      ), sourceMap.vite && (originalPosition._vite = !0), originalPosition;
  }
  return position;
}
function mapEvalOrigin(origin) {
  let match = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
  if (match) {
    const position = mapSourcePosition({
      name: null,
      source: match[2],
      line: +match[3],
      column: +match[4] - 1
    });
    return `eval at ${match[1]} (${position.source}:${position.line}:${position.column + 1})`;
  }
  return match = /^eval at ([^(]+) \((.+)\)$/.exec(origin), match ? `eval at ${match[1]} (${mapEvalOrigin(match[2])})` : origin;
}
function CallSiteToString() {
  let fileName, fileLocation = "";
  if (this.isNative())
    fileLocation = "native";
  else {
    fileName = this.getScriptNameOrSourceURL(), !fileName && this.isEval() && (fileLocation = this.getEvalOrigin(), fileLocation += ", "), fileName ? fileLocation += fileName : fileLocation += "<anonymous>";
    const lineNumber = this.getLineNumber();
    if (lineNumber != null) {
      fileLocation += `:${lineNumber}`;
      const columnNumber = this.getColumnNumber();
      columnNumber && (fileLocation += `:${columnNumber}`);
    }
  }
  let line = "";
  const functionName = this.getFunctionName();
  let addSuffix = !0;
  const isConstructor = this.isConstructor();
  if (this.isToplevel() || isConstructor)
    isConstructor ? line += `new ${functionName || "<anonymous>"}` : functionName ? line += functionName : (line += fileLocation, addSuffix = !1);
  else {
    let typeName = this.getTypeName();
    typeName === "[object Object]" && (typeName = "null");
    const methodName = this.getMethodName();
    functionName ? (typeName && functionName.indexOf(typeName) !== 0 && (line += `${typeName}.`), line += functionName, methodName && functionName.indexOf(`.${methodName}`) !== functionName.length - methodName.length - 1 && (line += ` [as ${methodName}]`)) : line += `${typeName}.${methodName || "<anonymous>"}`;
  }
  return addSuffix && (line += ` (${fileLocation})`), line;
}
function cloneCallSite(frame) {
  const object = {};
  return Object.getOwnPropertyNames(Object.getPrototypeOf(frame)).forEach((name) => {
    const key = name;
    object[key] = /^(?:is|get)/.test(name) ? function() {
      return frame[key].call(frame);
    } : frame[key];
  }), object.toString = CallSiteToString, object;
}
function wrapCallSite(frame, state) {
  if (state === void 0 && (state = { nextPosition: null, curPosition: null }), frame.isNative())
    return state.curPosition = null, frame;
  const source = frame.getFileName() || frame.getScriptNameOrSourceURL();
  if (source) {
    const line = frame.getLineNumber();
    let column = frame.getColumnNumber() - 1;
    const headerLength = 62;
    line === 1 && column > headerLength && !frame.isEval() && (column -= headerLength);
    const position = mapSourcePosition({
      name: null,
      source,
      line,
      column
    });
    state.curPosition = position, frame = cloneCallSite(frame);
    const originalFunctionName = frame.getFunctionName;
    return frame.getFunctionName = function() {
      const name = state.nextPosition == null ? originalFunctionName() : state.nextPosition.name || originalFunctionName();
      return name === "eval" && "_vite" in position ? null : name;
    }, frame.getFileName = function() {
      return position.source ?? void 0;
    }, frame.getLineNumber = function() {
      return position.line;
    }, frame.getColumnNumber = function() {
      return position.column + 1;
    }, frame.getScriptNameOrSourceURL = function() {
      return position.source;
    }, frame;
  }
  let origin = frame.isEval() && frame.getEvalOrigin();
  return origin && (origin = mapEvalOrigin(origin), frame = cloneCallSite(frame), frame.getEvalOrigin = function() {
    return origin || void 0;
  }), frame;
}
function prepareStackTrace(error, stack) {
  const name = error.name || "Error", message = error.message || "", errorString = `${name}: ${message}`, state = { nextPosition: null, curPosition: null }, processedStack = [];
  for (let i = stack.length - 1; i >= 0; i--)
    processedStack.push(`
    at ${wrapCallSite(stack[i], state)}`), state.nextPosition = state.curPosition;
  return state.curPosition = state.nextPosition = null, errorString + processedStack.reverse().join("");
}
function enableSourceMapSupport(runtime) {
  if (runtime.options.sourcemapInterceptor === "node") {
    if (typeof process > "u")
      throw new TypeError(
        `Cannot use "sourcemapInterceptor: 'node'" because global "process" variable is not available.`
      );
    if (typeof process.setSourceMapsEnabled != "function")
      throw new TypeError(
        `Cannot use "sourcemapInterceptor: 'node'" because "process.setSourceMapsEnabled" function is not available. Please use Node >= 16.6.0.`
      );
    const isEnabledAlready = process.sourceMapsEnabled ?? !1;
    return process.setSourceMapsEnabled(!0), () => !isEnabledAlready && process.setSourceMapsEnabled(!1);
  }
  return interceptStackTrace(
    runtime,
    typeof runtime.options.sourcemapInterceptor == "object" ? runtime.options.sourcemapInterceptor : void 0
  );
}
class ViteRuntime {
  constructor(options, runner, debug) {
    this.options = options, this.runner = runner, this.debug = debug, this.moduleCache = options.moduleCache ?? new ModuleCacheMap(options.root), typeof options.hmr == "object" && (this.hmrClient = new HMRClient(
      options.hmr.logger === !1 ? silentConsole : options.hmr.logger || console,
      options.hmr.connection,
      ({ acceptedPath, ssrInvalidates }) => (this.moduleCache.invalidate(acceptedPath), ssrInvalidates && this.invalidateFiles(ssrInvalidates), this.executeUrl(acceptedPath))
    ), options.hmr.connection.onUpdate(createHMRHandler(this))), options.sourcemapInterceptor !== !1 && (this._resetSourceMapSupport = enableSourceMapSupport(this));
  }
  /**
   * Holds the cache of modules
   * Keys of the map are ids
   */
  moduleCache;
  hmrClient;
  entrypoints = /* @__PURE__ */ new Set();
  idToUrlMap = /* @__PURE__ */ new Map();
  fileToIdMap = /* @__PURE__ */ new Map();
  envProxy = new Proxy({}, {
    get(_, p) {
      throw new Error(
        `[vite-runtime] Dynamic access of "import.meta.env" is not supported. Please, use "import.meta.env.${String(p)}" instead.`
      );
    }
  });
  _destroyed = !1;
  _resetSourceMapSupport;
  /**
   * URL to execute. Accepts file path, server path or id relative to the root.
   */
  async executeUrl(url) {
    url = this.normalizeEntryUrl(url);
    const fetchedModule = await this.cachedModule(url);
    return await this.cachedRequest(url, fetchedModule);
  }
  /**
   * Entrypoint URL to execute. Accepts file path, server path or id relative to the root.
   * In the case of a full reload triggered by HMR, this is the module that will be reloaded.
   * If this method is called multiple times, all entrypoints will be reloaded one at a time.
   */
  async executeEntrypoint(url) {
    url = this.normalizeEntryUrl(url);
    const fetchedModule = await this.cachedModule(url);
    return await this.cachedRequest(url, fetchedModule, [], {
      entrypoint: !0
    });
  }
  /**
   * Clear all caches including HMR listeners.
   */
  clearCache() {
    this.moduleCache.clear(), this.idToUrlMap.clear(), this.entrypoints.clear(), this.hmrClient?.clear();
  }
  /**
   * Clears all caches, removes all HMR listeners, and resets source map support.
   * This method doesn't stop the HMR connection.
   */
  async destroy() {
    this._resetSourceMapSupport?.(), this.clearCache(), this.hmrClient = void 0, this._destroyed = !0;
  }
  /**
   * Returns `true` if the runtime has been destroyed by calling `destroy()` method.
   */
  isDestroyed() {
    return this._destroyed;
  }
  invalidateFiles(files) {
    files.forEach((file) => {
      const ids = this.fileToIdMap.get(file);
      ids && ids.forEach((id) => this.moduleCache.invalidate(id));
    });
  }
  // we don't use moduleCache.normalize because this URL doesn't have to follow the same rules
  // this URL is something that user passes down manually, and is later resolved by fetchModule
  // moduleCache.normalize is used on resolved "file" property
  normalizeEntryUrl(url) {
    if (url[0] === ".")
      return url;
    url.startsWith("file://") && (url = url.slice(isWindows ? 8 : 7)), url = slash(url);
    const _root = this.options.root, root = _root[_root.length - 1] === "/" ? _root : `${_root}/`;
    return url.startsWith(root) ? url.slice(root.length - 1) : url[0] === "/" ? url : wrapId(url);
  }
  processImport(exports, fetchResult, metadata) {
    if (!("externalize" in fetchResult))
      return exports;
    const { id, type } = fetchResult;
    return type !== "module" && type !== "commonjs" || analyzeImportedModDifference(exports, id, type, metadata), exports;
  }
  async cachedRequest(id, fetchedModule, callstack = [], metadata) {
    const moduleId = fetchedModule.id;
    metadata?.entrypoint && this.entrypoints.add(moduleId);
    const mod = this.moduleCache.getByModuleId(moduleId), { imports, importers } = mod, importee = callstack[callstack.length - 1];
    if (importee && importers.add(importee), (callstack.includes(moduleId) || Array.from(imports.values()).some((i) => importers.has(i))) && mod.exports)
      return this.processImport(mod.exports, fetchedModule, metadata);
    let debugTimer;
    this.debug && (debugTimer = setTimeout(() => {
      const getStack = () => `stack:
${[...callstack, moduleId].reverse().map((p) => `  - ${p}`).join(`
`)}`;
      this.debug(
        `[vite-runtime] module ${moduleId} takes over 2s to load.
${getStack()}`
      );
    }, 2e3));
    try {
      if (mod.promise)
        return this.processImport(await mod.promise, fetchedModule, metadata);
      const promise = this.directRequest(id, fetchedModule, callstack);
      return mod.promise = promise, mod.evaluated = !1, this.processImport(await promise, fetchedModule, metadata);
    } finally {
      mod.evaluated = !0, debugTimer && clearTimeout(debugTimer);
    }
  }
  async cachedModule(id, importer) {
    if (this._destroyed)
      throw new Error("[vite] Vite runtime has been destroyed.");
    const normalized = this.idToUrlMap.get(id);
    if (normalized) {
      const mod2 = this.moduleCache.getByModuleId(normalized);
      if (mod2.meta)
        return mod2.meta;
    }
    this.debug?.("[vite-runtime] fetching", id);
    const fetchedModule = id.startsWith("data:") ? { externalize: id, type: "builtin" } : await this.options.fetchModule(id, importer), idQuery = id.split("?")[1], query = idQuery ? `?${idQuery}` : "", file = "file" in fetchedModule ? fetchedModule.file : void 0, fullFile = file ? `${file}${query}` : id, moduleId = this.moduleCache.normalize(fullFile), mod = this.moduleCache.getByModuleId(moduleId);
    if (fetchedModule.id = moduleId, mod.meta = fetchedModule, file) {
      const fileModules = this.fileToIdMap.get(file) || [];
      fileModules.push(moduleId), this.fileToIdMap.set(file, fileModules);
    }
    return this.idToUrlMap.set(id, moduleId), this.idToUrlMap.set(unwrapId(id), moduleId), fetchedModule;
  }
  // override is allowed, consider this a public API
  async directRequest(id, fetchResult, _callstack) {
    const moduleId = fetchResult.id, callstack = [..._callstack, moduleId], mod = this.moduleCache.getByModuleId(moduleId), request = async (dep, metadata) => {
      const fetchedModule = await this.cachedModule(dep, moduleId);
      return this.moduleCache.getByModuleId(fetchedModule.id).importers.add(moduleId), mod.imports.add(fetchedModule.id), this.cachedRequest(dep, fetchedModule, callstack, metadata);
    }, dynamicRequest = async (dep) => (dep = String(dep), dep[0] === "." && (dep = posixResolve(posixDirname(id), dep)), request(dep, { isDynamicImport: !0 }));
    if ("externalize" in fetchResult) {
      const { externalize } = fetchResult;
      this.debug?.("[vite-runtime] externalizing", externalize);
      const exports2 = await this.runner.runExternalModule(externalize);
      return mod.exports = exports2, exports2;
    }
    const { code, file } = fetchResult;
    if (code == null) {
      const importer = callstack[callstack.length - 2];
      throw new Error(
        `[vite-runtime] Failed to load "${id}"${importer ? ` imported from ${importer}` : ""}`
      );
    }
    const modulePath = cleanUrl(file || moduleId), href = posixPathToFileHref(modulePath), filename = modulePath, dirname2 = posixDirname(modulePath), meta = {
      filename: isWindows ? toWindowsPath(filename) : filename,
      dirname: isWindows ? toWindowsPath(dirname2) : dirname2,
      url: href,
      env: this.envProxy,
      resolve(id2, parent) {
        throw new Error(
          '[vite-runtime] "import.meta.resolve" is not supported.'
        );
      },
      // should be replaced during transformation
      glob() {
        throw new Error('[vite-runtime] "import.meta.glob" is not supported.');
      }
    }, exports = /* @__PURE__ */ Object.create(null);
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module",
      enumerable: !1,
      configurable: !1
    }), mod.exports = exports;
    let hotContext;
    this.hmrClient && Object.defineProperty(meta, "hot", {
      enumerable: !0,
      get: () => {
        if (!this.hmrClient)
          throw new Error("[vite-runtime] HMR client was destroyed.");
        return this.debug?.("[vite-runtime] creating hmr context for", moduleId), hotContext ||= new HMRContext(this.hmrClient, moduleId), hotContext;
      },
      set: (value) => {
        hotContext = value;
      }
    });
    const context = {
      [ssrImportKey]: request,
      [ssrDynamicImportKey]: dynamicRequest,
      [ssrModuleExportsKey]: exports,
      [ssrExportAllKey]: (obj) => exportAll(exports, obj),
      [ssrImportMetaKey]: meta
    };
    return this.debug?.("[vite-runtime] executing", href), await this.runner.runViteModule(context, code, id), exports;
  }
}
function exportAll(exports, sourceModule) {
  if (exports !== sourceModule && !(isPrimitive(sourceModule) || Array.isArray(sourceModule) || sourceModule instanceof Promise)) {
    for (const key in sourceModule)
      if (key !== "default" && key !== "__esModule")
        try {
          Object.defineProperty(exports, key, {
            enumerable: !0,
            configurable: !0,
            get: () => sourceModule[key]
          });
        } catch {
        }
  }
}
class ESModulesRunner {
  async runViteModule(context, code) {
    await new AsyncFunction(
      ssrModuleExportsKey,
      ssrImportMetaKey,
      ssrImportKey,
      ssrDynamicImportKey,
      ssrExportAllKey,
      // source map should already be inlined by Vite
      '"use strict";' + code
    )(
      context[ssrModuleExportsKey],
      context[ssrImportMetaKey],
      context[ssrImportKey],
      context[ssrDynamicImportKey],
      context[ssrExportAllKey]
    ), Object.seal(context[ssrModuleExportsKey]);
  }
  runExternalModule(filepath) {
    return __webpack_require__("./node_modules/vite/dist/node lazy recursive")(filepath);
  }
}



/***/ }),

/***/ "node:assert":
/*!*******************!*\
  !*** node:assert ***!
  \*******************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:assert\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:buffer":
/*!*******************!*\
  !*** node:buffer ***!
  \*******************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:buffer\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:child_process":
/*!**************************!*\
  !*** node:child_process ***!
  \**************************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:child_process\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:crypto":
/*!*******************!*\
  !*** node:crypto ***!
  \*******************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:crypto\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:dns":
/*!****************!*\
  !*** node:dns ***!
  \****************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:dns\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:events":
/*!*******************!*\
  !*** node:events ***!
  \*******************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:events\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:fs":
/*!***************!*\
  !*** node:fs ***!
  \***************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:fs\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\Hook.js:18:14)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:fs/promises":
/*!************************!*\
  !*** node:fs/promises ***!
  \************************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:fs/promises\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:http":
/*!*****************!*\
  !*** node:http ***!
  \*****************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:http\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:https":
/*!******************!*\
  !*** node:https ***!
  \******************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:https\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:module":
/*!*******************!*\
  !*** node:module ***!
  \*******************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:module\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:os":
/*!***************!*\
  !*** node:os ***!
  \***************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:os\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:path":
/*!*****************!*\
  !*** node:path ***!
  \*****************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:path\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:perf_hooks":
/*!***********************!*\
  !*** node:perf_hooks ***!
  \***********************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:perf_hooks\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:process":
/*!********************!*\
  !*** node:process ***!
  \********************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:process\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:readline":
/*!*********************!*\
  !*** node:readline ***!
  \*********************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:readline\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:stream":
/*!*******************!*\
  !*** node:stream ***!
  \*******************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:stream\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:string_decoder":
/*!***************************!*\
  !*** node:string_decoder ***!
  \***************************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:string_decoder\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:url":
/*!****************!*\
  !*** node:url ***!
  \****************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:url\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:util":
/*!*****************!*\
  !*** node:util ***!
  \*****************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:util\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:v8":
/*!***************!*\
  !*** node:v8 ***!
  \***************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:v8\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:worker_threads":
/*!***************************!*\
  !*** node:worker_threads ***!
  \***************************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:worker_threads\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ }),

/***/ "node:zlib":
/*!*****************!*\
  !*** node:zlib ***!
  \*****************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:zlib\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:973:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Object.processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:969:8)\n    at processResource (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:959:3)\n    at NormalModule.build (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1144:15)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1418:12\n    at NormalModule.needBuild (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\NormalModule.js:1466:32)\n    at Compilation._buildModule (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\Compilation.js:1399:10)\n    at C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:324:10\n    at Hook.eval [as callAsync] (eval at create (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at AsyncQueue._startProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:314:26)\n    at AsyncQueue._ensureProcessing (C:\\xampp\\htdocs\\back\\ard-alfn\\node_modules\\webpack\\lib\\util\\AsyncQueue.js:301:12)\n    at process.processImmediate (node:internal/timers:476:21)");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames not based on template
/******/ 			if ({"node_modules_vite_dist_node_chunks_dep-D-7KCb9p_js":1,"node_modules_vite_dist_node_chunks_dep-CHbHjMYU_js":1,"node_modules_vite_dist_node_chunks_dep-B8yndt7W_js":1,"node_modules_postcss_lib_postcss_mjs":1,"node_http2":1,"node_modules_rollup_dist_es_rollup_js":1,"node_modules_rollup_dist_es_shared_watch_js":1}[chunkId]) return "js/" + chunkId + ".js";
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		// data-webpack is not used as build has no uniqueName
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 		
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************************************!*\
  !*** ./node_modules/vite/dist/node/index.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServerHMRConnector: () => (/* binding */ ServerHMRConnector),
/* harmony export */   build: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.b),
/* harmony export */   buildErrorMessage: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.g),
/* harmony export */   createFilter: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.k),
/* harmony export */   createLogger: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.v),
/* harmony export */   createServer: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.c),
/* harmony export */   createViteRuntime: () => (/* binding */ createViteRuntime),
/* harmony export */   defineConfig: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.d),
/* harmony export */   esbuildVersion: () => (/* reexport safe */ esbuild__WEBPACK_IMPORTED_MODULE_3__.version),
/* harmony export */   fetchModule: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.h),
/* harmony export */   formatPostcssSourceMap: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.f),
/* harmony export */   isCSSRequest: () => (/* binding */ isCSSRequest),
/* harmony export */   isFileServingAllowed: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.x),
/* harmony export */   loadConfigFromFile: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.l),
/* harmony export */   loadEnv: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.y),
/* harmony export */   mergeAlias: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.j),
/* harmony export */   mergeConfig: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.m),
/* harmony export */   normalizePath: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.n),
/* harmony export */   optimizeDeps: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.o),
/* harmony export */   parseAst: () => (/* reexport safe */ rollup_parseAst__WEBPACK_IMPORTED_MODULE_0__.parseAst),
/* harmony export */   parseAstAsync: () => (/* reexport safe */ rollup_parseAst__WEBPACK_IMPORTED_MODULE_0__.parseAstAsync),
/* harmony export */   preprocessCSS: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.e),
/* harmony export */   preview: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.p),
/* harmony export */   resolveConfig: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.r),
/* harmony export */   resolveEnvPrefix: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.z),
/* harmony export */   rollupVersion: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.q),
/* harmony export */   searchForWorkspaceRoot: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.w),
/* harmony export */   send: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.u),
/* harmony export */   sortUserPlugins: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.s),
/* harmony export */   splitVendorChunk: () => (/* binding */ splitVendorChunk),
/* harmony export */   splitVendorChunkPlugin: () => (/* binding */ splitVendorChunkPlugin),
/* harmony export */   transformWithEsbuild: () => (/* reexport safe */ _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.t),
/* harmony export */   version: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_2__.VERSION)
/* harmony export */ });
/* harmony import */ var rollup_parseAst__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rollup/parseAst */ "./node_modules/rollup/dist/es/parseAst.js");
/* harmony import */ var _chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunks/dep-BzOvws4Y.js */ "./node_modules/vite/dist/node/chunks/dep-BzOvws4Y.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./node_modules/vite/dist/node/constants.js");
/* harmony import */ var esbuild__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! esbuild */ "./node_modules/esbuild/lib/main.js");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var vite_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vite/runtime */ "./node_modules/vite/dist/node/runtime.js");
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! node:fs/promises */ "node:fs/promises");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! node:url */ "node:url");
/* harmony import */ var node_util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! node:util */ "node:util");
/* harmony import */ var node_perf_hooks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! node:perf_hooks */ "node:perf_hooks");
/* harmony import */ var node_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! node:module */ "node:module");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'tty'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var node_events__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! node:events */ "node:events");
/* harmony import */ var node_stream__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! node:stream */ "node:stream");
/* harmony import */ var node_string_decoder__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! node:string_decoder */ "node:string_decoder");
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! node:child_process */ "node:child_process");
/* harmony import */ var node_http__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! node:http */ "node:http");
/* harmony import */ var node_https__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! node:https */ "node:https");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'net'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'http'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'stream'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'os'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'child_process'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! node:os */ "node:os");
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! node:crypto */ "node:crypto");
/* harmony import */ var node_dns__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! node:dns */ "node:dns");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'crypto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'module'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var node_assert__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! node:assert */ "node:assert");
/* harmony import */ var node_v8__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! node:v8 */ "node:v8");
/* harmony import */ var node_worker_threads__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! node:worker_threads */ "node:worker_threads");
/* harmony import */ var node_buffer__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! node:buffer */ "node:buffer");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'querystring'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var node_readline__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! node:readline */ "node:readline");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'zlib'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'https'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'tls'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! assert */ "./node_modules/assert/assert.js");
/* harmony import */ var node_zlib__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! node:zlib */ "node:zlib");
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
















































const CSS_LANGS_RE = (
  // eslint-disable-next-line regexp/no-unused-capturing-group
  /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/
);
const isCSSRequest = (request) => CSS_LANGS_RE.test(request);
class SplitVendorChunkCache {
  cache;
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  reset() {
    this.cache = /* @__PURE__ */ new Map();
  }
}
function splitVendorChunk(options = {}) {
  const cache = options.cache ?? new SplitVendorChunkCache();
  return (id, { getModuleInfo }) => {
    if ((0,_chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.i)(id) && !isCSSRequest(id) && staticImportedByEntry(id, getModuleInfo, cache.cache)) {
      return "vendor";
    }
  };
}
function staticImportedByEntry(id, getModuleInfo, cache, importStack = []) {
  if (cache.has(id)) {
    return cache.get(id);
  }
  if (importStack.includes(id)) {
    cache.set(id, false);
    return false;
  }
  const mod = getModuleInfo(id);
  if (!mod) {
    cache.set(id, false);
    return false;
  }
  if (mod.isEntry) {
    cache.set(id, true);
    return true;
  }
  const someImporterIs = mod.importers.some(
    (importer) => staticImportedByEntry(
      importer,
      getModuleInfo,
      cache,
      importStack.concat(id)
    )
  );
  cache.set(id, someImporterIs);
  return someImporterIs;
}
function splitVendorChunkPlugin() {
  const caches = [];
  function createSplitVendorChunk(output, config) {
    const cache = new SplitVendorChunkCache();
    caches.push(cache);
    const build = config.build ?? {};
    const format = output?.format;
    if (!build.ssr && !build.lib && format !== "umd" && format !== "iife") {
      return splitVendorChunk({ cache });
    }
  }
  return {
    name: "vite:split-vendor-chunk",
    config(config) {
      let outputs = config?.build?.rollupOptions?.output;
      if (outputs) {
        outputs = (0,_chunks_dep_BzOvws4Y_js__WEBPACK_IMPORTED_MODULE_1__.a)(outputs);
        for (const output of outputs) {
          const viteManualChunks = createSplitVendorChunk(output, config);
          if (viteManualChunks) {
            if (output.manualChunks) {
              if (typeof output.manualChunks === "function") {
                const userManualChunks = output.manualChunks;
                output.manualChunks = (id, api) => {
                  return userManualChunks(id, api) ?? viteManualChunks(id, api);
                };
              } else {
                console.warn(
                  "(!) the `splitVendorChunk` plugin doesn't have any effect when using the object form of `build.rollupOptions.output.manualChunks`. Consider using the function form instead."
                );
              }
            } else {
              output.manualChunks = viteManualChunks;
            }
          }
        }
      } else {
        return {
          build: {
            rollupOptions: {
              output: {
                manualChunks: createSplitVendorChunk({}, config)
              }
            }
          }
        };
      }
    },
    buildStart() {
      caches.forEach((cache) => cache.reset());
    }
  };
}

class ServerHMRBroadcasterClient {
  constructor(hmrChannel) {
    this.hmrChannel = hmrChannel;
  }
  send(...args) {
    let payload;
    if (typeof args[0] === "string") {
      payload = {
        type: "custom",
        event: args[0],
        data: args[1]
      };
    } else {
      payload = args[0];
    }
    if (payload.type !== "custom") {
      throw new Error(
        "Cannot send non-custom events from the client to the server."
      );
    }
    this.hmrChannel.send(payload);
  }
}
class ServerHMRConnector {
  handlers = [];
  hmrChannel;
  hmrClient;
  connected = false;
  constructor(server) {
    const hmrChannel = server.hot?.channels.find(
      (c) => c.name === "ssr"
    );
    if (!hmrChannel) {
      throw new Error(
        "Your version of Vite doesn't support HMR during SSR. Please, use Vite 5.1 or higher."
      );
    }
    this.hmrClient = new ServerHMRBroadcasterClient(hmrChannel);
    hmrChannel.api.outsideEmitter.on("send", (payload) => {
      this.handlers.forEach((listener) => listener(payload));
    });
    this.hmrChannel = hmrChannel;
  }
  isReady() {
    return this.connected;
  }
  send(message) {
    const payload = JSON.parse(message);
    this.hmrChannel.api.innerEmitter.emit(
      payload.event,
      payload.data,
      this.hmrClient
    );
  }
  onUpdate(handler) {
    this.handlers.push(handler);
    handler({ type: "connected" });
    this.connected = true;
  }
}

function createHMROptions(server, options) {
  if (server.config.server.hmr === false || options.hmr === false) {
    return false;
  }
  const connection = new ServerHMRConnector(server);
  return {
    connection,
    logger: options.hmr?.logger
  };
}
const prepareStackTrace = {
  retrieveFile(id) {
    if ((0,node_fs__WEBPACK_IMPORTED_MODULE_4__.existsSync)(id)) {
      return (0,node_fs__WEBPACK_IMPORTED_MODULE_4__.readFileSync)(id, "utf-8");
    }
  }
};
function resolveSourceMapOptions(options) {
  if (options.sourcemapInterceptor != null) {
    if (options.sourcemapInterceptor === "prepareStackTrace") {
      return prepareStackTrace;
    }
    if (typeof options.sourcemapInterceptor === "object") {
      return { ...prepareStackTrace, ...options.sourcemapInterceptor };
    }
    return options.sourcemapInterceptor;
  }
  if (typeof process !== "undefined" && "setSourceMapsEnabled" in process) {
    return "node";
  }
  return prepareStackTrace;
}
async function createViteRuntime(server, options = {}) {
  const hmr = createHMROptions(server, options);
  return new vite_runtime__WEBPACK_IMPORTED_MODULE_5__.ViteRuntime(
    {
      ...options,
      root: server.config.root,
      fetchModule: server.ssrFetchModule,
      hmr,
      sourcemapInterceptor: resolveSourceMapOptions(options)
    },
    options.runner || new vite_runtime__WEBPACK_IMPORTED_MODULE_5__.ESModulesRunner()
  );
}



})();

/******/ })()
;