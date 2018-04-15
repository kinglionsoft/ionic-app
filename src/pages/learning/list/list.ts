import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'learning-list',
  segment: 'learning-list'
})
@Component({
  selector: 'page-learning-list',
  templateUrl: 'list.html',
})
export class LearningListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
