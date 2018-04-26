import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { CoreModule } from '@core';
import { PageModule } from '@pages/page.module';

import { StartupApp } from './app.component';

// region 注册语言环境
registerLocaleData(localeZhHans);
// endregion

@NgModule({
  declarations: [
    StartupApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(StartupApp, {
      backButtonText: '',
      tabsHideOnSubPages: true,
      model: 'ios'
    }),
    IonicStorageModule.forRoot(),
    CoreModule,
    PageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    StartupApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    InAppBrowser,
    SplashScreen,
  ]
})
export class AppModule { }
