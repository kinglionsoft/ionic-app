import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'exam-list',
  segment: 'exam-list'
})
@Component({
  selector: 'page-exam-list',
  templateUrl: 'list.html',
})
export class ExamListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
