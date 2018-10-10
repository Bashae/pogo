import { Component } from '@angular/core';

/**
 * Generated class for the EventListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'event-list',
  templateUrl: 'event-list.html'
})
export class EventListComponent {

  text: string;

  constructor() {
    console.log('Hello EventListComponent Component');
    this.text = 'Hello World';
  }

}
