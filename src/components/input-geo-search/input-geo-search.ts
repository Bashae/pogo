import { Component } from '@angular/core';

/**
 * Generated class for the InputGeoSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'input-geo-search',
  templateUrl: 'input-geo-search.html'
})
export class InputGeoSearchComponent {

  text: string;

  constructor() {
    console.log('Hello InputGeoSearchComponent Component');
    this.text = 'Hello World';
  }

}
