import { Routes } from '@angular/router';
import { BrandsPageComponent, ColorsPageComponent, EmployeesPageComponent, TrackByPageComponent } from '@app/pages';

export const routes: Routes = [
  { path: 'brands', component: BrandsPageComponent },
  { path: 'employees', component: EmployeesPageComponent },
  { path: 'colors', component: ColorsPageComponent },
  { path: 'track-by', component: TrackByPageComponent },
];
