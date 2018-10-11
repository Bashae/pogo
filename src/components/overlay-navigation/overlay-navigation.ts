import { Component } from '@angular/core';

/**
 * Generated class for the OverlayNavigationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'overlay-navigation',
  templateUrl: 'overlay-navigation.html'
})
export class OverlayNavigationComponent {

  text: string;

  constructor() {
    console.log('Hello OverlayNavigationComponent Component');
    this.text = 'Hello World';
  }

}
