import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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
    private router: Router,
    private fb : FormBuilder
  ) {};

  id: string = "";
  coffee: Coffee | null = null;
  shops: Shop[] = [];
  update_form!: FormGroup;

  ngOnInit() {
    this.update_form = this.fb.group({
      name: [''],
      description: [''],
      price: [null],
      shops_id: this.fb.array([]),
      ingredients: this.fb.array([]),
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
        this.setIngredients(this.coffee.ingredients);
      },
      error: (error) => {
        console.log(error);
      },
    });    
  }

  get ingredients(): FormArray {
    console.log(this.update_form.get('ingredients'));
    return this.update_form.get('ingredients') as FormArray;
  }

  setSelectedShops(shopIds: string[]) {
    const shops_id: FormArray = this.update_form.get('shops_id') as FormArray;
    shopIds.forEach(id => {
      shops_id.push(new FormControl(id));
    });
  }

  createIngredient(name = '', allergen = false): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      allergen: [allergen, Validators.required],
    });
  }
  
  setIngredients(ingredients: { name: string; allergen: boolean }[]) {
    const ingredientsArray: FormArray = this.update_form.get('ingredients') as FormArray;
    
    // Réinitialiser le FormArray
    ingredientsArray.clear();
  
    // Ajouter les nouveaux ingrédients
    ingredients.forEach(ingredient => {
      ingredientsArray.push(this.createIngredient(ingredient.name, ingredient.allergen));
    });
    console.log(ingredients);
    console.log(ingredientsArray);
  }
  
  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }
  
  // Supprimer un ingrédient
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
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
    console.log(formData);
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
