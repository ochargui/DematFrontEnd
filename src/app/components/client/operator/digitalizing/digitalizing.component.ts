import { Component, OnInit } from '@angular/core';
import { DigitalizationService } from 'src/app/services/digitalization.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-digitalizing',
  templateUrl: './digitalizing.component.html',
  styleUrls: ['./digitalizing.component.css'],
})
export class DigitalizingComponent implements OnInit {
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  value: number = 0;
  totalFiles: number;
  justUploadedFile: number = 0;
  files: any[] = [];

  constructor(private digitalizationService: DigitalizationService) {}

  ngOnInit(): void {}

  // On file Select
  onChange(event: any) {
    this.loading = true;
    let amountAddedForProgressBar = 100;
    this.totalFiles = event.target.files.length;
    amountAddedForProgressBar = amountAddedForProgressBar / this.totalFiles;
    for (let i = 0; i < event.target.files.length; i++) {
      this.digitalizationService
        .UploadDocument(event.target.files[i])
        .subscribe(
          (res) => {
            if (event.target.files[i].type === 'application/pdf') {
              this.files.push({
                name: event.target.files[i].name,
                type: event.target.files[i].type,
                size: event.target.files[i].size,
                state: 'invalid',
              });
            } else {
              this.files.push({
                name: event.target.files[i].name,
                type: event.target.files[i].type,
                size: event.target.files[i].size,
                state: 'valid',
              });
            }

            this.value += amountAddedForProgressBar;
            this.justUploadedFile += 1;

            if (this.justUploadedFile === this.totalFiles) {
              this.loading = false;
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Le processus du chargemenet est terminé',
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonColor: '#1a33d5',
              });
            }
          },
          (error) => {
            console.log('an error occured ', error);
          }
        );
    }
  }
}
