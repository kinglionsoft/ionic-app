import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkListPage } from './list';

@NgModule({
  declarations: [
    WorkListPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkListPage)
  ],
})
export class WorkListPageModule { }
