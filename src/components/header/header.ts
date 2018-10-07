import { Component, ViewChild } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { GeoPage } from '../../pages/geo/geo';

@Component({
  selector: 'uni-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  constructor(
    
  ) {

  }

  goToHomePage() {
    // this.nav.setRoot(HomePage);
  }

  goToGeoPage() {
  }

}
