import { Component, Input, OnInit } from '@angular/core';
import { IRawDocument } from 'src/app/models/rawDocument';

@Component({
  selector: 'app-control-document-picture',
  templateUrl: './control-document-picture.component.html',
  styleUrls: ['./control-document-picture.component.css'],
})
export class ControlDocumentPictureComponent implements OnInit {
  @Input() rawDocuments: IRawDocument[];
  @Input() currentDocument: IRawDocument;
  @Input() currentIndex: number;
  
  constructor() {}

  ngOnInit() {}
}
