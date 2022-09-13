import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() currentRole: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  logout() {
    this.authService.logout();
  }
}
