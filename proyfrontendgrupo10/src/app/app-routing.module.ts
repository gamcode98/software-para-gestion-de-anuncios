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
import { AuthGuard } from './auth.guard';
import { AdDetailsComponent } from './components/ad-details/ad-details.component';
import { AdminActionsComponent } from './components/admin-actions/admin-actions.component';
import { AdminActionsToAreaComponent } from './components/admin-actions-to-area/admin-actions-to-area.component';
import { FormAreaComponent } from './components/form-area/form-area.component';

const routes: Routes = [
  { path: 'form-ad', component: FormAdComponent, canActivate: [AuthGuard] },
  { path: 'form-ad/edit/:id', component: FormAdComponent },
  { path: 'form-person', component: FormPersonComponent },
  { path: 'form-person/edit/:id', component: FormPersonComponent },
  { path: 'my-ads', component: AdViewComponent },
  { path: 'ads', component: AllAdsViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-reques-ad-v2', component: RequestAdViewComponent },
  { path: 'admin-reques-person-v2', component: RequestPersonViewComponent },
  { path: 'ad-details/:id', component: AdDetailsComponent },
  { path: 'users', component: AdminActionsComponent },
  { path: 'areas', component: AdminActionsToAreaComponent },
  { path: 'form-area', component: FormAreaComponent },
  { path: 'form-area/edit/:id', component: FormAreaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
