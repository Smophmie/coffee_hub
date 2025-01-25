import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop/shop.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addshopform',
  imports: [ReactiveFormsModule],
  templateUrl: './addshopform.component.html',
  styleUrl: './addshopform.component.css'
})
export class AddshopformComponent {

  constructor(
    private shopService: ShopService,
    private router: Router,
  ){};

  creation_form: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    slogan: new FormControl<string>(''),
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
        this.router.navigate(['/shoplist']);
      },
      error: (error) => {
        console.error('Error creating shop:', error);
      }
    });;
  }

  private transformFormValues(formData: any): any {
    return {
      name: formData.name,
      slogan: formData.slogan,
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
