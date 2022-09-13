import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DigitalizationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  UploadDocument(file: File) {
    let fileToUpload = <File>file;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http.post(
      this.baseUrl +
        `RawDocument/UploadRawDocument?AgenceCode=029&AccountingDay=20200706`,
      formData
    );
  }
}
