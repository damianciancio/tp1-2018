import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class SpotifyService {

  constructor(private http: HttpClient, private router: Router) { }
  
  CLIENT_ID = "183ad72f43544e0a82a2c5bb211d8c87";
  CLIENT_SECRET = "2a1f492a810b4311b0eb11433571d2e2";
  REDIRECT_URI = "http://localhost:4200/auth-callback";
  SCOPES = "user-top-read user-library-read";
  BASE_API = "https://api.spotify.com/";
  BASE_API_ACCOUNT = "https://accounts.spotify.com/";  
  access_token = "BQD-3LJdJYSUdZLTe90tqVDh059KoGFQUiNGDl_kx49U2CPqpGbDtjOsdfxY-THIRPqTH16qTyLifKLERCnKVbZpy1J5HI3D2D4ijoij9RYv75zeqPGiSoE-QYnxvNToVRlVDiC3lenqODJ_LBDbvfsnopoI";
  token_type = null;
  expires_in = null;
  refresh_token = null;
  scope = null;
  
  setToken(token: string) {
    this.access_token = token;
  }

  updateAccessToken(code: string) {
    var headerHttp = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + 
         btoa(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
      });

    var params = new HttpParams().set(
      'code', code).set(
      'grant_type','authorization_code').set(
      'redirect_uri',this.REDIRECT_URI);

    var options = {
      headers: headerHttp      
    }
    var service = this;
    this.http.post("/spotify/api/token", params.toString(), options).subscribe(function(data: any){
      service.access_token = data.access_token;
      service.token_type = data.token_type;
      service.expires_in = data.expires_in;
      service.refresh_token = data.refresh_token;
      service.scope = data.scope;
      service.router.navigate(['/songs'])
    });
  }

  authorize() {
      window.location.assign(this.BASE_API_ACCOUNT 
        + "authorize?client_id=" + this.CLIENT_ID 
        + "&response_type=code"+
        "&scope="+this.SCOPES +
        "&redirect_uri="+ this.REDIRECT_URI);
  }

  getFromSpotify(relativeUrl, options) {
    options.headers = new HttpHeaders().set('Authorization','Bearer ' + this.access_token);
    return this.http.get(this.BASE_API+relativeUrl, options);
  }

  getRecomendations() {
    return this.getFromSpotify("v1/recomendations",{});
  }

  getNewReleases() {
    return this.getFromSpotify("v1/browse/new-releases/",{
      params: new HttpParams().set('country','AR')
    });
  }

  getUserTracks() {
    return this.getFromSpotify("v1/me/tracks ",{});
  }

  getUserTop() {
    return this.getFromSpotify("v1/me/top/tracks",{});
  }
}
