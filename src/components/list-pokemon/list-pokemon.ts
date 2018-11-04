import { Component } from '@angular/core';
import { GeoProvider } from '../../providers/geo/geo';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddQuestPage } from '../../pages/add-quest/add-quest';
import { AddRaidPage } from '../../pages/add-raid/add-raid';
import { AddTradePage } from '../../pages/add-trade/add-trade';
import { AddModalPage } from '../../pages/add-modal/add-modal';

@Component({
  selector: 'list-pokemon',
  templateUrl: 'list-pokemon.html'
})
export class ListPokemonComponent {
  searchType: string;
  mapLat: any;
  mapLon: any;

  nearbyRaids: any[];
  nearbyQuests: any[];
  nearbyTrades: any[];

  constructor(
    public geo: GeoProvider,
    public geolocation: Geolocation,
    public navCtrl: NavController
  ) {
    this.searchType = "raids";
    this.nearbyRaids = [];
    this.nearbyQuests = [];
    this.nearbyTrades = [];

    let raidsCall = this.getLocation();
    console.log('doing check');
    raidsCall.then(resp => {
      let raids = this.geo.getNearbyRaids(resp.coords.latitude, resp.coords.longitude);
      raids.subscribe(res => {
        console.log('raids sub');
        console.log(res);
        console.log('set raids');
        this.nearbyRaids = res;
      });
    });

    raidsCall.catch(a => {
      console.log('cetch');
    })

    raidsCall.catch(res => {
      console.log('it fail raids');
    })

    let questsCall = this.getLocation();
    questsCall.then(resp => {
      let quests = this.geo.getNearbyQuests(resp.coords.latitude, resp.coords.longitude)
      quests.subscribe(res => {
        console.log('quests sub');
        console.log(res);
        this.nearbyQuests = res;
      });
    })

    let tradesCall = this.getLocation();
    tradesCall.then(resp => {
      let trades = this.geo.getNearbyTrades(resp.coords.latitude, resp.coords.longitude)
      trades.subscribe(res => {
        console.log('trades sub');
        console.log(res);
        this.nearbyTrades = res;
      });
    })
  }

  getLocation() {
    return this.geolocation.getCurrentPosition();
  }

  openAddQuestPage() {
    this.navCtrl.push(AddQuestPage);
  }

  openAddModalPage() {
    this.navCtrl.push(AddRaidPage);
  }

  openAddTradePage() {
    this.navCtrl.push(AddTradePage);
  }

}
