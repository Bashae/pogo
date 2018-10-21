import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
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
  // map: GoogleMap;

  constructor(
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps
  ) {}

  ionViewDidLoad() {
    this.loadMap();
  }

  selectItem() {
    this.slides.slideNext();
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
