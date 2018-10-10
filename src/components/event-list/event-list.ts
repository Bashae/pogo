import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'event-list',
  templateUrl: 'event-list.html'
})
export class EventListComponent {
  events: any[];

  constructor(
    public user: UserProvider
  ) {}

  ngOnChanges() {
    this.events = this.user.userGroups || [];
  }

}
