import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { BenifitOfIllustrationsPage } from '../../pages/benifit-of-illustrations/benifit-of-illustrations';
import { HomePage } from '../../pages/home/home';
@Component({
  selector: 'page-elitelifesuper',
  templateUrl: 'elite_life_super.html'
})
export class EliteLifeSuperPage {
  premiumInput: any;
  sumAssured: any;
  premiumSelected: any;
  payingTermSelected: any;
  isReadonly: boolean = true;
  premiumAllocationCharges: any;
  adminCharges: any = "1-5(1.14%) Thereafter(2.40%)";
  wealthBooster: any;
  policyTerm: any;
  loyaltyAdditions: any;
  lifeTimeClassic: any = [];
  policyTermSelected: any;
  rateInput: any;
  partialInput:any;
  
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform,public alert: AlertController) {
  }
  ionViewDidLoad() {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }
  premiumEnter(e) {
    this.premiumInput = e.target.value;
    console.log(this.premiumInput);
    this.calSumAssured();
  }
  premiumSelect(value) {
    console.log(value);
    this.premiumSelected = value;
    this.calSumAssured();
    this.calPremiumCharges(this.premiumSelected, this.payingTermSelected)

  }

  calSumAssured() {
    var sumAssured = this.premiumInput * this.premiumSelected * 10;
    if (sumAssured) {
      this.sumAssured = sumAssured;
    } else {
      this.sumAssured = "";
    }
  }

  payingTermSelect(value) {
    this.payingTermSelected = value;
    this.calPremiumCharges(this.premiumSelected, this.payingTermSelected);
    this.calWealthBooster(this.payingTermSelected);
    this.calLoyaltyAddition(this.payingTermSelected);

  }

  calPremiumCharges(premium = '', term = '') {
    if (premium == '12' || premium == '2') {
      if (term == '5') {
        this.premiumAllocationCharges = "1 (6%)  2 - 3 (5%)  4 (4.5%)  5 (4%)";
      } else if (term == '7') {
        this.premiumAllocationCharges = "1 (6%)  2 - 3 (5%)  4 (4.5%)  5 (4%)  6 - 7 (4%)";
      } else if (term == '10') {
        this.premiumAllocationCharges = "1 (6%)  2 - 3 (5%)  4 (4.5%)  5 (4%)  6 - 7 (4%)  7 > (2%)"
      }
    } else {
      if (term == '5') {
        this.premiumAllocationCharges = "6%";
      } else if (term == '7') {
        this.premiumAllocationCharges = "1 - 5 (6%)  6 - 7 (4%)";
      } else if (term == '10') {
        this.premiumAllocationCharges = "1 - 5 (6%)  6 - 7 (4%)  7 > (2%)"
      }
    }
  }

  policyTermSelect(value) {
    this.policyTermSelected = value;
    //this.policyTerm=value;
    //this.calWealthBooster(this.payingTermSelected,this.policyTerm);

  }

  rateEnter(e) {
    this.rateInput = e.target.value;
    console.log(this.rateInput);
  }

  calWealthBooster(term) {
    console.log(term);
    if (term == '10') {
      this.wealthBooster = 2;
    } else {
      this.wealthBooster = 1;
    }

  }

  calLoyaltyAddition(value) {
    if (value == '5') {
      this.loyaltyAdditions = "6 & 7 (0.10%)  8>= (0.10%)";
    } else if(value == 7){
      this.loyaltyAdditions = "6 & 7 (0.20%)  8>= (0.35%)";
    }else if(value == 10){
      this.loyaltyAdditions = "6 & 7 (0.15%)  8>= (0.30%)";
    }

  }

  partialEnter(e) {
    this.partialInput = e.target.value;
    console.log(this.partialInput);
  }


  calculate() {
    if(this.premiumSelected == 12 && this.premiumInput < 16668){
      let alert = this.alert.create({
        subTitle: "Please Enter Premium above 16,668",
        buttons: ['OK']
      });
      alert.present();

      this.premiumInput ='';
      return false;
     }
     if(this.premiumSelected == 2 && this.premiumInput < 100000){
      let alert = this.alert.create({
        subTitle: "Please Enter Premium above 1,00,000",
        buttons: ['OK']
      });
      alert.present();

      this.premiumInput ='';
     return false;
     
    }
    if(this.premiumSelected == 1 && this.premiumInput < 200000){
      let alert = this.alert.create({
        subTitle: "Please Enter Premium above 2,00,000",
        buttons: ['OK']
      });
      alert.present();

      this.premiumInput ='';
       return false;   
    }
    
    
     
    console.log("calculate");
    console.log(this.premiumInput)
    var paying = [];
    var allocationCharges = [];
    var adminChargesCal = [];
    var loyaltyAddition = [];
    var partialWithdrawal = [];
    var payingCal = this.premiumInput * this.premiumSelected;

    //paying,partialWithdrawal
    for (var i = 0; i < this.payingTermSelected; i++) {
      paying.push(payingCal);
    }

    //loyaltyAddition,partialWithdrawal
    for (var l = 0; l < 5; l++) {
      loyaltyAddition.push("N/A");
      partialWithdrawal.push("N/A");
    }

    //allocationCharges
    if (this.premiumAllocationCharges == "6%") {
      allocationCharges = [];
      console.log("premiumAllocationCharges" + this.premiumAllocationCharges)
      var allocationChargesCal = Math.round(payingCal * 0.06);
      for (var a = 0; a < this.payingTermSelected; a++) {
        allocationCharges.push(allocationChargesCal);
      }
    }

    if (this.premiumAllocationCharges == "1 - 5 (6%)  6 - 7 (4%)") {
      console.log("premiumAllocationCharges" + this.premiumAllocationCharges)
      allocationCharges = [];
      for (var b = 0; b < this.payingTermSelected; b++) {
        if (b < 5) {
          var allocationChargesCal = Math.round(payingCal * 0.06);
          allocationCharges.push(allocationChargesCal);
        }
        else if (b >= 5) {
          var allocationChargesCal = Math.round(payingCal * 0.04);
          allocationCharges.push(allocationChargesCal);

        }
      }
    }

    if (this.premiumAllocationCharges == "1 - 5 (6%)  6 - 7 (4%)  7 > (2%)") {
      console.log("premiumAllocationCharges" + this.premiumAllocationCharges)
      allocationCharges = [];
      for (var b = 0; b < this.payingTermSelected; b++) {
        if (b < 5) {
          var allocationChargesCal = Math.round(payingCal * 0.06);
          allocationCharges.push(allocationChargesCal);
        }
        else if (b >= 5 && b < 7) {
          var allocationChargesCal = Math.round(payingCal * 0.04);
          allocationCharges.push(allocationChargesCal);

        }
        else if (b >= 7) {
          var allocationChargesCal = Math.round(payingCal * 0.02);
          allocationCharges.push(allocationChargesCal);

        }

      }
    }

    if (this.premiumAllocationCharges == "1 (6%)  2 - 3 (5%)  4 (4.5%)  5 (4%)") {
      console.log("premiumAllocationCharges" + this.premiumAllocationCharges)
      allocationCharges = [];
      for (var c = 0; c < this.payingTermSelected; c++) {
        if (c == 0) {
          var allocationChargesCal = Math.round(payingCal * 0.06);
          allocationCharges.push(allocationChargesCal);
        }
        else if (c == 1 || c == 2) {
          var allocationChargesCal = Math.round(payingCal * 0.05);
          allocationCharges.push(allocationChargesCal);

        }
        else if (c == 3) {
          var allocationChargesCal = Math.round(payingCal * 0.045);
          allocationCharges.push(allocationChargesCal);

        }
        else if (c == 4) {
          var allocationChargesCal = Math.round(payingCal * 0.04);
          allocationCharges.push(allocationChargesCal);

        }


      }
    }

    if (this.premiumAllocationCharges == "1 (6%)  2 - 3 (5%)  4 (4.5%)  5 (4%)  6 - 7 (4%)") {
      console.log("premiumAllocationCharges" + this.premiumAllocationCharges)
      allocationCharges = [];
      for (var d = 0; d < this.payingTermSelected; d++) {
        if (d == 0) {
          var allocationChargesCal = Math.round(payingCal * 0.06);
          allocationCharges.push(allocationChargesCal);
        }
        else if (d == 1 || d == 2) {
          var allocationChargesCal = Math.round(payingCal * 0.05);
          allocationCharges.push(allocationChargesCal);

        }
        else if (d == 3) {
          var allocationChargesCal = Math.round(payingCal * 0.045);
          allocationCharges.push(allocationChargesCal);

        }
        else if (d > 3) {
          var allocationChargesCal = Math.round(payingCal * 0.04);
          allocationCharges.push(allocationChargesCal);

        }

      }
    }

    if (this.premiumAllocationCharges == "1 (6%)  2 - 3 (5%)  4 (4.5%)  5 (4%)  6 - 7 (4%)  7 > (2%)") {
      console.log("premiumAllocationCharges" + this.premiumAllocationCharges)
      allocationCharges = [];
      for (var e = 0; e < this.payingTermSelected; e++) {
        if (e == 0) {
          var allocationChargesCal = Math.round(payingCal * 0.06);
          allocationCharges.push(allocationChargesCal);
        }
        else if (e == 1 || e == 2) {
          var allocationChargesCal = Math.round(payingCal * 0.05);
          allocationCharges.push(allocationChargesCal);

        }
        else if (e == 3) {
          var allocationChargesCal = Math.round(payingCal * 0.045);
          allocationCharges.push(allocationChargesCal);

        }
        else if (e > 3 && e < 7) {
          var allocationChargesCal = Math.round(payingCal * 0.04);
          allocationCharges.push(allocationChargesCal);

        }
        else if (e >= 7) {
          var allocationChargesCal = Math.round(payingCal * 0.02);
          allocationCharges.push(allocationChargesCal);

        }


      }
    }

    //adminCharges
    for (var f = 0; f < this.policyTermSelected; f++) {
      if (f < 5) {
        var acharges = Math.round(payingCal * 0.0114);
        adminChargesCal.push(acharges);
      } else {
        var acharges = Math.round(payingCal * 0.024);
        adminChargesCal.push(acharges);
      }
    }

    console.log("payingTermSelected" + this.payingTermSelected);
    console.log("policyTermSelected" + this.policyTermSelected);
    console.log("rateInput" + this.rateInput);
    console.log("sumAssured" + this.sumAssured);

    console.log(paying);
    console.log(allocationCharges);
    console.log(adminChargesCal)
    console.log(loyaltyAddition);
    console.log(this.wealthBooster);
    console.log(partialWithdrawal)
    console.log(this.premiumSelected)
   
    if (allocationCharges.length > 0 && this.premiumSelected !== undefined && this.policyTermSelected !== 0 && this.rateInput !== "" && this.rateInput !== undefined && this.premiumInput !=="" && this.premiumInput !==undefined) {
      this.lifeTimeClassic = {
        'payingTerm': this.payingTermSelected,
        'policyTerm': this.policyTermSelected,
        'premiumInput': paying,
        "premiumAllocationCharges": allocationCharges,
        "adminCharges": adminChargesCal,
        "rateInput": this.rateInput,
        "sumAssured": this.sumAssured,
        "loyaltyAddition": loyaltyAddition,
        "loyaltyInput": this.loyaltyAdditions,
        "wealthBooster": this.wealthBooster,
        "partialWithdrawal": partialWithdrawal,
        "partialInput": this.partialInput
      }
      this.navCtrl.push(BenifitOfIllustrationsPage, this.lifeTimeClassic);
    } else {
      let alert = this.alert.create({
        subTitle: "Please Select the Premium, Premium Paying Term, Policy Term and Rate of Return",
        buttons: ['OK']
      });
      alert.present();

    }

  }
}
