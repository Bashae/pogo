import { Component } from '@angular/core';

/**
 * Generated class for the GeoSearchInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'geo-search-input',
  templateUrl: 'geo-search-input.html'
})
export class GeoSearchInputComponent {

  text: string;

  constructor() {
    console.log('Hello GeoSearchInputComponent Component');
    this.text = 'Hello World';
  }

}
