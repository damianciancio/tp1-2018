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
  inputSearch= "";
  
  constructor(private spotifyService: SpotifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var component = this;
    this.spotifyService.getUserTracks().subscribe(
      function(data: any) { 
        console.log(data);
        component.songs = data.items.map((i) => return i.track);
      });
  }

  search() {
    var searchTerm = this.inputSearch;
    var component = this;

    if (searchTerm) {
      this.spotifyService.searchSong(searchTerm).subscribe(function(data){
        console.log(data.tracks.items);
        component.songs = data.tracks.items;
      });
    }
  }

}
