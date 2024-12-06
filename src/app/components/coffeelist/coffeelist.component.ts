import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CoffeeService } from '../../services/coffee/coffee.service';
import { NgForOf, NgIf } from '@angular/common';
import { Coffee } from '../../models/coffee';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coffeelist',
  imports: [NgIf, NgForOf, RouterLink],
  templateUrl: './coffeelist.component.html',
  styleUrl: './coffeelist.component.css'
})
export class CoffeelistComponent implements OnInit {
  constructor(
    private coffeeService: CoffeeService,
  ){};

  ngOnInit(){
    this.loadCoffees();
  }

  coffees?: Coffee[];


  loadCoffees(){
      this.coffeeService.getCoffees()
        .subscribe((res: any) => {
          this.coffees = res;
          console.log(this.coffees);
        });
  }

  onDelete(id:string){
    this.coffeeService.deleteCoffee(id).subscribe({
      next: (response) => {
        console.log('Coffee deleted successfully:', response);
        this.loadCoffees();
      },
      error: (error) => {
        console.error('Error updating coffee:', error);
      }
    });
  }
}
