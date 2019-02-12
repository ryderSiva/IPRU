import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController } from 'ionic-angular';


@Component({
    selector: 'page-irrcalcul-report',
    templateUrl: 'irr-calculations-report.html'
})
export class IRRCalculateReportPage {
    irrCal: any=[];
    constructor(public navParams: NavParams) {
        console.log(navParams.data)
        console.log(navParams.data.irrCal)
        this.irrCal = navParams.data.irrCal;
    }
}