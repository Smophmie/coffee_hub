import { Component, OnInit, Pipe } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Coffee } from '../../models/coffee';
import { Shop } from '../../models/shop';
import { CoffeeService } from '../../services/coffee/coffee.service';
import { ShopService } from '../../services/shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-updatecoffeeform',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './updatecoffeeform.component.html',
  styleUrl: './updatecoffeeform.component.css'
})
export class UpdatecoffeeformComponent implements OnInit{
  constructor(
    private coffeeService: CoffeeService,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ){};

  id: string = "";
  coffee: Coffee | null = null;
  // shops: Shop[] = [];
  // selectedShops: string[] = [];

  ngOnInit(){
    // Charger toutes les boutiques pour créer les checkboxes
    // this.shopService.getShops().subscribe({
    //   next: (data: Shop[]) => {
    //     this.shops = data;
    //     console.log(this.shops);        
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });

    // Charger le café sur lequel on veut appliquer une modification
    this.route.paramMap.pipe(
      switchMap((params) => {
        this.id = <string>params.get('id');
        return this.coffeeService.getCoffee(this.id);
      })
    ).subscribe({
      next: (data: any) => {
        this.coffee = data;
        // if (this.coffee != null) {
        //   this.selectedShops = this.coffee.shops_id;
        //   console.log(this.selectedShops);
        // }
        this.update_form.patchValue({
          name: this.coffee?.name,
          description: this.coffee?.description,
          price: this.coffee?.price,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });    
  }

  update_form: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    price: new FormControl<number|null>(null)
  });

  // onShopChange(event: Event) {
  //   const checkbox = event.target as HTMLInputElement;
  //   const shopId = checkbox.value;
  //   if (checkbox.checked) {
  //     this.selectedShops.push(shopId);
  //   } else {
  //     this.selectedShops = this.selectedShops.filter(id => id !== shopId);
  //   }
  // }

  onSubmit() {
    const formData = this.transformFormValues(this.update_form.value); 
    // formData.shops_id = this.selectedShops;   
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

  private transformFormValues(formData: any): any {
    return {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      // shops_id: formData.shops_id
    };
  }
}
