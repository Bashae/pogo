import { Component, ChangeDetectorRef, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { GoogleMaps } from '@ionic-native/google-maps';

@Component({
  selector: 'input-geo-search',
  templateUrl: 'input-geo-search.html'
})
export class InputGeoSearchComponent {
  @Output() receivedLocation = new EventEmitter<any>();
  @ViewChild('map') mapElement: ElementRef;

  autocomplete: string = "";
  GoogleAutocomplete;
  GooglePlacesService;
  Geocoder;
  locations: any[];
  location: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public maps: GoogleMaps,
    public zone: NgZone
  ) {
    this.locations = [];
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.Geocoder = new google.maps.Geocoder();
  }

  ngOnInit() {
    let map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: 0, lng: 0},
      zoom: 15
    });
    this.GooglePlacesService = new google.maps.places.PlacesService(map);
  }

  ngOnDestroy(){
    this.changeDetector.detach();
  }

  getAutocompleteResults() {
    if (this.autocomplete == '') {
      this.locations = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({input: this.autocomplete }, res => {
      if(res !== null) {
        this.locations = res;
      }
    });
  }

  selectLocation(loc) {
    this.autocomplete = "";
    this.locations = [];
    
    let loc_obj = {
      d: loc['description'],
      id: loc['place_id'],
      n: loc['structured_formatting']['main_text'],
      pos: {}
    }

    this.GooglePlacesService.getDetails({'placeId': loc_obj.id}, (details) => {
      loc_obj['ad'] = details['formatted_address'];
      loc_obj['pos']['geopoint'] = [details['geometry']['location'].lat(), details['geometry']['location'].lng()];
      this.location = loc_obj;
      this.submitLocation();
    });
  }

  submitLocation() {
    this.receivedLocation.emit(this.location);
    
    this.autocomplete = "";
    this.locations = [];
    this.location = {};
  }
}
