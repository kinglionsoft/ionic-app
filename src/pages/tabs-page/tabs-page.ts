import { Component } from '@angular/core';

import { NavParams, IonicPage } from 'ionic-angular';

// import { AboutPage } from '../about/about';
// import { SchedulePage } from '../schedule/schedule';
// import { SpeakerListPage } from '../speaker-list/speaker-list';

@IonicPage({
  name: 'tabs',
  segment: 'tabs'
})
@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = 'work-list';
  tab2Root: any = 'exam-list';
  tab3Root: any = 'learning-list';
  tab4Root: any = 'user-center';
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
