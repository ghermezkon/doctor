import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../util/pipes.module';
import { CityPage } from '../pages/ostan/city/city';
import { OstanPage } from '../pages/ostan/ostan';
import { TypeDoctorPage } from '../pages/type.doctor/type.doctor';
import { TypeWorkPage } from '../pages/type.doctor/type.work/type.work';
import { CaptionDoctorPage } from '../pages/caption.doctor/caption.doctor';
import { DoctorPage } from '../pages/doctor/doctor';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,CityPage,OstanPage,TypeDoctorPage,TypeWorkPage,CaptionDoctorPage,DoctorPage,
    TabsPage
  ],
  imports: [
    PipesModule,
    BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(MyApp, {
      backButtonText: 'بازگشت',
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      animate: false,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,CityPage,OstanPage,TypeDoctorPage,TypeWorkPage,CaptionDoctorPage,DoctorPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
