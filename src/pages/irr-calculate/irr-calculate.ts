import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController } from 'ionic-angular';
import { IRRCalculateReportPage } from '../../pages/irr-calculations-report/irr-calculations-report';

@Component({
    selector: 'page-irrcalcul',
    templateUrl: 'irr-calculate.html'
})
export class IRRCalculatePage {
    selectedFrom: any;
    selectedTo: any;
    fromYear: any;
    toYear: any;
    premiumInput:any;
    paidInput:any;
    isReadonly: boolean = true;
    constructor(public alert: AlertController,public nav:NavController) {
        this.selectedFrom = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011',
            '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023',
            '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
        this.selectedTo = [];
        // this.years=[{
        //     key:['0','1','2','3','4','5','6','7','8','9','10','11',
        //          '12','13','14','15','16','17','18','19','20','21',
        //           '22','23','24','25','26','27','28','29','30'],
        //     year:['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011',
        //            '2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023',
        //            '2024','2025','2026','2027','2028','2029','2030']
        // }];

        console.log(this.selectedFrom);

    }

    fromSelect(value) {
        
        console.log(value);
        var index = this.selectedFrom.indexOf(value);
        console.log("index is : " + index);
        this.selectedTo = [];
        for (var i = 0; i < this.selectedFrom.length; i++) {
            if (index < i) {
                this.selectedTo.push(this.selectedFrom[i]);
            }
        }
        console.log(this.selectedTo);
    this.isReadonly = false;
    this.fromYear=value;

    }

    toSelect(value) {
        console.log(value);
        this.toYear=value;

    }

    premiumEnter(e){
       this.premiumInput=e.target.value;
    }

    paidEnter(e){
        this.paidInput=e.target.value;
    }

    alertOpen() {
        let alert = this.alert.create({
            subTitle: "Please Enter Premium,Paid & Select From Year, To year",
            buttons: ['OK']
        });
        alert.present();
    }

    calculate(){
        if(this.premiumInput && this.paidInput && this.fromYear && this.toYear){
        var selectVal = [];
        var irrcalaculations=[];
        for(var i=0;i<this.selectedFrom.length;i++){
            var fidx = this.selectedFrom.indexOf(this.fromYear);
            var tidx = this.selectedFrom.indexOf(this.toYear);
            if(fidx <= i && i <= tidx){
                selectVal.push(this.selectedFrom[i]);
            }
        }

        for(var j=0; j < selectVal.length;j++){
            if(this.paidInput>j){
                var objJson={
                    year:selectVal[j],
                    amount:"-"+this.premiumInput
                }
                irrcalaculations.push(objJson);
            }else{
                var objJson1={
                    year:selectVal[j],
                    amount:0
                }
                irrcalaculations.push(objJson1);
            }
        }
        console.log(selectVal);
        console.log(irrcalaculations);
       
        var obj={'irrCal':irrcalaculations};
        this.nav.push(IRRCalculateReportPage, obj);
            
    }else{
        this.alertOpen();
    }
        
    }
}