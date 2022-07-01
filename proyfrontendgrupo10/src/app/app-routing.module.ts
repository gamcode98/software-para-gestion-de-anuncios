import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FormPersonComponent } from './components/form-person/form-person.component';
import { FormAdComponent } from './components/form-ad/form-ad.component';
import { AdViewComponent } from './components/ad-view/ad-view.component';
import { FormsModule } from '@angular/forms';
import { RequestAdViewComponent } from './components/request-ad-view/request-ad-view.component';
import { AllAdsViewComponent } from './components/all-ads-view/all-ads-view.component';
import { LoginComponent } from './components/login/login.component';
import { RequestPersonViewComponent } from './components/request-person-view/request-person-view.component';

const routes: Routes = [
  { path: 'form-ad', component: FormAdComponent },
  { path: 'form-person', component: FormPersonComponent },
  { path: 'ad-view', component: AdViewComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'form-person' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
