import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

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

  getShop(id : number){
      return this.httpClient.get(this.apiUrl+"/"+id);
  }
}
