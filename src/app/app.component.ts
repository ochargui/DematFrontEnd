import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'demat-client';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.authService.currentRole$.subscribe((res) => {
      console.log('this is the role:', res);
    });
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.loadCurrentUser(token).subscribe(
        (res) => {
          console.log('user loades', res);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
