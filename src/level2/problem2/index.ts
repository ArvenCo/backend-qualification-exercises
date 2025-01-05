export type DowntimeLogs = [Date, Date][];

export function merge(...args: DowntimeLogs[]): DowntimeLogs {
  /**
   * insert your code here
   */
  let logs : DowntimeLogs = args.flat(1);
  let set  = new Set();

  logs.sort((a, b) => a[0].getTime() - b[0].getTime());
 
  logs.forEach((log, index) => {
    if  (index === logs.length - 1) {
      return;
    }
    const overlaped = log[1].getTime() > logs[index+1][0].getTime();

    if (overlaped) {
      logs[index][0] = log[0];
      logs[index][1] = logs[index+1][1];
      logs.splice(index+1, 1);
    }
  });

  logs.filter((dates) => {
    if(set.has(dates)) {
      return false;
    }
    set.add(dates);
    return true;
  });
  return logs;
}