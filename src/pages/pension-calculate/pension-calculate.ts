import { Component } from '@angular/core';
import { NavController, Platform, NavParams,LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as html2canvas from 'html2canvas';
pdfMake.vfs=pdfFonts.pdfMake.vfs;
@Component({
    selector: 'page-pensioncalcul',
    templateUrl: 'pension-calculate.html'
})
export class PensionCalculatePage {
    pensionAmount:any;
    penionValues:any=[];
    months:any=[];
    pensionAmountTotal:any;
    pdfObj=null;
    loader:any;
    constructor(public loadingController:LoadingController,
        public platform:Platform,
        public navCtrl: NavController,
        public navParams: NavParams,private fileOpener: FileOpener,private file: File) {
        this.pensionAmount = navParams.data.pensionAmount.toFixed(2);
        
        console.log(this.pensionAmount);

        this.months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
        this.pensionAmountTotal = 0;
        for (var i = 1; i <= 12; i++) {
            var params = {
              'serial': i ,
              'month': this.months[i-1],
              'pensionAmount': this.pensionAmount,              
            }
            
            this.penionValues.push(params);
          }
          var total=this.pensionAmount * 12;
          this.pensionAmountTotal=Math.round(total);
          console.log(this.pensionAmountTotal);

          console.log(this.penionValues);


    }

    downloadPdf(){
        console.log("pdf")
       
          this.loader = this.loadingController.create({content:'Please wait...'})
          this.loader.present();
      
          const div = document.getElementById("tableCont");
          console.log(div.clientHeight);
          console.log(div.clientWidth);
          const options = {background:"white",height :div.clientHeight , width :div.clientWidth };
          html2canvas(div,options).then((canvas)=>{
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    height:600,
                    width :500 ,
                    
                   
                }],
                
            };
            this.pdfObj =pdfMake.createPdf(docDefinition);
            if(this.platform.is('cordova')){
              this.pdfObj.getBuffer((buffer)=>{
                var utf8=new Uint8Array(buffer);
                var binaryArray=utf8.buffer;
                var blob=new Blob([binaryArray],{type:'application/pdf'});
                this.file.writeFile(this.file.dataDirectory,'Pension.pdf',blob,{replace:true}).then(fileEntry=>{
                  this.loader.dismiss();
                  this.fileOpener.open(this.file.dataDirectory+'Pension.pdf','application/pdf');
                })
              });
             }else{
              this.loader.dismiss();
               this.pdfObj.download();
             }
          });
       
        
        
      }
}