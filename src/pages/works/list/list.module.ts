import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkListPage } from './list';

import { WorkModule } from '@pages/works';

@NgModule({
  declarations: [
    WorkListPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkListPage),
    WorkModule
  ],
})
export class WorkListPageModule { }
