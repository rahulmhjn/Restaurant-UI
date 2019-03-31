import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'aboutus', component:AboutComponent},
  {path:'menu',component:MenuComponent},
  {path:'dishdetail/:id',component:DishdetailComponent},
  {path:'contactus',component:ContactComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
