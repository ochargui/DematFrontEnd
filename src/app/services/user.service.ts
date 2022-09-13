import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl + 'account/GetAll');
  }

  RegisterUser(
    firstname: string,
    lastname: string,
    email: string,
    phonenumber: string,
    password: string,
    roles: any
  ) {
    let rolesList: string = '';
    roles.forEach((role: any) => {
      rolesList += role + ',';
    });
    rolesList = rolesList.slice(0, -1);
    return this.http.post(
      this.baseUrl +
        `User/RegisterUser?firstName=${firstname}&lastName=${lastname}&email=${email}&phonenumber=${phonenumber}&password=${password}&roles=${rolesList}`,
      ''
    );
  }

  UpdateUser(
    firstname: string,
    lastname: string,
    email: string,
    phonenumber: string,
    index: string
  ) {
    return this.http.put(
      this.baseUrl +
        `User/UpdateUser?firstName=${firstname}&lastName=${lastname}&email=${email}&phonenumber=${phonenumber}&index=${index}`,
      ''
    );
  }

  DeleteUser(index: string) {
    return this.http.delete(this.baseUrl + `User/DeleteUser?email=${index}`);
  }

  affectRoleUser(email: string, role: string) {
    return this.http.post(
      this.baseUrl + `User/AffectRoleToUser?role=${role}&email=${email}`,
      ''
    );
  }

  unassignRoleUser(email: string, role: string) {
    return this.http.delete(
      this.baseUrl + `User/UnassignRoleToUser?role=${role}&email=${email}`
    );
  }

  getUserByRole(email: string) {
    return this.http
      .get(this.baseUrl + `User/GetUserByRole?email=${email}`)
      .pipe(
        map((roles) => {
          return roles;
        })
      );
  }
}
