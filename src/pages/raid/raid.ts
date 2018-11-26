import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-raid',
  templateUrl: 'raid.html',
})
export class RaidPage {
  raid: any;
  pokemon: any;
  // listArr: any[] = [
  //   [0],
  //   [1],
  //   [1, 2],
  //   [1, 2, 3],
  //   [1, 2, 3, 4],
  //   [1, 2, 3, 4, 5]
  // ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.raid = this.navParams.get('raid');
    this.pokemon = this.navParams.get('info');
    console.log('loaded the raid page A');
    console.log(this.raid);
    console.log(this.pokemon);
  }

}
