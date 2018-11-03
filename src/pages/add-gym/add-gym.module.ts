import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGymPage } from './add-gym';

@NgModule({
  declarations: [
    AddGymPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGymPage),
  ],
})
export class AddGymPageModule {}
