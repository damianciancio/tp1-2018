import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
declare var $ :any;
declare var bootbox: any;
@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetails implements OnInit {

  	track = null;
  	constructor(
		private route: ActivatedRoute, 
		private spotifyService: SpotifyService,
		private title: Title,
		private sanitizer: DomSanitizer,
  	) { }

  ngOnInit() {
  	var component = this;
		this.spotifyService.getTrack(this.route.snapshot.params.id).subscribe(
			function(data) {
				component.track = data;
				component.title.setTitle(component.track.name);
				console.log(data);
			}
		);
  }

  	getSanitizeUrl(url){
  		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
	
	openPlaylistsModal() {
		this.spotifyService.userData
		$('#playlists-add-song').modal('show');
	}

	addSongToPlaylist(track, playlist) {
		
		this.spotifyService.addSongToPlaylist(track, playlist).subscribe(function(data:any){
		console.log(data);
			if (data.hasOwnProperty('snapshot_id')) {
				playlist.hideButton = true;	
			}
		});
	}

}
