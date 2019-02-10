import { Component } from '@angular/core';
import { NavController, Platform ,AlertController} from 'ionic-angular';
import { PensionCalculatePage } from '../../pages/pension-calculate/pension-calculate';
@Component({
    selector: 'page-calcul',
    templateUrl: 'calculator.html'
})
export class CalculatorPage {
    pensionAmount:any;
    constructor(public navCtrl:NavController,public alert: AlertController) {

    }
    pensionEnter(e){
        this.pensionAmount=e.target.value;
        console.log(this.pensionAmount);
    }

    calculate() {
        console.log(this.pensionAmount);
        if(this.pensionAmount != undefined && this.pensionAmount!=""){
        var amount=this.pensionAmount / 12;
        console.log(amount);
        var pensionValues={pensionAmount:amount}
        this.navCtrl.push(PensionCalculatePage,pensionValues);
        }else{
            let alert = this.alert.create({
                subTitle: "Please Enter the Pension Amount",
                buttons: ['OK']
              });
              alert.present();
        }
    }
}