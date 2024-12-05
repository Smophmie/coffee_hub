import { Routes } from '@angular/router';
import { ShoplistComponent } from './components/shoplist/shoplist.component';
import { AddshopformComponent } from './components/addshopform/addshopform.component';
import { UpdateshopformComponent } from './components/updateshopform/updateshopform.component';

export const routes: Routes = [
    {path: 'shoplist', component: ShoplistComponent},
    {path: 'addshop', component: AddshopformComponent},
    {path: 'shop/:id', component: UpdateshopformComponent}
];
