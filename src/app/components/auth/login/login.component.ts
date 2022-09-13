import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  //Loding variables
  loginLoader: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.authService.triggerLoginLoading$.subscribe((status) => {
      this.loginLoader = status;
    });
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
      Password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value);
  }
}
