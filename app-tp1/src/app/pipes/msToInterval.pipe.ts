import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'msToInterval'})
export class MsToInterval implements PipeTransform {
  transform(value: number): string {
  	let totalSeconds = Math.trunc(value / 1000);
  	let restantMiliseconds = value - totalSeconds* 100;
  	let minutes = Math.trunc(totalSeconds / 60);
  	let restantSeconds = totalSeconds - minutes * 60;

	let secondsString = restantSeconds.toString();
  	console.log("restantSeconds:", restantSeconds);
  	if (restantSeconds < 10) {
		secondsString = "" + "0" + restantSeconds.toString();
  	}

  	console.log("value:", value);
  	console.log("totalSeconds:", totalSeconds);
  	console.log("restantMiliseconds:", restantMiliseconds);
  	console.log("minutes:", minutes);
  	return minutes.toString() + ":" + secondsString; 
  }
}