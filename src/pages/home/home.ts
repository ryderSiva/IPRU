import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  investment:any=2;
  interest:any=2;
  period:any=0;
  compounding:any=2;
  constructor(public navCtrl: NavController) {
  
  }

}
