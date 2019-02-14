import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController } from 'ionic-angular';
import { Finance } from 'financejs';

@Component({
    selector: 'page-irrcalcul-report',
    templateUrl: 'irr-calculations-report.html'
})
export class IRRCalculateReportPage {
    irrCal: any=[];
    listAmount:any;
    percentageAmount:any=0;
    
    constructor(public navParams: NavParams) {
        var finance=new Finance();
        
        //console.log(Math.round(finance.IRR(-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,1808000)));

      
        console.log(navParams.data);
        console.log(navParams.data.irrCal);
        this.irrCal = navParams.data.irrCal;
        this.listAmount="";
        for(var i=0;i<this.irrCal.length;i++){
            if(this.irrCal[i].amount != 0){
                
                this.listAmount += this.irrCal[i].amount + ',';
                

            }
        }
        var percentage = this.listAmount.substr(0, this.listAmount.length-1);
        console.log(percentage);
   //npm install financejs --save
        
        
        //console.log(Math.round(finance.IRR(-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,1808000)));
        //this.percentageAmount = Math.round(finance.IRR(-51000,-51000,-51000,-51000,-51000,-51000,-51000,-51000,105555));

        console.log(this.percentageAmount);
    }
}