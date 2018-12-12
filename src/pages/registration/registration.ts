import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  @ViewChild(Slides) slides: Slides;

  userCredentials: any = {}
  userInfo: any = {}

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public user: UserProvider
  ) {}

  nextSlide() {
    this.slides.slideNext();
  }

  selectTeam(team) {
    this.userInfo['t'] = team;
  }

  finishSignup() {
    let newUser = this.auth.signUpWithEmail(this.userCredentials);
    newUser.then(res => {
      this.userInfo['ui'] = res.user.uid;
      
      let newUserInfo = this.user.createUser(this.userInfo);
      newUserInfo.then(res => {
        this.navCtrl.setRoot(HomePage);
      })
    })
  }

}
