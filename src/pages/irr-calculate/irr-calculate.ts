import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController } from 'ionic-angular';


@Component({
    selector: 'page-irrcalcul',
    templateUrl: 'irr-calculate.html'
})
export class IRRCalculatePage {
    years:any;
    fromYear:any;
    toYear:any;
    constructor(public alert:AlertController) {
    this.years=['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011',
    '2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023',
    '2024','2025','2026','2027','2028','2029','2030'];
    // this.years=[{
    //     key:['0','1','2','3','4','5','6','7','8','9','10','11',
    //          '12','13','14','15','16','17','18','19','20','21',
    //           '22','23','24','25','26','27','28','29','30'],
    //     year:['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011',
    //            '2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023',
    //            '2024','2025','2026','2027','2028','2029','2030']
    // }];

    console.log(this.years);

    }

    fromSelect(value){
        console.log(value);
        if(value != this.toYear){

        }else{
           
        }
        
    }

    toSelect(value){
        console.log(value);
        if(value != this.fromYear){

        }else{
           
        }
    }

    alertOpen(){
         let alert = this.alert.create({
            subTitle: "Please Enter Premium above or equal 50000",
            buttons: ['OK']
          });
          alert.present();
    }
}