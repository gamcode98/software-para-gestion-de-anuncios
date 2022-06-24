import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FormPersonComponent } from './components/form-person/form-person.component';
import { FormAdComponent } from './components/form-ad/form-ad.component';

const routes: Routes = [
  { path: 'form-ad', component: FormAdComponent },
  { path: 'form-person', component: FormPersonComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'form-person' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
