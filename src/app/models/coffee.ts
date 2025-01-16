export class Coffee {
    id: string;
    name: string;
    description: string;
    ingredients: [{
        name: string,
        allergen : boolean
    }];
    price: number;
    shops_id: string [];
    
    constructor(
      id: string, 
      name: string, 
      description:string, 
      ingredients:[{
        name: string,
        allergen : boolean
      }], 
      price: number, 
      shops_id: string []
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.ingredients = ingredients;
      this.price = price;
      this.shops_id = shops_id
    }
  }