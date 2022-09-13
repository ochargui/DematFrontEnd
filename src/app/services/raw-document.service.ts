import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RawDocumentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  GetAllRawDocuments() {
    return this.http.get(this.baseUrl + 'RawDocument/GetAllRawDocuments');
  }
}
