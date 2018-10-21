import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTradePage } from './add-trade';

@NgModule({
  declarations: [
    AddTradePage,
  ],
  imports: [
    IonicPageModule.forChild(AddTradePage),
  ],
})
export class AddTradePageModule {}
