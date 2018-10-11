import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'grid-selection',
  templateUrl: 'grid-selection.html'
})
export class GridSelectionComponent {
  @Output() typeChanged = new EventEmitter<string>();
  selection: string;

  constructor() {
    this.selection = "Looking for Pokemon";
  }

  changeType(typeString) {
    this.selection = typeString; 
    this.typeChanged.emit(typeString);
  }

}
