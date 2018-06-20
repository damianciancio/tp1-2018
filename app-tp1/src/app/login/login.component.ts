import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService,
  private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    var code = this.route.snapshot.queryParams['code'];
    if(code) {
      this.spotifyService.updateAccessToken(code);
    } else {
      this.spotifyService.authorize();
    }
  }

}
