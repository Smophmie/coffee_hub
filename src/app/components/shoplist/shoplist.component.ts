import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ShopService } from '../../services/shop/shop.service';
import { NgForOf, NgIf } from '@angular/common';
import { Shop } from '../../models/shop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shoplist',
  imports: [NgForOf, NgIf, RouterLink],
  templateUrl: './shoplist.component.html',
  styleUrl: './shoplist.component.css'
})
export class ShoplistComponent implements OnInit {

  constructor(
    private shopService: ShopService,
  ){};

  shops?: Shop[];

  ngOnInit(){
    this.loadShops();
  }

  loadShops(){
    this.shopService.getShops()
    .subscribe((res:any)=>{
        this.shops = res;
        console.log(this.shops);
    });
  }

  onDelete(id:string){
    this.shopService.deleteShop(id).subscribe({
      next: (response) => {
        console.log('Shop deleted successfully:', response);
        this.loadShops();
      },
      error: (error) => {
        console.error('Error updating shop:', error);
      }
    });
  }
}
