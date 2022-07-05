import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { FacebookModule } from 'ngx-facebook';

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
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AdDetailsComponent } from './components/ad-details/ad-details.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { FooterComponent } from './components/layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

//Angular Material

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
    AdDetailsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    QRCodeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FacebookModule.forRoot(),
    BrowserAnimationsModule,
    AlifeFileToBase64Module,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
