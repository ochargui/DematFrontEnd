import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.css']
})
export class ControlMenuComponent implements OnInit {

  displayModal: boolean;
  chosenType:string;
  chosenTypeTranslated:string;

  constructor(private router:Router) {}

  ngOnInit(): void {}

  showModalDialog(value:string) {
    this.chosenType=value;
    this.displayModal = true;
    if(this.chosenType==="Check"){
      this.chosenTypeTranslated="chéque"
    }
    if(this.chosenType==="CashPayment"){
      this.chosenTypeTranslated="Versement espéce"
    }
    if(this.chosenType==="PaymentOrder"){
      this.chosenTypeTranslated="Ordre de virement"
    }
    if(this.chosenType==="Withdrawal"){
      this.chosenTypeTranslated="Retrait"
    }
    if(this.chosenType==="CheckRemittanceSlip"){
      this.chosenTypeTranslated="Bordereau remise de chéque"
    }
  }
  
  confirm(){
    this.router.navigateByUrl(`/client/operator/control/document?documentType=${this.chosenType}`);

  }
}
