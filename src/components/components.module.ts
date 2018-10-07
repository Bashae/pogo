import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/header';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { InputGeoSearchComponent } from './input-geo-search/input-geo-search';

@NgModule({
	declarations: [HeaderComponent,
    InputGeoSearchComponent],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [HeaderComponent,
	InputGeoSearchComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
