import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { Coffee } from '../../models/coffee';
import { Shop } from '../../models/shop';
import { CoffeeService } from '../../services/coffee/coffee.service';
import { ShopService } from '../../services/shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-updatecoffeeform',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './updatecoffeeform.component.html',
  styleUrls: ['./updatecoffeeform.component.css']
})
export class UpdatecoffeeformComponent implements OnInit {
  constructor(
    private coffeeService: CoffeeService,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {};

  id: string = "";
  coffee: Coffee | null = null;
  shops: Shop[] = [];

  update_form: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    price: new FormControl<number|null>(null),
    shops_id: new FormArray([])
  });

  ngOnInit() {
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

    // Charger le café sur lequel on veut appliquer une modification
    this.route.paramMap.pipe(
      switchMap((params) => {
        this.id = <string>params.get('id');
        return this.coffeeService.getCoffee(this.id);
      })
    ).subscribe({
      next: (data: Coffee) => {
        this.coffee = data;
        this.update_form.patchValue({
          name: this.coffee?.name,
          description: this.coffee?.description,
          price: this.coffee?.price,
        });
        this.setSelectedShops(this.coffee.shops_id);
      },
      error: (error) => {
        console.log(error);
      },
    });    
  }

  setSelectedShops(shopIds: string[]) {
    const shops_id: FormArray = this.update_form.get('shops_id') as FormArray;
    shopIds.forEach(id => {
      shops_id.push(new FormControl(id));
    });
  }

  onShopChange(event: any) {
    const shops_id: FormArray = this.update_form.get('shops_id') as FormArray;

    if (event.target.checked) {
      shops_id.push(new FormControl(event.target.value));
    } else {
      const index = shops_id.controls.findIndex(x => x.value === event.target.value);
      shops_id.removeAt(index);
    }
  }

  onSubmit() {
    const formData = this.update_form.value;
    this.coffeeService.updateCoffee(formData, this.id).subscribe({
      next: (response) => {
        console.log('Coffee updated successfully:', response);
        this.router.navigate(['/coffeelist']);
      },
      error: (error) => {
        console.error('Error updating coffee:', error);
      }
    });
  }
}
