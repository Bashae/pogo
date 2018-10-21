import { Component } from '@angular/core';

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
