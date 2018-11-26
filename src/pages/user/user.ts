import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  player: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.player = this.navParams.get('user');
    console.log(this.player);
  }

}
