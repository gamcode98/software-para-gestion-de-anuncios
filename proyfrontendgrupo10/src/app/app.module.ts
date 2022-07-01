import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FormPersonComponent } from './components/form-person/form-person.component';
import { FormAdComponent } from './components/form-ad/form-ad.component';
import { FormsModule } from '@angular/forms';
import { AdViewComponent } from './components/ad-view/ad-view.component';
import { RequestAdViewComponent } from './components/request-ad-view/request-ad-view.component';
import { AllAdsViewComponent } from './components/all-ads-view/all-ads-view.component';
import { LoginComponent } from './components/login/login.component';
import { RequestPersonViewComponent } from './components/request-person-view/request-person-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormPersonComponent,
    FormAdComponent,
    AdViewComponent,
    RequestAdViewComponent,
    AllAdsViewComponent,
    LoginComponent,
    RequestPersonViewComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
