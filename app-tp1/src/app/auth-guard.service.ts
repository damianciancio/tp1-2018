import { Injectable }     from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {SpotifyService} from './spotify/spotify.service';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private spotify: SpotifyService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var accessToken = window.localStorage.getItem("spo_accessToken");
    var expirationTokenDate = parseInt(window.localStorage.getItem("spo_expirationTokenDate"));
    
    var currentTime = (new Date()).getTime();
    if(currentTime < expirationTokenDate) {
      this.spotify.setToken(accessToken);
    }

    if(this.spotify.hasToken()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}