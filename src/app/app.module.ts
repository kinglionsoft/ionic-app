import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { CoreModule } from '@core';

import { StartupApp } from './app.component';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

// region 注册语言环境
registerLocaleData(localeZhHans);
// endregion

@NgModule({
  declarations: [
    StartupApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(StartupApp, {
      backButtonText: '',
      tabsHideOnSubPages: true,
      model: 'ios'
    }),
    IonicStorageModule.forRoot(),
    CoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    StartupApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: 'zh-Hans' },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
