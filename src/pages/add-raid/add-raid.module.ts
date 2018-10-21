import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRaidPage } from './add-raid';

@NgModule({
  declarations: [
    AddRaidPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRaidPage),
  ],
})
export class AddRaidPageModule {}
