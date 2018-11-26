import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from 'firebase/app';
import { Slides } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  LatLng,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { GeoProvider } from '../../providers/geo/geo';
import { GymProvider } from '../../providers/gym/gym';

@IonicPage()
@Component({
  selector: 'page-add-raid',
  templateUrl: 'add-raid.html',
})
export class AddRaidPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('map') mapElement: ElementRef;
  private map: GoogleMap;
  private location: LatLng;
  returnResponse: string = "";
  additionType: string;
  // map: GoogleMap;
  currentSlide: number;
  currentTitle: string;
  gyms: any;

  // New Gym
  newGymLocation: any;

  // New Raid
  raidNumber: number = 0;
  isHatched: boolean;
  selectedGym: any;
  hatchInput: any;
  raidPokemon: any;
  raidPokemonCP: any;
  attackOne: any;
  attackTwo: any;
  raidTimeRemaining: any;

  // New Quest
  questReward: any;
  questText: any;
  questType: any;

  // New Trade

  constructor(
    private geo: GeoProvider,
    public viewCtrl: ViewController,
    public gymService: GymProvider
  ) {
    this.currentTitle = "What are we adding?";
    this.currentSlide = 1;
  }

  ionViewDidLoad() {
    this.loadMap();
    this.getGyms();
  }

  nextSlide() {
    this.currentSlide++;
    this.slides.slideNext();
  }

  previousSlide() {
    this.currentSlide--;
    this.slides.slidePrev();
  }

  closeSlides() {
    this.viewCtrl.dismiss();
  }

  selectType(type) {
    this.additionType = type;
  }

  selectItem(gym) {
    this.selectedGym = gym;
    this.nextSlide();
  }

  setHatch(bool) {
    this.isHatched = bool;
    if(!bool) {
      return;
    }
    this.nextSlide();
  }

  selectLocation(loc) {
    this.newGymLocation = loc;
    loc.pos.geohash = this.geo.getGeoPoint(loc.pos.geopoint[0], loc.pos.geopoint[1]).hash;
    loc.pos.geopoint = new firebase.firestore.GeoPoint(loc.pos.geopoint[0], loc.pos.geopoint[1])
    this.nextSlide();
    console.log(loc);
  }

  addNewLocation() {
    // Send 'new gym location' to database.
    this.gymService.addGym(this.newGymLocation);
  }

  addNewQuest() {
    // Find by location id (lid)
    let gym = this.selectedGym.lid;
    let data = this.selectedGym;

    data['cq'] = true;
    data['q'] = {
      'r': this.questReward,
      'te': this.questText,
      'ty': this.questType
    }

    this.gymService.updateGym(gym, data);
    this.closeSlides();
  }

  addRaidEgg() {
    // Find by location id (lid)
    let gym = this.selectedGym.lid;
    let data = this.selectedGym;
    
    data['cr'] = true;
    data['r'] = {
      'h': this.isHatched,
      'ra': this.raidNumber,
      'tth': this.hatchInput,
    }

    this.gymService.updateGym(gym, data);
    this.closeSlides();
  }

  addNewRaid() {
    // Find by location id (lid)
    let gym = this.selectedGym.lid;
    let data = this.selectedGym;

    data['cr'] = true;
    data['r'] = {
      'p': this.raidPokemon,
      'tr': this.raidTimeRemaining,
      'cp': this.raidPokemonCP,
      'atk1': this.attackOne,
      'atk2': this.attackTwo,
      'h': this.isHatched,
      'ra': this.raidNumber,
      'tth': 0
    }

    this.gymService.updateGym(gym, data);
    this.closeSlides();
  }

  getGyms() {
    let gyms = this.geo.getNearbyGyms();
    gyms.subscribe(res => {
      console.log('gyms sub');
      console.log(res);
      this.gyms = res;
    });
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map_canvas');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 35.5012683,
          lng: -80.8609436
        },
        zoom: 18,
        tilt: 30
      }
    }
    
    let map = GoogleMaps.create('map_canvas', mapOptions);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
      (res) => {
        console.log(res)
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    ).catch( res => {
      console.log('no workszy');
    })
   
    // create LatLng object
    // let ionic: LatLng = new LatLng(43.0741904,-89.3809802);
   
    // create CameraPosition
    // let position: CameraPosition = {
    //   target: ionic,
    //   zoom: 18,
    //   tilt: 30
    // }
   
    // move the map's camera to position
    // map.moveCamera(position);
   
    // create new marker
    // let markerOptions: MarkerOptions = {
    //   position: ionic,
    //   title: 'Ionic'
    // }
   
    // const marker: Marker = map.addMarker(markerOptions)
    //   .then((marker: Marker) => {
    //      marker.showInfoWindow();
    //    });


    // this.location = new LatLng(42.346903, -71.135101);

    // let element = this.mapElement.nativeElement;
    // this.map = GoogleMaps.create(element);
    // this.returnResponse = "No Response yet";
    // console.log('anything');
 
    // this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    //   console.log('try');
    //   this.returnResponse = "No Error, Should Load";
    //   let options = {
    //     target: this.location,
    //     zoom: 8
    //   };
    // }).catch(() => {
    //   console.log('catch');
    //   this.returnResponse = "There was an issue";
    // })
  }

  setCoordinates() {
    console.log('raid location coords');

    // this.geolocation.getCurrentPosition().then(resp => {
    //   this.loadMap(resp.coords.latitude, resp.coords.longitude);
    // });
  }

}
