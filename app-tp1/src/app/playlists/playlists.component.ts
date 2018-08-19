import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists:any;
  constructor(
    private spotifyService : SpotifyService
  ) { }

  @Output() selectedPlaylist = new EventEmitter();


  ngOnInit() {
    
    var that = this;
    this.playlists = this.spotifyService.getUserPlaylists().subscribe(
      function(data: any) { 
        that.playlists = data.items;
      }
    );
  }

  select(playlist) {
    if(playlist) {
      this.selectedPlaylist.emit(playlist);
    }
  }
}
