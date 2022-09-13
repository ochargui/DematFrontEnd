import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  hex: string;
  token: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.router.url.substring(43);
    this.route.queryParams.subscribe((params) => {
      this.hex = params.hex;
    });
    this.createResetPasswordForm();
  }

  createResetPasswordForm() {
    this.resetPasswordForm = this.fb.group(
      {
        password: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      }
    );
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  getTokens() {
    let digest = sha256('firas.belhiba@esprit.tn');
    return {
      firstToken: this.hex + digest,
      secondToken: this.token,
    };
  }

  onSubmit() {
    console.log(this.resetPasswordForm.value);
    let tokens = this.getTokens();
    console.log(
      tokens.firstToken,
      tokens.secondToken,
      this.resetPasswordForm.value.password
    );
    let email = localStorage.getItem('email')?.toString();
    if (email) {
      this.authService.ResetPassword(
        email,
        this.resetPasswordForm.value.password,
        tokens.secondToken,
        tokens.firstToken
      );
    }
  }
}
