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
    if(this.spotify.hasToken()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}