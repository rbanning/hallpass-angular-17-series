import { Routes } from '@angular/router';
import { BrandsPageComponent, EmployeesPageComponent, TrackByPageComponent } from '@app/pages';

export const routes: Routes = [
  { path: 'brands', component: BrandsPageComponent },
  { path: 'employees', component: EmployeesPageComponent },
  { path: 'track-by', component: TrackByPageComponent },
];
