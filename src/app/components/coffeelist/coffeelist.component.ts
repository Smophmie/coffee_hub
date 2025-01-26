import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CoffeeService } from '../../services/coffee/coffee.service';
import { ShopService } from "../../services/shop/shop.service";
import { NgForOf, NgIf } from '@angular/common';
import { Coffee } from '../../models/coffee';
import { Shop } from '../../models/shop'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coffeelist',
  imports: [NgIf, NgForOf, RouterLink],
  templateUrl: './coffeelist.component.html',
  styleUrl: './coffeelist.component.css'
})
export class CoffeelistComponent implements OnInit {
  constructor(
    private coffeeService: CoffeeService,
    private shopService: ShopService,

  ){};

  ngOnInit(){
    this.loadCoffeesAndShops();
  }

  coffees?: Coffee[];
  shops?: Shop[];

  loadCoffeesAndShops() {
    this.coffeeService.getCoffees().subscribe((coffees: Coffee[]) => {
      this.shopService.getShops().subscribe((shops: Shop[]) => {
        this.shops = shops;
        this.coffees = this.mapCoffeesWithShops(coffees, shops);
        console.log(this.coffees);
      });
    });
  }

  mapCoffeesWithShops(coffees: Coffee[], shops: Shop[]): Coffee[] {
    return coffees.map(coffee => {
      const shop_names = coffee.shops_id.map(shopId => {
        const shop = shops.find(s => s.id === shopId);
        return shop ? shop.name : 'Boutique inconnue';
      });
      return {
        ...coffee,
        shop_names
      };
    });
  }

  onDelete(id:string){
    this.coffeeService.deleteCoffee(id).subscribe({
      next: (response) => {
        console.log('Coffee deleted successfully:', response);
        this.loadCoffeesAndShops();
      },
      error: (error) => {
        console.error('Error updating coffee:', error);
      }
    });
  }
}