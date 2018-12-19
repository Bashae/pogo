import { Injectable, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { switchMap } from 'rxjs/operators';
import { UserProvider } from '../user/user';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class GeoProvider {
  geo = geofirex.init(firebase)
  points: Observable<any>
  radius = new BehaviorSubject(10)
  currentLocation = new BehaviorSubject({lat: null, lon: null});
  subscription: any;
  isLocationAllowed: boolean = false;
  isLocatorActive = new BehaviorSubject(true);

  nearbyFriends: any;
  nearbyEvents:  any;
  nearbyGroups:  any;

  constructor ( 
    public afs: AngularFirestore,
    public userService: UserProvider,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    private androidPermissions: AndroidPermissions,
    public loadingCtrl: LoadingController
  ) {
    
  }

  async checkLocatorPermissions () {
    await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.LOCATION_HARDWARE).then(
      result => {this.isLocationAllowed = true;},
      err => {this.isLocationAllowed = false;}
    );

    return this.isLocationAllowed;
  }

  setLocator(bool) {
    this.isLocatorActive.next(bool);
    this.setLocation(!bool);
  }

  locatorOn() {
    this.isLocatorActive.next(true);
  }

  locatorOff() {
    this.isLocatorActive.next(false);
  }

  getGeoPoint(lat, lon) {
    return this.geo.point(lat, lon);
  }

  getLocation() {
    return this.currentLocation;
  }

  setLocation(loc) {
    if(!loc) {
      const loader = this.loadingCtrl.create({
        content: "Receiving Location..."
      });
      loader.present();
  
      this.geolocation.getCurrentPosition({timeout: 15000}).then(resp => {
        this.currentLocation.next({'lat': resp.coords.latitude, 'lon': resp.coords.longitude})
        loader.dismiss();
      }).catch(res => {
        loader.dismiss();
      })

      // let newGeoPoint = this.getGeoPoint(this.currentLocation.lat, this.currentLocation.lon);
      // this.userService.updateUserLocation(newGeoPoint);
    } else {
      this.currentLocation.next({'lat': null, 'lon': null});
    }
  }

  trackLocation() {
    this.subscription = this.geolocation.watchPosition();
    let lastUpdate, currentUpdate;
    lastUpdate = 0;
    currentUpdate = 1;

    setInterval(function() {
      currentUpdate++;
    }, 15000);

    this.subscription.subscribe(position => {
      if(lastUpdate !== currentUpdate) {
        lastUpdate = currentUpdate;
        this.setLocation(true);
      }
    })
  }

  // Collection Retrieval
  getNearbyPlayers(lat, lon) {
    const field = 'pos';
    let center = this.getGeoPoint(lat, lon);

    return this.points = this.radius.pipe(
      switchMap( r => {
        return this.geo.collection('users').within(center, r, field);
      })
    )
  }

  getNearbyGyms() {
    const field = 'pos';
    let loc = this.getLocation();
    let center;

    loc.subscribe(loc => {
      center = this.getGeoPoint(loc.lat, loc.lon);
    })

    return this.geo.collection('gy', ref =>
      ref.limit(15))
        .within(center, 10, field);
  }

  getNearbyRaids(lat, lon) {
    const field = 'pos';
    let center = this.getGeoPoint(lat, lon);

    return this.geo.collection('gy', ref =>
      ref.where('cr', '==', true)
         .limit(15))
         .within(center, 10, field);
  }

  getNearbyQuests(lat, lon) {
    const field = 'pos';
    let center = this.getGeoPoint(lat, lon);

    return this.geo.collection('gy', ref =>
      ref.where('cq', '==', true)
         .limit(15))
         .within(center, 5, field);
  }

  getNearbyTrades(lat, lon) {
    const field = 'pos';
    let center = this.getGeoPoint(lat, lon);

    return this.geo.collection('tr', ref =>
      ref.limit(15))
          .within(center, 5, field);
  }

  getAreaGroups(lat, lon, rad) {
    const field = 'pos';
    let center = this.getGeoPoint(lat, lon);

    return this.geo.collection('groups').within(center, rad, field);
  }

  getAreaEvents(lat, lon, rad) {
    const field = 'pos';
    let center = this.getGeoPoint(lat, lon);

    return this.geo.collection('events').within(center, rad, field);
  }

}
