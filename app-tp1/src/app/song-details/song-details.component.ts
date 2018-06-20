import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetails implements OnInit {

  song: any;
  constructor() { }

  ngOnInit() {
  }

}
