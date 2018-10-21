import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddQuestPage } from './add-quest';

@NgModule({
  declarations: [
    AddQuestPage,
  ],
  imports: [
    IonicPageModule.forChild(AddQuestPage),
  ],
})
export class AddQuestPageModule {}
