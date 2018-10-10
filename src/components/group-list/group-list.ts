import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'group-list',
  templateUrl: 'group-list.html'
})
export class GroupListComponent {
  groups: any[];

  constructor(
    public user: UserProvider
  ) {
    this.groups = this.user.userGroups || [];
  }

}
