import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import {VehicleListComponent} from './vehicle-list/vehicle-list.component';


const routes: Routes = [
  {path: 'vehicles/new', component: VehicleFormComponent},
  {path: 'vehicles/:id', component: VehicleFormComponent},
  {path: '', component: VehicleListComponent},
  {path: 'vehicles', component: VehicleListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
