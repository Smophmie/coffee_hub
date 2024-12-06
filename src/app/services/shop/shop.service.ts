import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Shop } from '../../models/shop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient:HttpClient) {

   }

  apiUrl: string = environment.apiUrl+"shops";
  filteredShops = [];

  getShops(): Observable<Shop[]>{
    return this.httpClient.get<Shop[]>(this.apiUrl);
  }

  getShop(id : string){
      return this.httpClient.get(this.apiUrl+"/"+id);
  }

  createShop(shop: Shop){
    return this.httpClient.post(this.apiUrl, shop);
  }

  updateShop(shop: Shop, id : string){
    return this.httpClient.put(this.apiUrl+"/"+id, shop);
  }

  deleteShop(id : string){
    return this.httpClient.delete(this.apiUrl+"/"+id);
  }

  getShopsByCity(city: string): Observable<Shop[]> {
    return this.getShops().pipe(
      map(shops => shops.filter(shop => shop.location.address.city.toLowerCase() === city.toLowerCase()))
    );
  }
}
