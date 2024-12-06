import { Routes } from '@angular/router';
import { ShoplistComponent } from './components/shoplist/shoplist.component';
import { AddshopformComponent } from './components/addshopform/addshopform.component';
import { UpdateshopformComponent } from './components/updateshopform/updateshopform.component';
import { CoffeelistComponent } from './components/coffeelist/coffeelist.component';
import { UpdatecoffeeformComponent } from './components/updatecoffeeform/updatecoffeeform.component';
import { AddcoffeeformComponent } from './components/addcoffeeform/addcoffeeform.component';

export const routes: Routes = [
    {path: 'shoplist', component: ShoplistComponent},
    {path: 'addshop', component: AddshopformComponent},
    {path: 'shop/:id', component: UpdateshopformComponent},
    {path: 'coffeelist', component: CoffeelistComponent},
    {path: 'coffee/:id', component: UpdatecoffeeformComponent},
    {path: 'addcoffee', component: AddcoffeeformComponent}

];
