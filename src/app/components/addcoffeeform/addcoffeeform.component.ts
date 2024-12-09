import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CoffeeService } from '../../services/coffee/coffee.service';
import { Router } from '@angular/router';
import { Shop } from '../../models/shop';
import { ShopService } from '../../services/shop/shop.service';
import { NgIf, NgForOf } from '@angular/common';


@Component({
  selector: 'app-addcoffeeform',
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './addcoffeeform.component.html',
  styleUrl: './addcoffeeform.component.css'
})

export class AddcoffeeformComponent implements OnInit {

  constructor(
    private coffeeService: CoffeeService,
    private shopService: ShopService,
    private router: Router,
  ){};

  shops: Shop[] = [];

  creation_form: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    price: new FormControl<number|null>(null),
    shops_id: new FormControl([])
  });

  ngOnInit(){
    // Charger toutes les boutiques pour créer les checkboxes
    this.shopService.getShops().subscribe({
      next: (data: Shop[]) => {
        this.shops = data;
        console.log(this.shops);        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit() {
    const formData = this.creation_form.value;
    console.log(formData);
    this.coffeeService.createCoffee(formData).subscribe({
      next: (response) => {
        console.log('Coffee created successfully:', response);
        this.router.navigate(['/coffeelist']);
      },
      error: (error) => {
        console.error('Error creating coffee:', error);
      }
    });
  }
}
