import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Shop } from '../../models/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient:HttpClient) {

   }

  apiUrl: string = environment.apiUrl+"shops";

  getShops(){
    return this.httpClient.get(this.apiUrl)
  }

  getShop(id : string){
      return this.httpClient.get(this.apiUrl+"/"+id);
  }

  createShop(shop: Shop){
    console.log("createshop lancée");
    console.log(shop);
    return this.httpClient.post(this.apiUrl, shop);
  }
}
