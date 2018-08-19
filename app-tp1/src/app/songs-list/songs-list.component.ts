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
  searchTerm = "";
  
  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data.title);
    var component = this;
    this.spotifyService.getUserTracks(this.limit, this.currentOffset).subscribe(
      function(data: any) {
        component.songs = data.items.map((i) => { 
          return i.track
        });
      }
    );
  }

  onScroll(){
    var component = this;
    this.currentOffset = this.currentOffset + this.limit;
    if(this.searchTerm){  
      if (this.searchTerm) {
        this.spotifyService.searchSong(this.searchTerm, this.currentOffset, this.limit).subscribe(function(data: any){
          component.songs = data.tracks.items;
          console.log(component.songs);
        });
      }  
    } else {
      this.spotifyService.getUserTracks(this.limit, this.currentOffset).subscribe(
        function(data:any) {
          var newSongs = data.items.map((i) => { 
            return i.track
          });
          Array.prototype.push.apply(component.songs, newSongs);        
        }
      )
  }
    
  }
  search() {
    this.searchTerm = this.inputSearch;
    var component = this;
    this.currentOffset = 0;

    if (this.searchTerm) {
      this.spotifyService.searchSong(this.searchTerm, this.currentOffset, this.limit).subscribe(function(data: any){
        component.songs = data.tracks.items;
      });
    }
  }

}
