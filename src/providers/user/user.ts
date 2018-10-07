import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UserProvider {
  currentUserDoc:   AngularFirestoreDocument;
  currentUser: any;

  userCollection:   AngularFirestoreCollection;
  friendCollection: AngularFirestoreCollection;
  groupCollection:  AngularFirestoreCollection;
  eventCollection:  AngularFirestoreCollection;

  userFriends: any;
  userEvents:  any;
  userGroups:  any;

  constructor(
    public afs: AngularFirestore
  ) {
    this.friendCollection = this.afs.collection('uf');
    this.eventCollection= this.afs.collection('ue');
    this.groupCollection = this.afs.collection('ug');
  }

  setUser(v) {
    this.userCollection = this.afs.collection('users');

    let userQuery = this.userCollection.ref
      .where('ui', '==', v)
      .get();

    userQuery.then(res => {
      res.forEach(element => {
        this.currentUserDoc = this.userCollection.doc(element.id);
        this.currentUserDoc.get().subscribe(ref => {
          this.currentUser = ref.data();
          this.getUserFriends(ref.data);
        })
      });
    });
  }

  getUserFriends(v) {
    let friends = this.friendCollection.ref
      .where('ui', '==', v)
      .get();

    friends.then(res => {
      console.log(res);
    });
  }

  getUserGroups() {

  }

  getUserEvents() {

  }

  updateUserLocation(geopoint) {
    this.currentUserDoc.update({"pos": geopoint.data});
  }

}
