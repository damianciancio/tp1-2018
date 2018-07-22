import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsList implements OnInit {

  songs = [];
  recommendations: any[];
  inputSearch= "";
  currentOffset = 0;
  limit = 20;
  
  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data.title);
    var component = this;
    this.spotifyService.getUserTracks(this.limit, this.currentOffset).subscribe(
      function(data: any) { 
        console.log(data);
        component.songs = data.items.map((i) => { 
          return i.track
        });
      });

      this.spotifyService.getUserPlaylists().subscribe(
        function(data: any){
          console.log(data);
        }
      );
  }

  onScroll(){
    var component = this;
    this.currentOffset = this.currentOffset + this.limit;
    this.spotifyService.getUserTracks(this.limit, this.currentOffset).subscribe(
      function(data:any) {
        console.log(data);
        var newSongs = data.items.map((i) => { 
          return i.track
        });
        Array.prototype.push.apply(component.songs, newSongs);        
      }
    )
  }
  search() {
    var searchTerm = this.inputSearch;
    var component = this;

    if (searchTerm) {
      this.spotifyService.searchSong(searchTerm).subscribe(function(data: any){
        console.log(data.tracks.items);
        component.songs = data.tracks.items;
      });
    }
  }

}
