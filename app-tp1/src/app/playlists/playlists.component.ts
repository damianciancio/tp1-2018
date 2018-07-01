import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists:any;
  constructor(private spotifyService : SpotifyService) { }

  @Input() song:any;


  ngOnInit() {
    var that = this;
    this.playlists = this.spotifyService.getUserPlaylists().subscribe(
      function(data: any) { 
        that.playlists = data.items;
        console.log(data);
      }
    );
  }

  select(playlist) {
    if(this.song && playlist) {
      this.spotifyService.addSongToPlaylist(this.song, playlist).subscribe(function(data){
        if (data.hasOwnProperty('snapshot_id')) {
          alert('Canción agregada correctamente');
        }
      });
    }
  }
}
