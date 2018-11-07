import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class GymProvider {
  gymCollection:   AngularFirestoreCollection;

  constructor(
    public afs: AngularFirestore
  ) {
    this.gymCollection = this.afs.collection('gy');
  }

  addGym(gym) {
    let _that = this;
    let addGym = this.gymCollection.add(gym);
    addGym.then(function(data) {
      gym['lid'] = data.id;
      _that.updateGym(data.id, gym)
    })
    .catch(function(err) {
      console.log('err: ' + err);
    })
  }

  updateGym(gym, data) {
    this.gymCollection.doc(gym).update(data);
  }

  getGym(gym) {

  }

}
