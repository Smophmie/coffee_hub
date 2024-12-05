import { IAddress } from "../interfaces/address";


export class Shop {
    // id: string;
    name: string;
    location: {address : IAddress}
    
    constructor(name: string, location: {address : IAddress}) {
      // this.id = id;
      this.name = name;
      this.location = location;
    }
}