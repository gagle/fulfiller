# fulfiller

[![Build Status](https://travis-ci.org/gagle/fulfiller.svg?branch=master)](https://travis-ci.org/gagle/fulfiller)
[![David](https://img.shields.io/david/gagle/fulfiller.svg)](https://david-dm.org/gagle/fulfiller)
[![npm](https://img.shields.io/npm/dm/fulfiller.svg)](https://www.npmjs.com/package/fulfiller)

```bash
$ npm install fulfiller
```

Simple utility that makes a function return a Promise. If no function is provided it always returns a resolved Promise.

```typescript
import fulfiller from 'fulfiller';

(async () => {
  const fn = (msg: string) => msg;
  const fnPromised = fulfiller(fn);
  const result = await fnPromised('hello');
  console.log(result); // 'hello'
})();
```

It is very handy when you receive a function as an argument that can be synchronous or return a promise with the result, actually, when you don't care about the synchronicity and just want to execute the function and get the result.

```typescript
async function foo(fn: () => any | (() => Promise<any>)) {
  return await fulfiller(fn)();
}

console.log(await foo(() => 'sync foo')); // 'sync foo'
console.log(await foo(() => Promise.resolve('async foo'))); // 'async foo'
```
