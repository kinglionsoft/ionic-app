import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Environment } from '@env/environment';

@IonicPage({
  name: 'exam-list',
  segment: 'exam-list'
})
@Component({
  selector: 'page-exam-list',
  templateUrl: 'list.html',
})
export class ExamListPage {

  url: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.url = Environment.SERVER_URL;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
