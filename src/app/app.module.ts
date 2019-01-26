import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EliteLifeSuperPage } from '../pages/elite_life_super/elite_life_super';
import { LifeTimeClassicPage } from '../pages/life_time_classic/life_time_classic';
import { EliteWealthSuperPage } from '../pages/elite_wealth_super/elite_wealth_super';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LifeTimeClassicPage,
    EliteLifeSuperPage,
    EliteWealthSuperPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LifeTimeClassicPage,
    EliteLifeSuperPage,
    EliteWealthSuperPage,
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
