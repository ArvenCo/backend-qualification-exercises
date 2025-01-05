export type DowntimeLogs = [Date, Date][];

export function merge(...args: DowntimeLogs[]): DowntimeLogs {
  /**
   * insert your code here
   */
  let logs : DowntimeLogs = args.flat(1);
  let set  = new Set();

  logs.sort((a, b) => a[0].getTime() - b[0].getTime());

  logs.filter((dates) => {
    if(set.has(dates)) {
      return false;
    }
    set.add(dates);
    return true;
  });
  return logs;
}