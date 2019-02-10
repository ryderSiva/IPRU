import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CalculatorPage } from '../pages/calculator/calculator';

import { LifeTimeClassicPage } from '../pages/life_time_classic/life_time_classic';
import { EliteLifeSuperPage } from '../pages/elite_life_super/elite_life_super';
import { EliteWealthSuperPage } from '../pages/elite_wealth_super/elite_wealth_super';
import { IRRCalculatePage } from '../pages/irr-calculate/irr-calculate';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  activatePage:any;
  pages: Array<{title: string, component: any}>;
  shownGroup = null;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Life Time Classic', component: LifeTimeClassicPage },
      { title: 'Elite Life Super', component: EliteLifeSuperPage },
      { title: 'Elite Wealth Super', component: EliteWealthSuperPage }
    ];

    this.activatePage=this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activatePage=page;
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  }
  isGroupShown(group) {
      return this.shownGroup === group;
  }

  checkActivate(page){
     return page=this.activatePage;
  }

  homeClick(){
    this.nav.setRoot(HomePage);
  }

  calculateClick(){
    this.nav.setRoot(CalculatorPage);

  }

  irrCalculateClick(){
    this.nav.setRoot(IRRCalculatePage);
  }
}
