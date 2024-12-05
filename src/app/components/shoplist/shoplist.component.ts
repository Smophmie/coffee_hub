import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ShopService } from '../../services/shop/shop.service';
import { NgForOf, NgIf } from '@angular/common';
import { Shop } from '../../models/shop';

@Component({
  selector: 'app-shoplist',
  imports: [NgForOf, NgIf],
  templateUrl: './shoplist.component.html',
  styleUrl: './shoplist.component.css'
})
export class ShoplistComponent implements OnInit {

  constructor(
    private shopService: ShopService,
  ){};

  shops?: Shop[];

  ngOnInit(){
    this.shopService.getShops()
    .subscribe((res:any)=>{
        this.shops = res;
        console.log(this.shops);
    });
  }
}
