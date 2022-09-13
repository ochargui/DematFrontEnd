import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TypingService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  ManualTyping(DocumentId: string, DocumentType: string) {
    return this.http
      .post(
        this.baseUrl +
          `RawDocument/ManualTyping?DocumentId=${DocumentId}&DocumentType=${DocumentType}`,
        {}
      )
      .subscribe((res) => {
        console.log('Document is manually typed succefully', res);
      });
  }
}
