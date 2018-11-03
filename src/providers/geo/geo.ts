import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { switchMap } from 'rxjs/operators';
import { UserProvider } from '../user/user';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GeoProvider {
  geo = geofirex.init(firebase)
  points: Observable<any>
  radius = new BehaviorSubject(10)
  location = {latitude: 0, longitude: 0}
  currentLocation = {lat: 0, lon: 0}
  subscription: any;

  nearbyFriends: any;
  nearbyEvents:  any;
  nearbyGroups:  any;

  constructor ( 
    public afs: AngularFirestore,
    public userService: UserProvider,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps
  ) {
    
  }

  getGeoPoint(lat, lon) {
    return this.geo.point(lat, lon);
  }

  getLocation() {
    return this.currentLocation;
  }

  setLocation(loc) {
    if(!loc) {
      this.geolocation.getCurrentPosition().then(resp => {
        this.currentLocation.lat = resp.coords.latitude;
        this.currentLocation.lon = resp.coords.longitude;
      });
    }
    // let newGeoPoint = this.getGeoPoint(this.currentLocation.lat, this.currentLocation.lon);
    // this.userService.updateUserLocation(newGeoPoint);
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
    this.setLocation(false);
    let loc = this.getLocation();
    const field = 'pos';
    let center = this.getGeoPoint(loc.lat, loc.lon);
    console.log('getting gyms');
    console.log(loc);

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
      ref.limit(15))
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
