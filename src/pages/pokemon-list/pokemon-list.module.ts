import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PokemonListPage } from './pokemon-list';

@NgModule({
  declarations: [
    PokemonListPage,
  ],
  imports: [
    IonicPageModule.forChild(PokemonListPage),
  ],
})
export class PokemonListPageModule {}
