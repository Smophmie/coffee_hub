import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coffee } from '../../models/coffee';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(private httpClient:HttpClient) { }

  apiUrl: string = environment.apiUrl+"coffees";

  getCoffees(): Observable<Coffee[]>{
    return this.httpClient.get<Coffee[]>(this.apiUrl);
  }

  getCoffee(id : string): Observable<Coffee> {
    return this.httpClient.get<Coffee>(this.apiUrl+"/"+id);
  }

  createCoffee(coffee: Coffee){
    return this.httpClient.post(this.apiUrl, coffee);
  }

  updateCoffee(coffee: Coffee, id : string){
    return this.httpClient.put(this.apiUrl+"/"+id, coffee);
  }

  deleteCoffee(id : string){
    return this.httpClient.delete(this.apiUrl+"/"+id);
  }
}
