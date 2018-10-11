import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { switchMap } from 'rxjs/operators';
import { UserProvider } from '../user/user';

@Injectable()
export class GeoProvider {
  geo = geofirex.init(firebase)
  points: Observable<any>
  radius = new BehaviorSubject(10)
  location = {latitude: "", longitude: ""}

  nearbyFriends: any;
  nearbyEvents:  any;
  nearbyGroups:  any;

  constructor ( 
    public afs: AngularFirestore,
    public userService: UserProvider
  ) {
    
  }

  changePosition(v) {
    this.location.latitude = v.coords.latitude;
    this.location.longitude = v.coords.longitude;
    let newGeoPoint = this.getGeoPoint(this.location.latitude, this.location.longitude);
    // this.userService.updateUserLocation(newGeoPoint);
  }

  getGeoPoint(lat, lon) {
    return this.geo.point(lat, lon);
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
