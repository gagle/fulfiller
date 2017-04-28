# fulfiller

[![Build Status](https://travis-ci.org/gagle/fulfiller.svg?branch=master)](https://travis-ci.org/gagle/fulfiller)
[![David](https://img.shields.io/david/gagle/fulfiller.svg)](https://david-dm.org/gagle/fulfiller)
[![npm](https://img.shields.io/npm/dm/fulfiller.svg)](https://www.npmjs.com/package/fulfiller)

```bash
$ npm install fulfiller
```

```typescript
import fulfiller from 'fulfiller';

(async () => {
  const fn = (msg: string) => msg;
  const fnPromised = fulfiller(fn);
  const result = await fnPromised('hello');
  console.log(result); // 'hello'
})();
```
