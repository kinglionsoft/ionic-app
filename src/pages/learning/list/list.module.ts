import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LearningListPage } from './list';

@NgModule({
  declarations: [
    LearningListPage,
  ],
  imports: [
    IonicPageModule.forChild(LearningListPage),
  ],
})
export class LearningListPageModule { }
