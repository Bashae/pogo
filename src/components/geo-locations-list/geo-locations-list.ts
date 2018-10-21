import { Component } from '@angular/core';

@Component({
  selector: 'geo-locations-list',
  templateUrl: 'geo-locations-list.html'
})
export class GeoLocationsListComponent {

  text: string;

  constructor() {
    console.log('Hello GeoLocationsListComponent Component');
    this.text = 'Hello World';
  }

}
