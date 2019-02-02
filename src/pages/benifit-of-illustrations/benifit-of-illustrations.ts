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
  loyaltyInput: any;
  preimumCount: any;
  wealthBoosterInput: any;
  partialInput: any;
  preimumTotal: any;
  allocationChargesToal: any;
  adminChargesTotal: any;
  loyaltyAdditionTotal: any;
  wealthBoosterTotal: any;
  partialWithdrawalTotal: any;
  fundValueTotal:any;
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
    this.wealthBoosterInput = navParams.data.wealthBooster;
    this.partialWithdrawal = navParams.data.partialWithdrawal;
    this.loyaltyInput = navParams.data.loyaltyInput;
    this.partialInput = navParams.data.partialInput;


    this.testVal = [];
    console.log("policyTerm" + this.policyTerm)
    this.preimumCount = this.policyTerm - this.payingTerm;
    console.log("preimumCount" + this.preimumCount)

    for (var p = 0; p < this.preimumCount; p++) {
      this.perimum.push(0);
      this.allocationCharges.push(0);

    }

    var cumulative: number = 0;
    var growthCal: number = 0;
    var fval: number = 0;
    var sumAssuredCal = 0;
    var loyaltyCal = 0;
    var wealth = 0;
    var partial = 0;
    for (var c = 0; c < this.perimum.length; c++) {
      cumulative = this.getCumulative(this.perimum[c], this.allocationCharges[c], this.adminCharges[c], c);
      growthCal = this.getGrowth(cumulative, Number(this.rateInput));

      if (c == 0 || c == 1 || c == 2 || c == 3 || c == 4) {
        console.log("payingTerm" + this.payingTerm + "index" + c);
        fval = this.getFundValue(cumulative, growthCal);

      } else {
        loyaltyCal = this.getLoyalty(cumulative, growthCal, c);
        fval = this.getFundValues(cumulative, growthCal, loyaltyCal);
        partial = this.getPartial(fval);

      }
      sumAssuredCal = this.getSumAssured(this.sumAssured);
      wealth = this.getWealthBooster(cumulative, growthCal, c);

    }

    console.log(this.perimum)
    console.log(this.allocationCharges)
    console.log(this.adminCharges)
    console.log(this.cumulativePortion)
    console.log(this.growth)
    console.log(this.fundValue)
    console.log(this.sumAssuredValue)
    console.log(this.loyaltyAddition)
    console.log(this.partialWithdrawal)

    this.preimumTotal = 0;
    for (var ix = 0; ix < this.perimum.length; ix++) {
      this.preimumTotal = this.preimumTotal + this.perimum[ix];
    }
    console.log("preimumTotal" + this.preimumTotal)

    this.allocationChargesToal = 0;
    for (var iy = 0; iy < this.allocationCharges.length; iy++) {
      this.allocationChargesToal = this.allocationChargesToal + this.allocationCharges[iy];
    }
    console.log("allocationChargesToal" + this.allocationChargesToal)

    this.adminChargesTotal = 0;
    for (var iz = 0; iz < this.adminCharges.length; iz++) {
      this.adminChargesTotal = this.adminChargesTotal + this.adminCharges[iz];
    }
    console.log("adminChargesTotal" + this.adminChargesTotal)

    this.loyaltyAdditionTotal = 0;
    for (var ia = 0; ia < this.loyaltyAddition.length; ia++) {
      if (this.loyaltyAddition[ia] !== "N/A") {
        this.loyaltyAdditionTotal = this.loyaltyAdditionTotal + this.loyaltyAddition[ia];
      }

    }
    console.log("loyaltyAdditionTotal" + this.loyaltyAdditionTotal)

   

    this.wealthBoosterTotal = 0;
    for (var ib = 0; ib < this.wealthBooster.length; ib++) {
      if (this.wealthBooster[ib] !== "N/A") {
        this.wealthBoosterTotal = this.wealthBoosterTotal + this.wealthBooster[ib];
      }

    }
    console.log("wealthBoosterTotal" + this.wealthBoosterTotal)

    this.partialWithdrawalTotal = 0;
    for (var ic = 0; ic < this.partialWithdrawal.length; ic++) {
      if (this.partialWithdrawal[ic] !== "N/A") {
        this.partialWithdrawalTotal = this.partialWithdrawalTotal + this.partialWithdrawal[ic];
      }

    }
    console.log("partialWithdrawalTotal" + this.partialWithdrawalTotal)


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
    var sfund = 0;
    if (index == 0) {
      result = Math.round(perimum - Math.round(allocationCharges + adminCharges));
      this.cumulativePortion.push(result);
    }
    else {
      if (perimum == 0 && allocationCharges == 0) {
        fund = this.fundValue[index - 1];
        result = Math.round(fund - adminCharges);
        this.cumulativePortion.push(result);
      }
      else {

        sfund = Math.round(perimum - Math.round(allocationCharges + adminCharges));
        result = Math.round(sfund + this.fundValue[index - 1]);
        this.cumulativePortion.push(result);

      }
    }
    return result;
  }
  getGrowth(cumulative, rateInput) {
    var result = 0;

    result = Math.round(cumulative * (rateInput / 100));
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
  getFundValues(cumulative, growthCal, loyaltyCal) {
    var result = 0;
    result = Math.round(cumulative + growthCal + loyaltyCal);
    this.fundValue.push(result);
    return result;
  }

  getSumAssured(sumAssured) {
    var result = 0;
    result = sumAssured;
    this.sumAssuredValue.push(result);
    return result;
  }
  getLoyalty(cumulative, growthCal, index) {
    console.log("getLoyalty" + this.loyaltyInput);
    var loyal = 0;
    if (this.loyaltyInput == "0.10%") {
      loyal = 0.001;
    } else {
      if (index == 5 || index == 6) {
        loyal = 0.0015;
      } else {
        loyal = 0.003;
      }

    }
    console.log(loyal)
    var result = 0;
    result = Math.round((cumulative + growthCal) * loyal);
    this.loyaltyAddition.push(result);
    console.log("getLoyalty" + result)
    return result;

  }
  getWealthBooster(cumulative, growthCal, index) {
    var result = 0;
    if (index == 9 || index == 14 || index == 19 || index == 24 || index == 29) {
      result = Math.round((cumulative + growthCal) * this.wealthBoosterInput / 100);
      this.wealthBooster.push(result);

    } else {
      this.wealthBooster.push("N/A");
    }
    console.log("wealthBooster" + result)
    return result;
  }
  getPartial(fval) {
    var result = 0;

    if (this.partialInput == 0) {
      result = 0;
      this.partialWithdrawal.push(result);
    } else {
      result = Math.round(fval * (this.partialInput / 100));
      this.partialWithdrawal.push(result);
    }
    return result;
  }
}
