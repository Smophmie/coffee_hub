import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray, FormBuilder } from '@angular/forms';
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
    private fb : FormBuilder
  ){};

  shops: Shop[] = [];
  creation_form!: FormGroup;

  ngOnInit(){

    this.creation_form = this.fb.group({
      name: [''],
      description: [''],
      price: [null],
      shops_id: this.fb.array([]),
      ingredients: this.fb.array([this.createIngredient()]),
    });
    
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

  get ingredients(): FormArray {
    return this.creation_form.get('ingredients') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      allergen: [false, Validators.required],
    });
  }
  
  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onCheckboxChange(event: any) {
    const shops_id: FormArray = this.creation_form.get('shops_id') as FormArray;

    if (event.target.checked) {
      shops_id.push(new FormControl(event.target.value));
    } else {
      const index = shops_id.controls.findIndex(x => x.value === event.target.value);
      shops_id.removeAt(index);
    }
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
