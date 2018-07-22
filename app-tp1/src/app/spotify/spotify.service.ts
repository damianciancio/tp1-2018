import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable()
export class SpotifyService {

  constructor(private http: HttpClient, private router: Router, private title: Title) {

  }
  
  CLIENT_ID = "183ad72f43544e0a82a2c5bb211d8c87";
  CLIENT_SECRET = "2a1f492a810b4311b0eb11433571d2e2";
  REDIRECT_URI = "http://localhost:4200/auth-callback";
  SCOPES = "user-top-read user-library-read playlist-read-private playlist-modify-public playlist-modify-private";
  BASE_API = "https://api.spotify.com/";
  BASE_API_ACCOUNT = "https://accounts.spotify.com/";  
  access_token = null;
  token_type = null;
  expires_in = null;
  refresh_token = null;
  scope = null;
  userData = null;
  
  setToken(token: string) {
    this.access_token = token;
  }

  hasToken() {
    return this.access_token !=null;  
  }

  updateAccessToken(code: string) {
    var that = this;
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
      
      that.getUserData().subscribe(function(data: any){
        that.userData = data;
      });
      service.router.navigate(['/songs']);
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
  postSpotify(relativeUrl, httpParams) {
    var options = {headers: { }};
    options.headers = new HttpHeaders().set('Authorization','Bearer ' + this.access_token);
    return this.http.post(this.BASE_API+relativeUrl, httpParams, options);
  }

  getRecomendations() {
    return this.getFromSpotify("v1/recomendations",{});
  }

  getNewReleases() {
    return this.getFromSpotify("v1/browse/new-releases/",{
      params: new HttpParams().set('country','AR')
    });
  }

  getUserTracks(limit, offset) {
    // return this.http.get("/assets/songs-fake.json");
    return this.getFromSpotify("v1/me/tracks?limit="+limit+"&offset="+offset,{});
  }

  getUserTop() {
    return this.getFromSpotify("v1/me/top/tracks",{});
  }

  getUserPlaylists() {
    return this.getFromSpotify("v1/me/playlists", {});
  }

  searchSong(searchTerm) {
    return this.getFromSpotify("v1/search", {
      params: new HttpParams().set('q',searchTerm).append('type','track')
    });
  }

  getUserData() {
    return this.getFromSpotify('v1/me', {});
  }

  getTrack(id) {
    return this.getFromSpotify("v1/tracks/"+id, {});
  }

  addSongToPlaylist(song, playlist) {
    var params = {
      uris: [song.uri]
    };
    return this.postSpotify("v1/users/" + this.userData.id + "/playlists/" + playlist.id +  "/tracks", params);
  }
}
