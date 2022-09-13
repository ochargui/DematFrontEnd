import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IControl } from 'src/app/models/control';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-ponderation',
  templateUrl: './ponderation.component.html',
  styleUrls: ['./ponderation.component.css'],
})
export class PonderationComponent implements OnInit {
  //Dialog
  itemAddDialog: boolean;
  itemUpdateDialog: boolean;
  itemDeleteDialog: boolean;
  items: IControl[];
  item: any;
  selectedItems: any[];
  selectedItem: any;
  //Loding variables
  getMyJobLoader: boolean;

  submitted: boolean;
  itemsFormGroup: FormGroup;
  updateItemsFormGroup: FormGroup;

  fieldNumberScore: any;
  clientSignatureScore: any;
  bankStampScore: any;
  scoreLimit: any;
  namePonderation: any;
   //Select document type options
   documentTypes: any[]=[];
   selectedDocumentTypes:any;
   itemSelectTypeDocumentDialog:boolean;
 

  constructor(
    private controlService: ControlService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllControls();
    this.documentTypes = [
      {name: 'Check',code:'chéque'}    
  ];

  }

  getAllControls() {
    this.controlService.GetAllControl().subscribe((res: any) => {
      this.items = res;
    });
  }

  openNew() {
    this.item = {};
    this.submitted = false;
    this.itemAddDialog = true;
  }
  deleteItem() {
    this.controlService.DeleteControl(this.selectedItem.id).subscribe(
      () => {
        this.toastr.success('Pondération a été suprimé avec succès');
        this.getAllControls();
        this.itemDeleteDialog = false;
      },
      (error) => {
        this.toastr.error('Une erreur est produite');
        console.log(error);
        this.itemDeleteDialog = false;
      }
    );
  }
  deleteSelectedItems() {}

  selectDelete(item: any) {
    this.itemDeleteDialog = true;
    this.selectedItem = item;
  }
  hideDialog() {
    this.itemAddDialog = false;
    this.submitted = false;
  }
  editItems() {
    this.controlService.createControl(
      this.fieldNumberScore,
      this.clientSignatureScore,
      this.bankStampScore,
      this.scoreLimit,
      this.selectedItem.name
    ).subscribe(
      () => {
        this.toastr.success('pondération a été modifié avec succès');
        this.getAllControls();
        this.itemUpdateDialog = false;
      },
      (error) => {
        this.toastr.error('Une erreur  est produite');
        console.log(error);
        this.itemUpdateDialog = false;
      }
    );
  }
  selectEdit(item: any) {
    this.itemUpdateDialog = true;
    this.selectedItem = item;
  }
  checkFormValidationChamp(){}
  checkFormValidationClientSignature(){}
  checkFormValidationbankStamp(){}
  savePonderation(){}
}
