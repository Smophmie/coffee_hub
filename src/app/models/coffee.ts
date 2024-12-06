export class Coffee {
    id: string;
    name: string;
    description: string;
    ingredients: [{
        name: string,
        allergen : boolean
    }];
    price: number;
    
    constructor(id: string, name: string, description:string, ingredients:[{
        name: string,
        allergen : boolean
    }], price: number) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.ingredients = ingredients;
      this.price = price;
    }
  }