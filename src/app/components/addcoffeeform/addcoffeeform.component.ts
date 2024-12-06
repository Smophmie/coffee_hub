import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CoffeeService } from '../../services/coffee/coffee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addcoffeeform',
  imports: [ReactiveFormsModule],
  templateUrl: './addcoffeeform.component.html',
  styleUrl: './addcoffeeform.component.css'
})

export class AddcoffeeformComponent {

  constructor(
    private coffeeService: CoffeeService,
    private router: Router,
  ){};

  creation_form: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    price: new FormControl<number|null>(null)
  });

  onSubmit() {
    const formData = this.creation_form.value;
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
