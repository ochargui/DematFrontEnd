import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-reset-email',
  templateUrl: './send-reset-email.component.html',
  styleUrls: ['./send-reset-email.component.css'],
})
export class SendResetEmailComponent implements OnInit {
  sendResetEmailForm: FormGroup;
  emailSent: string = 'still';
  isLoading: boolean = false;
  captcha: string;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.captcha = '';
  }

  ngOnInit(): void {
    this.createSendResetEmailForm();
  }

  createSendResetEmailForm() {
    this.sendResetEmailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.authService
      .SendResetEmail(this.sendResetEmailForm.value.email)
      .subscribe(
        () => {
          this.isLoading = false;
          localStorage.setItem('email', this.sendResetEmailForm.value.email);
          this.emailSent = 'sent';
          console.log(this.emailSent);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Le mail a été envoyé avec succès',
            showCloseButton: true,
            showConfirmButton: true,
          });
        },
        (error) => {
          this.isLoading = false;
          this.emailSent = 'still';
          console.error(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'oups quelque chose s est mal passé, veuillez réessayer',
            showCloseButton: true,
            showConfirmButton: true,
          });
        }
      );
  }

  resolved(response: any) {
    this.captcha = response;
  }
}
