import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/header';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { InputGeoSearchComponent } from './input-geo-search/input-geo-search';
import { UserListComponent } from './user-list/user-list';
import { EventListComponent } from './event-list/event-list';
import { GroupListComponent } from './group-list/group-list';
import { GeoLocationsListComponent } from './geo-locations-list/geo-locations-list';
import { InputSearchComponent } from './input-search/input-search';

@NgModule({
	declarations: [HeaderComponent,
    InputGeoSearchComponent,
    UserListComponent,
    EventListComponent,
    GroupListComponent,
    GeoLocationsListComponent,
    InputSearchComponent],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [HeaderComponent,
	InputGeoSearchComponent,
    UserListComponent,
    EventListComponent,
    GroupListComponent,
    GeoLocationsListComponent,
    InputSearchComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
