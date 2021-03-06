import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {HeroPage} from '../pages/hero/hero';


import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppService} from '../services/AppService';
import {OverviewTab} from '../pages/stat/tabs/overview-tab/overview';
import {TabsPage} from '../pages/stat/tabs/tabs'

import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    HeroPage,
    OverviewTab,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    ChartsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    HeroPage,
    OverviewTab,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppService,
  ]
})
export class AppModule {
}
