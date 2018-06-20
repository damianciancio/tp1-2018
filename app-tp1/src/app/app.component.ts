import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  constructor( 
    private route: ActivatedRoute){
  }

  ngOnInit() {
    // this.route.params.subscribe((data) =>
    //  console.log(data)
    // );

  }
}
