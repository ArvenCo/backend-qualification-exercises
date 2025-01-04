export class ObjectId {
  private data: Buffer;
  private static random = Math.floor(Math.random() * 0x7fffffff); // 4 bytes
  private static counter = Math.floor(Math.random() * 0xffffff); // 3 bytes

  constructor(type: number, timestamp: number) {
    /**
     * insert your code here
     */


    this.data = Buffer.allocUnsafe(14);


    this.data.writeUIntBE(timestamp, 0, 6); // timestamp

    
    
    this.data.writeUIntBE(ObjectId.random, 6, 4); //random number 

    this.data.writeUIntBE(ObjectId.counter , 10, 3);

    ObjectId.counter++ % 0xffffff;

    this.data.writeUInt8(type, 13); // type 

  }

  static generate(type?: number): ObjectId {
    return new ObjectId(type ?? 0, Date.now());
  }
  
  toString(encoding?: 'hex' | 'base64'): string {
    return this.data.toString(encoding ?? 'hex');
  }
}