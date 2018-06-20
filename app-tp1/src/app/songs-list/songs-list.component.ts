import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsList implements OnInit {

  songs = [];
  recommendations: any[];
  
  constructor(private spotifyService: SpotifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var component = this;
    this.spotifyService.getUserTracks().subscribe(
      function(data: any) { 
        console.log(data);
        console.log(JSON.stringify(data));
        component.songs = data;
      });
  }

}
