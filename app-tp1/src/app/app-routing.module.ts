import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { SongDetails } from './song-details/song-details.component';
import { SongsList } from './songs-list/songs-list.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  {
    path: 'songs/:id', 
    component: SongDetails, 
    data: { 
      title: "Canción"
    }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'songs', 
    component: SongsList, 
    canActivate: [AuthGuard]
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'auth-callback', 
    component: LoginComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}