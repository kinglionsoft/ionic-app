import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamListPage } from './list';

@NgModule({
  declarations: [
    ExamListPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamListPage),
  ],
})
export class ExamListPageModule { }
