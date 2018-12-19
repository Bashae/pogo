import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { GeoPage } from '../pages/geo/geo';
import { LoginPage } from '../pages/login/login';
import { GeoProvider } from '../providers/geo/geo';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav;
  rootPage:any;
  isLocatorActive: boolean;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public auth: AuthProvider,
    public geo: GeoProvider,
    public changeDetector: ChangeDetectorRef,
    public user: UserProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.auth.afAuth.authState.subscribe(user => {
        if ( user && user !== null ) {
          if(platform.is('android')) {
            if(this.geo.checkLocatorPermissions()) {
              this.setUserLocation();
            } else {
              // show a message about activating location.
            }
          }
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      })
      
      // Hide Splash after auth && || location return
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    this.geo.isLocatorActive.subscribe(res => {
      this.isLocatorActive = res;
    })
  }

  toggleLocator() {
    this.isLocatorActive = !this.isLocatorActive;
    this.geo.setLocator(this.isLocatorActive);
  }

  setUserLocation() {
    this.geo.setLocation(false);
  }

  goToHomePage() {
    this.nav.setRoot(HomePage);
  }

  goToGeoPage() {
    this.nav.setRoot(GeoPage);
  }

  checkSessionStatus() {
    if(!this.auth.user){
      this.nav.setRoot(LoginPage);
    } else {
      this.logOut();
    }
  }

  logOut() {
    this.auth.logOut();
  }
}