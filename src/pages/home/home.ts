import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selection: any = {};
  davidsonLat: 35.5011475;
  davidsonLon: -80.86091789999999;
  homeLat: 35.409834100000005;
  homeLon: -80.6167091;

  constructor(
    public navCtrl: NavController
  ) {
    this.selection.title = "Find Nearby Players";
    console.log(this.getRadians(37.26383));
  }

  // Difference between 1 degree of latitude is always 69 miles.
  // difference between lat 31 and lat 32 is 69 miles.

  // Longitude Difference is more difficult.
  // toRadians(lat) * 69.172

  // So basically, if we want to get decent numbers.
  // Just query lats and longs within 1 degree of the user.
  // Use that to narrow down.

  getRadians(number) {
    return number * Math.PI / 180;
  }

  getDistance(lat1, lon1, lat2, lon2) {
    // davidson
    // var lat1 = 35.5011475;
    // var lon1 = -80.86091789999999;
    // home
    // var lat2 = 35.409834100000005;
    // var lon2 = -80.6167091;
    // angels and sparrows
    // var lat2 = 35.4409242;
    // var lon2 = -80.8443726;

    var R = 6371e3; // metres
    var a = this.getRadians(lat1);
    var b = this.getRadians(lat2);
    var c = this.getRadians(lat2-lat1);
    var d = this.getRadians(lon2-lon1);
    
    var first = Math.sin(c/2) * Math.sin(c/2) +
      Math.cos(a) * Math.cos(b) *
      Math.sin(d/2) * Math.sin(d/2);
    
    var c = 2 * Math.atan2(Math.sqrt(first), Math.sqrt(1 - first));    
    var d = R * c;
    return Math.ceil(d / 1000);
  }

}
