import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UserProvider {
  currentUserDoc: AngularFirestoreDocument;
  userCollection: AngularFirestoreCollection;

  constructor(
    public afs: AngularFirestore
  ) {}

  setUser(v) {
    this.userCollection = this.afs.collection('users');

    let userQuery = this.userCollection.ref
      .where('ui', '==', v)
      .get();

    userQuery.then(res => {
      res.forEach(element => {
        this.currentUserDoc = this.userCollection.doc(element.id);
      });
    });
  }

  updateUserLocation(geopoint) {
    this.currentUserDoc.update({"pos": geopoint.data});
  }

}
