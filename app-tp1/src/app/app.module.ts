import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyService } from './spotify/spotify.service';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SongsList } from './songs-list/songs-list.component';
import { SongDetails } from './song-details/song-details.component';
import { MsToInterval } from './pipes/msToInterval.pipe';
import { PlaylistsComponent } from './playlists/playlists.component';

import { AppRoutingModule } from './app-routing.module';

const appRoutes: Routes = [
  {
    path: 'songs/:id', component: SongDetails, data: { title: "Canción"}
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
    SongDetails,
    MsToInterval,
    PlaylistsComponent
  ],
  imports: [
    FormsModule,
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
