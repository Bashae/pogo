import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RaidPage } from './raid';

@NgModule({
  declarations: [
    RaidPage,
  ],
  imports: [
    IonicPageModule.forChild(RaidPage),
  ],
})
export class RaidPageModule {}
