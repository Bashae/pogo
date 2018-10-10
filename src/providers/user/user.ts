import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
          this.getUserFriends(ref.data());
          this.getUserGroups(ref.data());
          this.getUserEvents(ref.data());
        })
      });
    });
  }

  getUserFriends(v) {
    let friends = this.friendCollection.ref
      .where('ui', '==', v.ui)
      .get();

    friends.then(res => {
      res.forEach(it => {
        this.userFriends = it.data().li;
      })
    })
  }

  getUserGroups(v) {
    let groups = this.groupCollection.ref
      .where('ui', '==', v.ui)
      .get();

    groups.then(res => {
      res.forEach(it => {
        this.userGroups = it.data().li;
      })
    });
  }

  getUserEvents(v) {
    let events = this.eventCollection.ref
      .where('ui', '==', v.ui)
      .get();

    events.then(res => {
      res.forEach(it => {
        this.userEvents = it.data().li;
      })
    });
  }

  updateUserLocation(geopoint) {
    this.currentUserDoc.update({"pos": geopoint.data});
  }

}
