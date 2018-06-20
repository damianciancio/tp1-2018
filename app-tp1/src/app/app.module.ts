import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyService } from './spotify/spotify.service';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SongsList } from './songs-list/songs-list.component';
import { SongDetails } from './song-details/song-details.component';

const appRoutes: Routes = [
  {
    path: 'songs/:id', component: SongDetails
  },
  {
    path: 'songs', component: SongsList
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'auth-callback', component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SongsList,
    SongDetails
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule {
  ngOnInit() {
    
  }
 }
