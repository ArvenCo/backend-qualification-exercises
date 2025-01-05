export class ExecutionCache<TInputs extends Array<unknown>, TOutput> {
  private readonly cache = new Map<string, Promise<TOutput>>();
  private readonly ongoing = new Map<string, Promise<TOutput>>();

  constructor(private readonly handler: (...args: TInputs) => Promise<TOutput>  ) {}
  
  async fire(key: string, ...args: TInputs): Promise<TOutput> {
    /**
     * insert your code here
     */

    if (this.cache.has(key)) {
      return await this.handler(...args);
    }

    if (this.ongoing.has(key)) {
      return await this.ongoing.get(key);
    }

    const execution = this.handler(...args).then((result) => {
      this.cache.set(key, Promise.resolve(result));
      this.ongoing.delete(key);

      return result;
    });

    this.ongoing.set(key, execution);

    return await execution;
  }
}
