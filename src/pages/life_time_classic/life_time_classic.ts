import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-lifetimeclassic',
  templateUrl: 'life_time_classic.html'
})
export class LifeTimeClassicPage {

  premiumInput:any;
  sumAssured:any;
  premiumSelected:any;
  payingTermSelected:any;
  isReadonly:boolean=true;
  premiumAllocationCharges:any;
  adminCharges:any=6000;
  wealthBooster:any;
  policyTerm:any;
  loyaltyAdditions:any;
  constructor(public navCtrl: NavController) {
  
  }
  premiumEnter(value){
   console.log(this.premiumInput);
   this.calSumAssured();
   
   
  }
  premiumSelect(value){
   // console.log(value);
    this.premiumSelected=value;
    this.calSumAssured();
    this.calPremiumCharges(this.premiumSelected,this.payingTermSelected)
    
  }

  calSumAssured(){
   var sumAssured=this.premiumInput*this.premiumSelected*10;
   if(sumAssured){
    this.sumAssured=sumAssured;
   }else{
    this.sumAssured="";
   }
  }

  payingTermSelect(value){
    this.payingTermSelected=value;
    this.calPremiumCharges(this.premiumSelected,this.payingTermSelected);
    this.calWealthBooster(this.payingTermSelected);
    this.calLoyaltyAddition(this.payingTermSelected);
    
  }

  calPremiumCharges(premium='',term=''){
    if(premium=='12' ||premium=='2'){
      if(term=='5'){
        this.premiumAllocationCharges="1 (6%)  2 - 3 (5%)  4 (4.5%)  5 (4%)";
      }else if(term=='7'){
        this.premiumAllocationCharges="1 (6%)  2 - 3 (5%)  4 (4.5%)  5 (4%)  6 - 7 (4%)";
      }else if(term=='10'){
        this.premiumAllocationCharges="1 (6%)  2 - 3 (5%)  4 (4.5%)  5 (4%)  6 - 7 (4%)  7 > (2%)"
      }
    }else{
      if(term=='5'){
        this.premiumAllocationCharges="6%";
      }else if(term=='7'){
        this.premiumAllocationCharges="1 - 5 (6%)  6 - 7 (4%)";
      }else if(term=='10'){
        this.premiumAllocationCharges="1 - 5 (6%)  6 - 7 (4%)  7 > (2%)"
      }
    }
  }

  policyTermSelect(value){
    //this.policyTerm=value;
    //this.calWealthBooster(this.payingTermSelected,this.policyTerm);
    
  }

  calWealthBooster(term){
    console.log(term);
    if(term=='10'){
      this.wealthBooster=2;
    }else{
      this.wealthBooster=1;
    }

  }

  calLoyaltyAddition(value){
    if(value=='5'){
      this.loyaltyAdditions="0.10%";
    }else{
      this.loyaltyAdditions="6 & 7 (0.15%)  8>= (0.30%)";
    }
    
  }
}
