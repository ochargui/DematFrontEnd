import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() currentRole:string;
  @Input() currentUserDisplayName:string;
  constructor() { }

  ngOnInit(): void {
    console.log("gggggggggg",this.currentUserDisplayName);
  }
  Toggle(toggleId: any, navId: any, bodyId: any, headerId: any) {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);
    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      // show navbar
      nav.classList.toggle('show');
      // change icon
      toggle.classList.toggle('bx-x');
      // add padding to body
      bodypd.classList.toggle('body-pd');
      // add padding to header
      headerpd.classList.toggle('body-pd');
    }
  }

}
