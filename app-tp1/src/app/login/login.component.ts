import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private title: Title) {
    
  }

  ngOnInit() {

    this.title.setTitle(this.route.snapshot.data.title);

    var code = this.route.snapshot.queryParams['code'];
    if(code) {
      this.spotifyService.updateAccessToken(code);
    } else {
      this.spotifyService.authorize();
    }
  }

}
