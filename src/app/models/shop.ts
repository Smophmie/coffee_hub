import { IAddress } from "../interfaces/address";


export class Shop {
    id: string;
    name: string;
    slogan: string;
    location: {address : IAddress}
    
    constructor(id: string, name: string, slogan:string, location: {address : IAddress}) {
      this.id = id;
      this.name = name;
      this.slogan = slogan;
      this.location = location;
    }
  }