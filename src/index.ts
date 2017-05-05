export default function<T = any>(
  fn?: (...args: any[]) => T
): (...args: any[]) => Promise<T> {
  if (!fn) return () => Promise.resolve() as Promise<T>;
  // tslint:disable-next-line:only-arrow-functions
  const pfn = async function(this: any, ...args: any[]): Promise<T> {
    return fn.apply(this, args);
  };
  return Object.defineProperty(pfn, 'name', { value: fn.name });
}
