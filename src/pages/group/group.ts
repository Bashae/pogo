import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  group: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.group = this.navParams.get('group');
    console.log('what is group');
    console.log(this.group);
  }

}
