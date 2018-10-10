import { Component, Input } from '@angular/core';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.html'
})
export class UserListComponent {
  friends: any[];

  constructor(
    public user: UserProvider
  ) {
    this.friends = this.user.userFriends || [];   
  }

}
