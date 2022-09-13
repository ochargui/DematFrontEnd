import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  @Input() currentRole: any;
  @Input() currentUserDisplayName: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  checkIfTheItemExistsInTheArray(item: any) {
    const index = this.currentRole.findIndex((element: any) => {
      if (element.includes(item)) {
        return true;
      }
      return false;
    });
    return index;
  }
}
