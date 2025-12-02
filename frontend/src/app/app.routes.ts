import { Routes } from '@angular/router';
import { ListConfigsComponent } from './components/list-configs/list-configs';
import { AddConfig } from './components/add-config/add-config';
import { DetailConfig } from './components/detail-config/detail-config';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListConfigsComponent },
  { path: 'add', component: AddConfig },
  { path: 'detail/:id', component: DetailConfig }

];
