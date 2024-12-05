import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop/shop.service';


@Component({
  selector: 'app-addshopform',
  imports: [ReactiveFormsModule],
  templateUrl: './addshopform.component.html',
  styleUrl: './addshopform.component.css'
})
export class AddshopformComponent {

  constructor(
    private shopService: ShopService,
  ){};

  creation_form: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    city: new FormControl<string>(''),
    zipcode: new FormControl<string>(''),
    street: new FormControl<string>(''),
    street_number: new FormControl<number | null>(null),
  });

  onSubmit() {
    const formData = this.transformFormValues(this.creation_form.value);
    this.shopService.createShop(formData).subscribe({
      next: (response) => {
        console.log('Shop created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating shop:', error);
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
