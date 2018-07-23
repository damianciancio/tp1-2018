import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SpotifyService } from './spotify/spotify.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( 
    private route: ActivatedRoute,
    private title: Title,
    private spotify: SpotifyService ){
  }

  ngOnInit() {
    

  }
}
