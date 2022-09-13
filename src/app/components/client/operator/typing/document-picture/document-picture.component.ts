import { Component, Input, OnInit } from '@angular/core';
import { IRawDocument } from '../../../../../models/rawDocument';

@Component({
  selector: 'app-document-picture',
  templateUrl: './document-picture.component.html',
  styleUrls: ['./document-picture.component.css'],
})
export class DocumentPictureComponent implements OnInit {
  @Input() rawDocuments: IRawDocument[];
  @Input() currentDocument: IRawDocument;
  @Input() currentIndex: number;

  constructor() {}

  ngOnInit(): void {}
}
