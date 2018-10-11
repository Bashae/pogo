import { Component } from '@angular/core';

@Component({
  selector: 'list-pokemon',
  templateUrl: 'list-pokemon.html'
})
export class ListPokemonComponent {
  searchType: string;

  constructor() {
    this.searchType = "raids";
  }

}
