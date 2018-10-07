import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/header';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { GeoSearchInputComponent } from './geo-search-input/geo-search-input';
import { InputGeoSearchComponent } from './input-geo-search/input-geo-search';
@NgModule({
	declarations: [HeaderComponent,
    GeoSearchInputComponent,
    InputGeoSearchComponent],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [HeaderComponent,
    GeoSearchInputComponent,
    InputGeoSearchComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
