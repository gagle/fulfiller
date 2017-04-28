export default function(fn: (...args: any[]) => any): (...args: any[]) => any {
  // tslint:disable-next-line:only-arrow-functions
  const pfn = async function(this: any, ...args: any[]): Promise<any> {
    return fn.apply(this, args);
  };
  return Object.defineProperty(pfn, 'name', { value: fn.name });
}
