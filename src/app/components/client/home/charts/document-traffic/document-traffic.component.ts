import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-traffic',
  templateUrl: './document-traffic.component.html',
  styleUrls: ['./document-traffic.component.css']
})

export class DocumentTrafficComponent implements OnInit {  
  @Input() input1 : any;
  @Input() input2 : any;
  @Input() input3 : any;
  @Input() input4 : any;
  constructor() { }

  ngOnInit(): void {
  }

}
