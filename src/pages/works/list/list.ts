import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher, IonicPage } from 'ionic-angular';

import { ScheduleFilterPage } from '../../schedule-filter/schedule-filter';
import { WorkService } from '@pages/works';

@IonicPage({
  name: 'work-list',
  segment: 'work-list',
  priority: 'high'
})
@Component({
  selector: 'page-work-list',
  templateUrl: 'list.html',
})
export class WorkListPage {

  // `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('workList', { read: List }) workList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private service: WorkService
  ) { }

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.workList && this.workList.closeSlidingItems();
    this.service.getWorks(1, 10)
      .subscribe((data: any) => {
        this.groups = data;
      });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data
    console.dir(sessionData);
  }

  addTop(slidingItem: ItemSliding, sessionData: any) {
    console.log(slidingItem);
    console.log(sessionData);
  }

  removeTop(slidingItem: ItemSliding, sessionData: any) {
    console.log(sessionData);
    let alert = this.alertCtrl.create({
      title: '取消置顶',
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: '确认',
          handler: () => {
            // they want to remove this session from their favorites
            //  this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    console.log(refresher);
    // this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
    //   this.shownSessions = data.shownSessions;
    //   this.groups = data.groups;

    //   // simulate a network request that would take longer
    //   // than just pulling from out local json file
    //   setTimeout(() => {
    //     refresher.complete();

    //     const toast = this.toastCtrl.create({
    //       message: 'Sessions have been updated.',
    //       duration: 3000
    //     });
    //     toast.present();
    //   }, 1000);
    // });
  }
}
