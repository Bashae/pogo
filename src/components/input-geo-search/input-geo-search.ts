import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'input-geo-search',
  templateUrl: 'input-geo-search.html'
})
export class InputGeoSearchComponent {
  autocomplete: string = "";
  GoogleAutocomplete;
  locations: any[];
  location: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
  ) {
    this.locations = [];
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  getAutocompleteResults() {
    if (this.autocomplete == '') {
      this.locations = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({input: this.autocomplete}, res => {
      if(res !== null) {
        this.locations = res;
        this.changeDetector.detectChanges();
        console.log('what is locations');
        console.log(this.locations);
      }
    });

    // this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete },
    // (predictions, status) => {
    //   console.log('a');
    //   console.log(predictions);
    //   console.log('b');
    //   console.log(status);
    //   this.autocompleteItems = [];
    //   this.zone.run(() => {
    //     predictions.forEach((prediction) => {
    //       console.log('what is prediction');
    //       console.log(prediction);
    //       this.autocompleteItems.push(prediction);
    //     });
    //   });
    // });
  }

}
