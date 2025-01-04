export class ObjectId {
  private data: Buffer;

  constructor(type: number, timestamp: number) {
    /**
     * insert your code here
     */

    
    if (type < 0 || type > 255) {
      throw new Error('Invalid type');
    }


    this.data = Buffer.alloc(14);


    this.data.writeIntLE(type, 1,1); // type 
    this.data.writeIntLE(timestamp, 0, 6); // timestamp

    const random = Math.floor(Math.random() * 2147483647);
    this.data.writeIntLE(random, 2, 4); //random number 

    const counter = (Math.floor(Math.random() * 8388607)+1);
    this.data.writeIntLE(counter , 3, 3);
  }

  static generate(type?: number): ObjectId {
    return new ObjectId(type ?? 0, Date.now());
  }
  
  toString(encoding?: 'hex' | 'base64'): string {
    return this.data.toString(encoding ?? 'hex');
  }
}