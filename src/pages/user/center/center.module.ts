import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCenterPage } from './center';

@NgModule({
  declarations: [
    UserCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCenterPage),
  ],
})
export class UserCenterPageModule { }
