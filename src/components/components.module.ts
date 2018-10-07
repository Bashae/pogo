import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/header';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [HeaderComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
