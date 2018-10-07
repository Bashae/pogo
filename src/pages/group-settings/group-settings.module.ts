import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupSettingsPage } from './group-settings';

@NgModule({
  declarations: [
    GroupSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupSettingsPage),
  ],
})
export class GroupSettingsPageModule {}
