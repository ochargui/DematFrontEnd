import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  currentRole: any;
  currentUserDisplayName: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentRole$.subscribe((res) => {
      this.currentRole = res;
    });
  }
}
