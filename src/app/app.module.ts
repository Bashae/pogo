import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { AuthProvider } from '../providers/auth/auth';
import { GroupProvider } from '../providers/group/group';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { GeoProvider } from '../providers/geo/geo';

import { Geolocation } from '@ionic-native/geolocation';
import { LoginPage } from '../pages/login/login';


export const firebaseConfig = {
  apiKey: "AIzaSyCZ1ct5zv-XU7Dh-5mpBIu5s4J7kQKetoQ",
  authDomain: "pogo-pal-1532794775743.firebaseapp.com",
  databaseURL: "https://pogo-pal-1532794775743.firebaseio.com",
  projectId: "pogo-pal-1532794775743",
  storageBucket: "pogo-pal-1532794775743.appspot.com",
  messagingSenderId: "530444738525"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    AngularFireAuth,
    AngularFireModule,
    AngularFirestore,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider,
    GroupProvider,
    Geolocation,
    GeoProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
