import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController, NavParams } from 'ionic-angular';
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
import { RegistrationPage } from '../pages/registration/registration';

import { GoogleMaps } from "@ionic-native/google-maps";
import { GroupPage } from '../pages/group/group';
import { ComponentsModule } from '../components/components.module';
import { GeoPage } from '../pages/geo/geo';

import { AddEventPage } from '../pages/add-event/add-event';
import { AddGroupPage } from '../pages/add-group/add-group';
import { AddRaidPage } from '../pages/add-raid/add-raid';
import { AddTradePage } from '../pages/add-trade/add-trade';
import { AddQuestPage } from '../pages/add-quest/add-quest';
import { AddModalPage } from '../pages/add-modal/add-modal';
import { AddGymPage } from '../pages/add-gym/add-gym';
import { GymProvider } from '../providers/gym/gym';
import { RaidProvider } from '../providers/raid/raid';
import { QuestProvider } from '../providers/quest/quest';
import { TradeProvider } from '../providers/trade/trade';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { UserPage } from '../pages/user/user';
import { EventPage } from '../pages/event/event';
import { RaidPage } from '../pages/raid/raid';


import { Camera, CameraOptions } from '@ionic-native/camera';


export const firebaseConfig = {
  apiKey: "AIzaSyC_f0a9UhqZniUM87FtEKp32FbDJXI7wj8",
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
    LoginPage,
    RegistrationPage,
    GeoPage,
    GroupPage,
    AddEventPage,
    AddGroupPage,
    AddRaidPage,
    AddQuestPage,
    AddTradePage,
    AddModalPage,
    AddGymPage,
    UserPage,
    EventPage,
    RaidPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    GeoPage,
    GroupPage,
    AddEventPage,
    AddGroupPage,
    AddRaidPage,
    AddQuestPage,
    AddTradePage,
    AddModalPage,
    AddGymPage,
    UserPage,
    EventPage,
    RaidPage
  ],
  providers: [
    AndroidPermissions,
    AngularFireAuth,
    AngularFireModule,
    AngularFirestore,
    Camera,
    GoogleMaps,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider,
    GroupProvider,
    Geolocation,
    GeoProvider,
    GymProvider,
    RaidProvider,
    QuestProvider,
    TradeProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
