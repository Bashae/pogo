import { Component } from '@angular/core';

/**
 * Generated class for the GeoLocationsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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
