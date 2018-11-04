import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'input-geo-search',
  templateUrl: 'input-geo-search.html'
})
export class InputGeoSearchComponent {
  @Output() receivedLocation = new EventEmitter<any>();

  autocomplete: string = "";
  GoogleAutocomplete;
  Geocoder;
  locations: any[];
  location: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
  ) {
    this.locations = [];
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.Geocoder = new google.maps.Geocoder();
  }

  getAutocompleteResults() {
    if (this.autocomplete == '') {
      this.locations = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({input: this.autocomplete }, res => {
      if(res !== null) {
        this.locations = res;
        this.changeDetector.detectChanges();
      }
    });
  }

  selectLocation(loc) {
    let loc_obj = {
      d: loc['description'],
      id: loc['place_id'],
      n: loc['structured_formatting']['main_text'],
      pos: {}
    }

    let _that = this;
    this.Geocoder.geocode({'placeId': loc_obj.id}, function(results, status) {
      if (status === 'OK') {
        loc_obj['ad'] = results[0]['formatted_address'];
        loc_obj['pos']['geopoint'] = [results[0]['geometry']['location'].lat(), results[0]['geometry']['location'].lng()];
        _that.receivedLocation.emit(loc_obj);
      }
    });
  }
}
