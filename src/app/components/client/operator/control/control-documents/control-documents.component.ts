import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { map } from 'rxjs/operators';
import { IRawDocument } from 'src/app/models/rawDocument';
import { ControlService } from 'src/app/services/control.service';
import { RawDocumentService } from 'src/app/services/raw-document.service';

const DOCUMENT_TYPES: any = {
  NotRecognized: 0,
  Check: 1,
  Withdrawal: 2,
  CashPayment: 3,
  CheckRemittanceSlip: 4,
  PaymentOrder: 5,
  Various: 6,
};

@Component({
  selector: 'app-control-documents',
  templateUrl: './control-documents.component.html',
  styleUrls: ['./control-documents.component.css'],
})
export class ControlDocumentsComponent implements OnInit {
  loading: boolean = false;
  rawDocuments: IRawDocument[] = [];
  currentDocument: IRawDocument;
  currentIndex: number = 0;

  displayModalValidate: boolean;
  displayModalReject: boolean;
  displayModalSkip: boolean;
  displayModalRetype: boolean;

  //Checkboxs
  fieldNumber: string = '';
  clientSignatureValues: string[] = [];
  bankStampValues: string[] = [];

  documentType : string ;
  currentEmail:any;

  constructor(
    private rawDocumentService: RawDocumentService,
    private controlService: ControlService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentEmail=localStorage.getItem('email');
    this.route.queryParams.subscribe((params) => {
      this.documentType = params.documentType
      this.getAllDocuments(params.documentType);
    });
  }

  getAllDocuments(documentType: string) {
    this.loading = true;
    this.rawDocumentService
      .GetAllRawDocuments()
      .pipe(
        map((rawDocumentList: any) => {
          return rawDocumentList.filter(
            (rawDocument: any) =>
              (rawDocument.state === 1 ||
              rawDocument.state === 3) &&
                (rawDocument.documentType === DOCUMENT_TYPES[documentType])
          );
        })
      )
      .subscribe((res) => {
        this.rawDocuments = res;
        this.loading = false;
        this.fetchDocuments(this.currentIndex);
      });
  }

  onControlDocument(
    documentId: string,
    fieldNumber: string,
    clientSignature: string,
    bankStamp: string,
    state: string
  ) {
    this.loading = true;
    
    this.controlService
      .controlDocument(documentId, fieldNumber, clientSignature, bankStamp,this.currentEmail)
      .subscribe(
        (res) => {
          this.loading = false;
          this.toastr.success('Chéque est validé');
        },
        (error) => {
          this.loading = false;
          this.toastr.error("Une erreur s'est produite. Veuillez réessayer");
          console.error(error);
        }
      );
  }

  fetchDocuments(index: number) {
    this.currentDocument = this.rawDocuments[index];
  }

  concatToOneString(list: any) {
    let concatString = '';
    for (let i = 0; i < list.length; i++) {
      let samauraiPlus = '';

      if (i === 0) {
        samauraiPlus = '';
      } else {
        samauraiPlus = ', ';
      }

      concatString = concatString.concat(`${samauraiPlus}`, list[i]);
    }
    return concatString;
  }

  onSubmit() {
    let clientSignatureFinalValue = this.concatToOneString(
      this.clientSignatureValues
    );

    let bankStampFinalValue = this.concatToOneString(
      this.bankStampValues
    );

    this.onControlDocument(
      this.currentDocument.id,
      this.fieldNumber,
      clientSignatureFinalValue,
      bankStampFinalValue,
      'ValidatedByOperator'
    );
    console.log(
      this.fieldNumber,
      clientSignatureFinalValue,
      bankStampFinalValue);
    this.clearForm();
    this.currentIndex += 1;
    this.fetchDocuments(this.currentIndex);
    this.displayModalValidate=false;
  }

  skip() {
    if (this.currentIndex === this.rawDocuments.length - 1) {
      this.currentIndex = 0;
    }
    this.currentIndex += 1;
    this.fetchDocuments(this.currentIndex);
  }

  clearForm() {
    this.fieldNumber = '';
    this.clientSignatureValues = [];
    this.bankStampValues = [];
  }

  showModalDialogValidate() {
    this.displayModalValidate = true;
  }
  showModalDialogReject() {
    this.displayModalReject = true;
  }
  showModalDialogSkip() {
    this.displayModalSkip = true;
  }
  showModalDialogRetype() {
    this.displayModalRetype = true;
  }

  retypeDocument() {
    this.loading = true;
    this.controlService.retypeDocument(this.currentDocument.id).subscribe(
      (res) => {
        this.loading = false;
        this.toastr.success('Document est retypé');
        this.currentIndex += 1;
        this.fetchDocuments(this.currentIndex);
      },
      (error) => {
        this.loading = false;
        this.toastr.error("Une erreur s'est produite. Veuillez réessayer");
        console.error(error);
        this.currentIndex += 1;
        this.fetchDocuments(this.currentIndex);
      }
    );
  }

  rejectDocument() {
    this.loading = true;
    this.controlService.rejectDocument(this.currentDocument.id).subscribe(
      (res) => {
        this.loading = false;
        this.toastr.success('Document est rejeté');
        this.currentIndex += 1;
        this.fetchDocuments(this.currentIndex);
      },
      (error) => {
        this.loading = false;
        this.toastr.error("Une erreur s'est produite. Veuillez réessayer");
        console.error(error);
        this.currentIndex += 1;
        this.fetchDocuments(this.currentIndex);
      }
    );
  }
}
