import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-benifit-of-illustrations',
  templateUrl: 'benifit-of-illustrations.html',
})
export class BenifitOfIllustrationsPage {
  policyTerm: any;
  payingTerm: any;
  testVal: any;
  perimum: any;
  allocationCharges: any;
  adminCharges: any;
  rateInput: number = 0;
  cumulativePortion: any;
  growth: any;
  fundValue: any;
  sumAssured: any;
  sumAssuredValue: any;
  loyaltyAddition: any;
  wealthBooster: any;
  partialWithdrawal: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.perimum = [];
    this.allocationCharges = [];
    this.adminCharges = [];
    this.cumulativePortion = [];
    this.growth = [];
    this.fundValue = [];
    this.sumAssuredValue = [];
    this.loyaltyAddition = [];
    this.wealthBooster = [];
    this.partialWithdrawal = [];

    this.policyTerm = navParams.data.policyTerm;
    this.payingTerm = navParams.data.payingTerm;
    this.perimum = navParams.data.premiumInput;
    this.allocationCharges = navParams.data.premiumAllocationCharges;
    this.adminCharges = navParams.data.adminCharges;
    this.rateInput = navParams.data.rateInput;
    this.sumAssured = navParams.data.sumAssured;
    this.loyaltyAddition = navParams.data.loyaltyAddition;
    this.wealthBooster = navParams.data.wealthBooster;
    this.partialWithdrawal = navParams.data.partialWithdrawal;


    this.testVal = [];
    console.log("policyTerm" + this.policyTerm)
    var preimumCount = this.policyTerm - this.payingTerm;
    console.log("preimumCount" + preimumCount)

    for (var p = 0; p < preimumCount; p++) {
      this.perimum.push(0);
      this.allocationCharges.push(0);
      this.loyaltyAddition.push(0);
      this.wealthBooster.push(0);
      this.partialWithdrawal.push(0);

    }

    var cumulative: number = 0;
    var growthCal: number = 0;
    var fval: number = 0;
    var sumAssuredCal = 0;
    for (var c = 0; c < this.perimum.length; c++) {
      cumulative = this.getCumulative(this.perimum[c], this.allocationCharges[c], this.adminCharges[c], c);
      growthCal = this.getGrowth(cumulative, Number(this.rateInput));
      fval = this.getFundValue(cumulative, growthCal);
      sumAssuredCal = this.getSumAssured(fval, this.sumAssured);

    }

    console.log(this.perimum)
    console.log(this.allocationCharges)
    console.log(this.adminCharges)
    console.log(this.cumulativePortion)
    console.log(this.growth)
    console.log(this.fundValue)
    console.log(this.sumAssuredValue)



    for (var i = 0; i < this.policyTerm; i++) {
      var params = {
        'policy': i + 1,
        'perimum': this.perimum[i],
        'allocationCharges': this.allocationCharges[i],
        'adminCharges': this.adminCharges[i],
        'cumulativePortion': this.cumulativePortion[i],
        'growth': this.growth[i],
        'loyaltyAddition': this.loyaltyAddition[i],
        'wealthBooster': this.wealthBooster[i],
        'fundValue': this.fundValue[i],
        'partialWithdrawal': this.partialWithdrawal[i],
        'sumAssured': this.sumAssuredValue[i]
      }
      this.testVal.push(params);
    }
    console.log(this.testVal);


    //this.numbers=Array(5).fill(4);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BenifitOfIllustrationsPage');
  }

  getCumulative(perimum, allocationCharges, adminCharges, index) {
    var result = 0;
    var fund = 0;
    if (perimum == 0 && allocationCharges == 0) {
      fund = this.fundValue[index - 1];
      result = Math.round(fund - adminCharges);
      this.cumulativePortion.push(result);
    }
    else {

      result = Math.round(perimum - Math.round(allocationCharges + adminCharges));
      this.cumulativePortion.push(result);

    }

    return result;
  }
  getGrowth(cumulative, rateInput) {
    var result = 0;

    result = cumulative * (rateInput /100);
    console.log(rateInput /100);
    console.log(result);

    this.growth.push(result);
    return result;

  }
  getFundValue(cumulative, growthCal) {
    var result = 0;
    result = Math.round(cumulative + growthCal);
    this.fundValue.push(result);
    return result;

  }
  getSumAssured(fval, sumAssured) {
    var result = 0;
    result = Math.round(fval + sumAssured);
    this.sumAssuredValue.push(result);
    return result;
  }
}
