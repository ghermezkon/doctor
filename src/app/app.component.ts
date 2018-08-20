import { Component } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ViewChild } from '@angular/core';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  menu: any[] = [];
  @ViewChild(Nav) nav: Nav;
  //---------------------------------------------------------------------------------
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.menu = [
      { page: 'OstanPage', icon: 'fal fa-map-marker-alt fa-2x', title: 'تعریف استان ' },
      { page: 'CityPage', icon: 'fal fa-code-branch fa-2x', title: 'تعریف شهر ' },
      { page: 'TypeDoctorPage', icon: 'fal fa-briefcase fa-2x', title: 'تعریف انواع پزشک ' },
      { page: 'TypeWorkPage', icon: 'fal fa-folder fa-2x', title: 'تعریف انواع ویزیت ' },
      { page: 'CaptionDoctorPage', icon: 'fal fa-id-card fa-2x', title: 'تعریف انواع تخصص ' },
      { page: 'DoctorPage', icon: 'fal fa-user-md fa-2x', title: 'تعریف پزشک ' },
      { page: 'MatabPage', icon: 'fal fa-procedures fa-2x', title: 'تعاریف اولیه مطب' },
      { page: 'MatabMorePage', icon: 'fal fa-bed fa-2x', title: 'تعاریف تکمیلی مطب' },
    ]
  }
  //---------------------------------------------------------------------------------
  goToPage(value) {
    this.nav.push(value);
  }
}
