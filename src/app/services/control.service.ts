import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  controlDocument(
    documentId: string,
    fieldNumber: string,
    clientSignature: string,
    bankStamp: string,
    email:any
  ) {
    return this.http.post(
      this.baseUrl +
        `RawDocument/ControlDocument?documentId=${documentId}&fieldNumber=${fieldNumber}&clientSignature=${clientSignature}&bankStamp=${bankStamp}&email=${email}`,
      {}
    );
  }

  retypeDocument(documentId: string) {
    return this.http.post(
      this.baseUrl + `RawDocument/RetypeDocument?documentId=${documentId}`,
      ''
    );
  }
  rejectDocument(documentId: string) {
    return this.http.post(
      this.baseUrl + `RawDocument/RejectDocument?documentId=${documentId}`,
      ''
    );
  }

  GetAllControl() {
    return this.http.get(this.baseUrl + `Control/GetAllContols`);
  }
  DeleteControl(controlId: string) {
    return this.http.delete(
      this.baseUrl + `Control/DeleteControl?controlId=${controlId}`
    );
  }
  createControl(
    fieldNumberScore: string,
    clientSignatureScore: string,
    bankStampScore: string,
    scoreLimit: string,
    name: string
  ) {
    return this.http.post(
      this.baseUrl +
        `Control/CreateControl?FieldNumberScore=${fieldNumberScore}&ClientSignatureScore=${clientSignatureScore}&BankStampScore=${bankStampScore}$&ScoreLimit=${scoreLimit}&Name=${name}`,
      ''
    );
  }
}
