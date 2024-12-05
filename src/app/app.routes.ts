import { Routes } from '@angular/router';
import { ShoplistComponent } from './components/shoplist/shoplist.component';
import { AddshopformComponent } from './components/addshopform/addshopform.component';

export const routes: Routes = [
    {path: 'shoplist', component: ShoplistComponent},
    {path: 'addshop', component: AddshopformComponent}
];
