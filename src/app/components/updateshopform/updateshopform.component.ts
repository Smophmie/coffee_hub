import { Component, OnInit, Pipe } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop/shop.service';
import { Shop } from '../../models/shop';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-updateshopform',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './updateshopform.component.html',
  styleUrl: './updateshopform.component.css'
})
export class UpdateshopformComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ){};

  id: string = "";
  shop: Shop | null = null;

  ngOnInit(){
    this.route.paramMap.pipe(
      switchMap((params) => {
        this.id = <string>params.get('id');
        return this.shopService.getShop(this.id);
      })
    ).subscribe({
      next: (data: any) => {
        this.shop = data;
        this.update_form.patchValue({
          name: this.shop?.name,
          city: this.shop?.location.address.city,
          zipcode: this.shop?.location.address.zipcode,
          street: this.shop?.location.address.street,
          street_number: this.shop?.location.address.street_number,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });    
  }

  update_form: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    city: new FormControl<string>(''),
    zipcode: new FormControl<string>(''),
    street: new FormControl<string>(''),
    street_number: new FormControl<number | null>(null),
  });

  onSubmit() {
    const formData = this.transformFormValues(this.update_form.value);    
    this.shopService.updateShop(formData, this.id).subscribe({
      next: (response) => {
        console.log('Shop updated successfully:', response);
        this.router.navigate(['/shoplist']);
      },
      error: (error) => {
        console.error('Error updating shop:', error);
      }
    });;
  }

  private transformFormValues(formData: any): any {
    return {
      name: formData.name,
      location: {
        address: {
          street_number: formData.street_number ? formData.street_number : null,
          street: formData.street,
          city: formData.city,
          zipcode: formData.zipcode
        }
      }
    };
  }
}
