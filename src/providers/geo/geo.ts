import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';

@Injectable()
export class GeoProvider {
  geo = geofirex.init(firebase);
  points: Observable<any>;

  // If we want radius size to change
  // radius = new BehaviorSubject(10);

  constructor ( 
    public afs: AngularFirestore
  ) {
    // If we want radius size to change.
    // this.points = this.radius.pipe(
    //   switchMap( r => {
    //     return this.geo.collection('locations').within(center, r, field);
    //   })
    // )
  }

  getGeoPoint(lat, lon) {
    return this.geo.point(lat, lon);
  }

  getNearbyPlayers(lat, lon, radius) {
    const cities = this.geo.collection('users');
    const field = 'pos';
    let center = this.getGeoPoint(lat, lon);
    let radi = radius || 20;

    const query = cities.within(center, radi, field);
    return query;
  }

}
