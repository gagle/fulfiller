import fulfiller from '../src';
import { expect } from 'chai';

describe('fulfiller()', () => {
  it('makes a sync function return a promise', async () => {
    const fn = (p: string): string => p;
    const pfn = fulfiller(fn);
    const p = pfn('foo');

    expect(pfn).to.be.a('function');
    expect(p).to.be.a('promise');

    const result = await p;
    expect(result).to.equal('foo');
  });

  it('async functions also return a (wrapped) promise',
    async () => {
    const pfn = async (p: string): Promise<string> => p;
    const wpfn = fulfiller(pfn);
    const p = wpfn('foo');

    expect(pfn).to.be.a('function');
    expect(p).to.be.a('promise');

    const result = await p;
    expect(result).to.equal('foo');
  });

  it('forwards errors both in sync and async functions', async () => {
    const fnErr = new Error();
    const fnSync = () => { throw fnErr; };

    try {
      await fulfiller(fnSync)();
      throw new Error('should throw an error');
    } catch (err) {
      expect(err).to.equal(fnErr);
    }

    const fnAsync = async () => { throw fnErr; };

    try {
      await fulfiller(fnAsync)();
      throw new Error('should throw an error');
    } catch (err) {
      expect(err).to.equal(fnErr);
    }
  });

  it('allows binding the \'this\' keyword', async () => {
    let fn = function(this: any) { return this.p; };
    fn = fn.bind({ p: 'foo' });
    let result = await fulfiller(fn)();
    expect(result).to.equal('foo');

    let pfn = fulfiller(function(this: any) { return this.p; });
    pfn = pfn.bind({ p: 'foo' });
    result = await pfn();
    expect(result).to.equal('foo');
  });

  it('copies the original function name', async () => {
    function fn(p: string): string {
      return p;
    }
    const pfn = fulfiller(fn);

    expect(pfn.name).to.equal('fn');
  });
});
