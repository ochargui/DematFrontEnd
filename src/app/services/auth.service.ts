// env variables

// Rxjs
import { BehaviorSubject } from 'rxjs';

// SwwetAlert imports
import Swal from 'sweetalert2';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  private currentRoleSource = new BehaviorSubject<any[]>([]);
  currentRole$ = this.currentRoleSource.asObservable();

  public triggerLoginLoading$ = new BehaviorSubject<boolean>(false);

  helper = new JwtHelperService();

  // Email of the user who wants to reset his password
  public forgotPasswordEmail = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getCurrentForgetPasswordUserEmail() {
    return this.forgotPasswordEmail.asObservable();
  }

  // Sending email to the user who wants to reset his password
  SendResetEmail(email: string) {
    return this.http.post(
      this.baseUrl + `Account/SendResetPasswordEmail?email=${email}`,
      email
    );
  }

  // Resetting password
  // Applying 2 layers of security : Layer number one : token generated specially for the resetpassword method (asp identity token)
  // Token number two : additonnal hash to make brute force attack more computationally greedy
  ResetPassword(
    email: string,
    newPassword: string,
    identityToken: string,
    secondSecurityLayerToken: string
  ) {
    return this.http
      .post(
        this.baseUrl +
          `Account/ResetPassword?email=${email}&newPassword=${newPassword}&identityToken=${identityToken}&secondSecurityLayerToken=${secondSecurityLayerToken}`,
        ''
      )
      .subscribe(
        (res) => {
          console.log('this is supposed be the response ', res);
          this.router.navigateByUrl('/SinIn');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Le mot passe a été changé avec succés',
            showCloseButton: true,
            showConfirmButton: true,
          });
          localStorage.setItem('email', '');
        },
        (error) => {
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

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUserSource.next(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http
      .get<IUser>(this.baseUrl + 'account/GetCurrentUser', { headers })
      .pipe(
        map((user: IUser) => {
          if (user) {
            const decodedToken = this.helper.decodeToken(user.token);
            localStorage.setItem('token', user.token);
            if (Array.isArray(decodedToken.role)) {
              this.currentUserSource.next({ ...user, role: decodedToken.role[0] });
              this.currentRoleSource.next(decodedToken.role);

            } else {
              this.currentUserSource.next({ ...user, role: decodedToken.role });
              this.currentRoleSource.next([decodedToken.role]);
            }
          }
        })
      );
  }

  login(values: any) {
    this.triggerLoginLoading$.next(true);
    return this.http
      .post<{ token: string; user: IUser }>(
        this.baseUrl + 'account/login',
        values
      )
      .pipe(
        map((user: any) => {
          if (user) {
            const decodedToken = this.helper.decodeToken(user.token);
            localStorage.setItem('token', user.token);
            localStorage.setItem('email',decodedToken.email);
            if (Array.isArray(decodedToken.role)) {
              this.currentUserSource.next({
                ...user,
                role: decodedToken.role[0],
              });
              this.currentRoleSource.next(decodedToken.role);
            } else {
              this.currentUserSource.next({ ...user, role: decodedToken.role });
              this.currentRoleSource.next([decodedToken.role]);
            }
          }
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.currentUser$.subscribe((user) => {
            //user roles redirect
            if (user?.role === 'Controleur-un-type')
              this.router.navigateByUrl('/client/operator/control');
            if (user?.role === 'Super-utilisateur')
              this.router.navigateByUrl('/client/home');
            if (user?.role === 'Agent-numerisation')
              this.router.navigateByUrl('/client/operator/typing');
          });
          this.triggerLoginLoading$.next(false);
        },
        (error) => {
          if (error.error.title.substring(68, 69) === 'Y') {
            let timerInterval: any;
            Swal.fire({
              title: 'Votre compte est temporairement verouillé',
              html: 'Votre compte a été verrouillé après 3 tentatives de connexion. Veuillez patienter <b>1</b> Minute.',
              timer: 60000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const b: any = Swal.getHtmlContainer()?.querySelector('b');
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()?.toString();
                }, 60000);
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer');
              }
            });
          } else {
            this.toastr.error('informations incorrectes.');
          }
          this.triggerLoginLoading$.next(false);
        }
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.currentUserSource.next(null);
    this.currentRoleSource.next([]);
    this.router.navigateByUrl('/');
  }
}
