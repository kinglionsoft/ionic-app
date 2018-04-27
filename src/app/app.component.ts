import { Component, ViewChild, Injector } from '@angular/core';

import { MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { AppBaseComponent } from './app.base.component';

export interface PageInterface {
  title: string;
  name?: string;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class StartupApp extends AppBaseComponent {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: '工作', index: 0, icon: 'calendar' },
    { title: '考试', index: 1, icon: 'contacts' },
    { title: '学习', index: 2, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: '个人信息', name: 'user-center', index: 3, icon: 'person' },
    { title: '支持', name: 'support', icon: 'help' },
    { title: '注销', name: 'logout', icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: '登录', name: 'login', icon: 'log-in' },
    { title: '支持', name: 'support', icon: 'help' },
    { title: '注册', name: 'signup', icon: 'person-add' }
  ];
  rootPage: any;

  constructor(
    public inject: Injector,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public splashScreen: SplashScreen
  ) {

    super(inject);
    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = 'tabs';
        } else {
          this.rootPage = 'tutorial';
        }
        this.platformReady()
      });

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      // this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.setRoot('tutorial');
  }

  listenToLoginEvents() {
    this.userLogin.subscribe(() => {
      this.enableMenu(true);
    });

    this.userLogout.subscribe(() => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().index === page.index) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().id === page.name) {
      return 'primary';
    }
    return;
  }
}
