import { Component, OnInit } from '@angular/core';
import { RawDocumentService } from 'src/app/services/raw-document.service';
import { map } from 'rxjs/operators';
import { TypingService } from 'src/app/services/typing.service';
import { IRawDocument } from 'src/app/models/rawDocument';
import { Stopwatch } from 'ts-stopwatch';

@Component({
  selector: 'app-manual-typing',
  templateUrl: './manual-typing.component.html',
  styleUrls: ['./manual-typing.component.css'],
})
export class ManualTypingComponent implements OnInit {
  displayModal: boolean;
  rawDocuments: IRawDocument[];
  currentDocument: IRawDocument;

  documentTypeChosen: string;

  currentIndex: number = 0;

  loading: boolean = false;

  stopwatch = new Stopwatch();

  constructor(
    private rawDocumentService: RawDocumentService,
    private typingService: TypingService
  ) {}

  ngOnInit(): void {
    this.getAllRawDocuments();
  }

  manualTyping(documentType: string) {
    this.typingService.ManualTyping(this.currentDocument.id, documentType);
  }

  getAllRawDocuments() {
    this.loading = true;
    this.rawDocumentService
      .GetAllRawDocuments()
      .pipe(
        map((rawDocumentlist: any) => {
          return rawDocumentlist.filter(
            (rawDocument: any) =>
              rawDocument.state === 3 
          );
        })
      )
      .subscribe((filtredList) => {
        this.rawDocuments = filtredList;
        this.loading = false;
        this.fetchDocument(this.currentIndex);
      });
  }

  fetchDocument(index: number) {
    this.currentDocument = this.rawDocuments[index];
    console.log(
      'this is the current document',
      this.currentDocument.documentPicture.url
    );
  }

  showModalDialog(value: string) {
    this.displayModal = true;
    this.documentTypeChosen = value;
  }

  confirm() {
    this.displayModal = false;
    this.manualTyping(this.documentTypeChosen);
    this.currentIndex += 1;
    this.fetchDocument(this.currentIndex);
  }

  start() {
    console.log(this.stopwatch.start());
  }

  end() {
    this.stopwatch.stop();
  }

  reset() {
    this.stopwatch.reset();
  }
  show() {
    console.log(this.stopwatch.getTime());
  }
}
