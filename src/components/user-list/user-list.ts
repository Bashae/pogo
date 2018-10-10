import { Component } from '@angular/core';

/**
 * Generated class for the UserListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-list',
  templateUrl: 'user-list.html'
})
export class UserListComponent {

  text: string;

  constructor() {
    console.log('Hello UserListComponent Component');
    this.text = 'Hello World';
  }

}
