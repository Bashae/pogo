import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import { Component, Input } from '@angular/core';
import { GeoProvider } from '../../providers/geo/geo';

@Component({
  selector: 'map-location',
  templateUrl: 'map-location.html'
})
export class MapLocationComponent {
  @Input() placeholders: any;
  public map: GoogleMap;
  location: any;
  lat: any;
  lon: any;

  constructor(
    public geo: GeoProvider
  ) {
    this.location = this.geo.getLocation();
  }

  ngOnInit() {
    this.location.subscribe(res => {
      this.lat = res.lat;
      this.lon = res.lon;
      this.makeMap();
    })
  }

  changed() {
    console.log('is changed');
  }

  makeMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
          target: {
            lat: this.lat,
            lng: this.lon
          },
          zoom: 14
        }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    console.log('what is placeholders');
    console.log(this.placeholders);
    if(this.placeholders) {
      this.placePins(this.placeholders);
    }
  }

  placePins(pinlist) {
    console.log('placing pins');
    pinlist.forEach(pin => {
      this.placePin(pin.pos.geopoint.latitude, pin.pos.geopoint.longitude)
    });
  }

  placePin(lat, lon) {
    console.log('placing pin');
    console.log(lat);
    console.log(lon);
    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: lat,
        lng: lon
      }
    });
    
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
}
