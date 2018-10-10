import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'group-list',
  templateUrl: 'group-list.html'
})
export class GroupListComponent {

  constructor(
    public user: UserProvider
  ) {

  }

}
