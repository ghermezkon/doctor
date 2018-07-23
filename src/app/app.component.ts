import { Component } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ViewChild } from '@angular/core';
import { CityPage } from '../pages/ostan/city/city';
import { OstanPage } from '../pages/ostan/ostan';
import { TypeDoctorPage } from '../pages/type.doctor/type.doctor';
import { TypeWorkPage } from '../pages/type.doctor/type.work/type.work';
import { CaptionDoctorPage } from '../pages/caption.doctor/caption.doctor';
import { DoctorPage } from '../pages/doctor/doctor';
import { MatabPage } from '../pages/matab/matab';
import { MatabMorePage } from '../pages/matab.more/matab.more';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MatabMorePage;
  @ViewChild(Nav) nav: Nav;
  //---------------------------------------------------------------------------------
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  //---------------------------------------------------------------------------------
  gotToOstan() {
    this.nav.push('OstanPage');
  }
  goToRule() {
    this.nav.push('RulePage');
  }
  goToContactUs() {
    this.nav.push('ContactUsPage');
  }
  goToAbout() {
    this.nav.push('AboutPage');
  }
  goToShekayat() {
    this.nav.push('ShekayatPage');
  }
  goToPaymentPage(){
    this.nav.push('UserPayPage');
  }
}
