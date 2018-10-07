import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserProvider } from '../user/user';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  public user: firebase.User;
  public userId: string;
  public isLoggedIn: boolean;

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserProvider
    ) {
      this.setAuth();
    }

  setAuth() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.isLoggedIn = true;
        this.user = user;
        this.userId = this.user.uid;
        this.userService.setUser(this.user.uid);
      } else {
        this.isLoggedIn = false;
        this.user = null;
        this.userId = null;
      }
    })
  }

  signInWithEmail() {
    let credentials = {'email': 'ice.andrew.media@gmail.com', 'password': 'asdfasdf'};
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signUpWithEmail(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

}
