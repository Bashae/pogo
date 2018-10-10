import { Component } from '@angular/core';

/**
 * Generated class for the GroupListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'group-list',
  templateUrl: 'group-list.html'
})
export class GroupListComponent {

  text: string;

  constructor() {
    console.log('Hello GroupListComponent Component');
    this.text = 'Hello World';
  }

}
