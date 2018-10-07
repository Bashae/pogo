import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string = "";
  password: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController
  ) {
  
  }

  goToRegistrationPage() {
    this.navCtrl.push(RegistrationPage);
  }

  setCredentials() {
    if ( this.username === "" ) {
      this.showAlert("Please enter an email address.");
      return false;
    }

    if ( this.password === "" ) {
      this.showAlert("Please enter a password.");
      return false;
    }
    
    return {
      email: this.username,
      password: this.password
    };
  }

  attemptLogin() {
    let credentials = this.setCredentials();
    if ( !credentials ) { return false; }

    // this.auth.signInWithEmail(credentials)
    this.auth.signInWithEmail()
      .then(
        (res) => { 
          this.navCtrl.push(HomePage);
        },
        (err) => { 
          if(err.code == "auth/wrong-password") {
            this.showAlert("Please enter the correct password.");
          }
          if(err.code == "auth/invalid-email") {
            this.showAlert("Please enter a valid email address");
          }
        }
      )
  }

  attemptRegistration() {
    let credentials = this.setCredentials();
    if ( !credentials ) {  return false; }

    this.auth.signUpWithEmail(credentials)
    // this.auth.signUpWithEmail()
      .then(
        (res) => {
          console.log(res);
          // Add Account Created toast?
          this.navCtrl.push(HomePage);
        },
        (err) => {
          console.log(err);
          if(err.code == "auth/email-already-in-use") {
            this.showAlert("This Email already exists.");
          }
          if(err.code == "auth/invalid-email") {
            this.showAlert("Please enter a proper email.");
          }
        }
      )
  }

  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  logOut() {
    this.auth.logOut();
  }

}