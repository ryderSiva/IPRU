import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-benifit-of-illustrations',
  templateUrl: 'benifit-of-illustrations.html',
})
export class BenifitOfIllustrationsPage {
  policyTerm:any;
  payingTerm:any;
  testVal:any;
  perimum:any;
  allocationCharges:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.perimum = [];
    this.allocationCharges = [];
    this.policyTerm=navParams.data.policyTerm;
    this.payingTerm=navParams.data.payingTerm;
    this.perimum = navParams.data.premiumInput;
    this.allocationCharges = navParams.data.premiumAllocationCharges;

    this.testVal = [];
    console.log("policyTerm"+this.policyTerm)
    var preimumCount = this.policyTerm - this.payingTerm;
    console.log("preimumCount"+preimumCount)
    for(var p=0;p<preimumCount;p++){
       this.perimum.push(0);
       this.allocationCharges.push(0);
    }
    console.log(this.perimum)
    console.log(this.allocationCharges)

    for(var i=0;i<this.policyTerm;i++){
      var params = {'policy':i+1,'perimum':this.perimum[i],'allocationCharges':this.allocationCharges[i],'adminCharges':'test','growth':'test',
                  'loyaltyAddition':'test','wealthBooster':'test','fundValue':'test','partialWithdrawal':'test', 'sumAssured':'test' }
       this.testVal.push(params);
    }
      console.log(this.testVal);

    
    //this.numbers=Array(5).fill(4);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BenifitOfIllustrationsPage');
  }

}
