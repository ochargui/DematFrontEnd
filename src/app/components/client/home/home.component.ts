import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RawDocumentService } from 'src/app/services/raw-document.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Inputs
  input1 = 160;
  input2 = 35753;
  input3 = 11473;
  input4 = 24280;

  //subjectBehavior
  stats = new BehaviorSubject<any | null>(null);

  constructor(private rawDocumentService: RawDocumentService) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats() {
    this.rawDocumentService
      .GetAllRawDocuments()
      .pipe(
        map((rawDocumentlist: any) => {
          let checkValidate = rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.documentType === 1 && rawDocument.state === 2
          );
          let checkRejected = rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.documentType === 1 && rawDocument.state === 7
          );
          let withdrawlValidate = rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.documentType === 2 && rawDocument.state === 2
          );
          let withdrawlReject = rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.documentType === 2 && rawDocument.state === 7
          );
          let cashPaymentValidate = rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.documentType === 3 && rawDocument.state === 2
          );
          let cashPaymentReject = rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.documentType === 3 && rawDocument.state === 7
          );
          let checkRemittanceSlipValidate = rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.documentType === 4 && rawDocument.state === 2
          );
          let checkRemittanceSlipReject = rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.documentType === 4 && rawDocument.state === 7
          );
          let paymentOrderValidate = rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.documentType === 5 && rawDocument.state === 2
          );
          let paymentOrderReject = rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.documentType === 5 && rawDocument.state === 7
          );
          let totalDocumentsValidate =
            checkValidate.length +
            withdrawlValidate.length +
            cashPaymentValidate.length +
            checkRemittanceSlipValidate.length +
            paymentOrderValidate.length;
          let totalDocumentsReject =
            checkRejected.length +
            withdrawlReject.length +
            cashPaymentReject.length +
            checkRemittanceSlipReject.length +
            paymentOrderReject.length;
          let totalDocument_valid_invalid=totalDocumentsValidate+totalDocumentsReject
          return {
            checkValidate: checkValidate.length,
            checkRejected: checkRejected.length,
            withdrawlValidate: withdrawlValidate.length,
            withdrawlReject: withdrawlReject.length,
            cashPaymentValidate: cashPaymentValidate.length,
            cashPaymentReject: cashPaymentReject.length,
            checkRemittanceSlipValidate: checkRemittanceSlipValidate.length,
            checkRemittanceSlipReject: checkRemittanceSlipReject.length,
            paymentOrderValidate: paymentOrderValidate.length,
            paymentOrderReject: paymentOrderReject.length,
            totalDocumentsValidate: totalDocumentsValidate,
            totalDocumentsReject: totalDocumentsReject,
            totalDocument_valid_invalid:totalDocument_valid_invalid
          };
        })
      )
      .subscribe((filtredList) => {
        this.stats.next(filtredList);
        console.log(filtredList);
      });
  }
}
