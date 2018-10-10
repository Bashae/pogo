import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-search',
  templateUrl: 'input-search.html'
})
export class InputSearchComponent {
  @Input() inputType: string;
  @Input() items: any[];
  searchString: string;

  constructor() {
    
  }

  searchThroughItems() {

  }

}
