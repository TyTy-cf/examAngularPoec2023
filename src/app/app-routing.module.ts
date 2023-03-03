import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegionComponent} from "./region/region.component";
import {DepartmentComponent} from "./department/department.component";
import {CitiesComponent} from "./cities/cities.component";

const routes: Routes = [
  { path: '', component: RegionComponent },
  { path: 'regions/:codeRegion/departments', component: DepartmentComponent },
  { path: 'departments', component: DepartmentComponent },
  { path: 'regions/:codeRegion/departments/:codeDpt/cities', component: CitiesComponent },
  { path: '**', component: RegionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
