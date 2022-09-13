import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

import { generator } from 'ts-password-generator';
import { ToastrService } from 'ngx-toastr';

import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
})
export class AdministrationComponent implements OnInit {
  //Dialog
  itemAddDialog: boolean;
  itemUpdateDialog: boolean;
  itemDeleteDialog: boolean;
  itemAffectRoleDialog: boolean;
  displayUnassign: boolean;

  items: any[] = [];
  item: any;
  selectedItems: any[];
  selectedItem: any;

  submitted: boolean;
  itemsFormGroup: FormGroup;
  updateItemsFormGroup: FormGroup;

  generatedPassword: string;

  //Loding variables
  getMyJobLoader: boolean;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  //Select Role options
  roles: any[] = [];
  selectedRole: any;
  selectedRoleCreateUser: string[];

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.getAllUsers();
    this.roles = [
      { name: 'Agent-typage', code: 'Agent de typage' },
      { name: 'Controleur-multi-type', code: 'Agent de contrôle' },
      { name: 'Agent-numerisation', code: 'Agent de numérisation' },
    ];
  }

  generatePassword() {
    this.generatedPassword =
      generator({
        haveNumbers: true,
        isUppercase: true,
        charsQty: 10,
        haveSymbols: true,
      }) + '@5aE';
  }

  getAllUsers = async () => {
    this.items = [];
    this.userService.getUsers().subscribe((users) => {
      let roleMetaData: any[] = [];
      users.forEach(async (user: any) => {
        await this.userService
          .getUserByRole(user.email)
          .subscribe((res: any) => {
            res.forEach((role: any) => {
              roleMetaData.push({
                label: role,
                icon: 'pi pi-times',
                command: () => this.showUnassign(role),
                isAdmin: role === 'Super-utilisateur',
              });
            });
            this.items.push({
              ...user,
              role: roleMetaData,
            });
            roleMetaData = [];
            console.log(this.items);
          });
      });
    });
  };

  updateSelectedUser(item: any) {
    this.selectedItem = item;
  }

  showUnassign(role: any) {
    this.displayUnassign = true;
    this.selectedRole = role;
  }

  unassignRoleUser() {
    if (this.selectedItem.role.length > 1) {
      this.userService
        .unassignRoleUser(this.selectedItem.email, this.selectedRole)
        .subscribe(
          () => {
            this.toastr.success('le rôle a été désactivé avec succès');
            this.displayUnassign = false;
            this.getAllUsers();
          },
          () => {
            this.toastr.error(
              'Quelque chose s est mal passé ! réessayer plus tard !'
            );
            this.displayUnassign = false;
          }
        );
    } else {
      this.toastr.error(
        'Operation echouée ! Il faut au moins un accès par utilisateur!'
      );
      this.displayUnassign = false;
    }
  }

  openNew() {
    this.item = {};
    this.submitted = false;
    this.itemAddDialog = true;
  }

  deleteSelectedItems() {
    this.getAllUsers();
  }

  selectEdit(item: any) {
    this.itemUpdateDialog = true;
    this.selectedItem = item;
    this.createUpdateUserForm();
    this.loadData(this.selectedItem);
  }

  selectDelete(item: any) {
    this.itemDeleteDialog = true;
    this.selectedItem = item;
  }

  editItem() {
    this.userService
      .UpdateUser(
        this.updateItemsFormGroup.get('firstname')?.value,
        this.updateItemsFormGroup.get('lastname')?.value,
        this.updateItemsFormGroup.get('email')?.value,
        this.updateItemsFormGroup.get('phonenumber')?.value.e164Number,
        this.selectedItem.email
      )
      .subscribe(
        () => {
          this.toastr.success('Utilisateur a été modifié avec succès');
          this.getAllUsers();
          this.itemUpdateDialog = false;
        },
        (error) => {
          this.toastr.error('Une erreur s est produite');
          console.log(error);
          this.itemUpdateDialog = false;
        }
      );
  }

  deleteItem() {
    this.userService.DeleteUser(this.selectedItem.email).subscribe(
      () => {
        this.toastr.success('Utilisateur a été ajouté avec succès');
        this.getAllUsers();
        this.itemDeleteDialog = false;
      },
      (error) => {
        this.toastr.error('Une erreur s est produite');
        console.log(error);
        this.itemDeleteDialog = false;
      }
    );
  }

  viewItemDetailed(item: any) {}

  createUserForm() {
    this.generatePassword();
    this.itemsFormGroup = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      phonenumber: [null],
      password: [this.generatedPassword, Validators.required],
      roles: [null],
    });
  }

  createUpdateUserForm() {
    this.updateItemsFormGroup = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      phonenumber: [null],
    });
  }

  loadData(item: any) {
    this.updateItemsFormGroup?.get('firstname')?.patchValue(item.firstName);
    this.updateItemsFormGroup?.get('lastname')?.patchValue(item.lastName);
    this.updateItemsFormGroup?.get('email')?.patchValue(item.email);
    this.updateItemsFormGroup?.get('phonenumber')?.patchValue(item.phoneNumber);
  }

  hideDialog() {
    this.itemAddDialog = false;
    this.submitted = false;
  }

  checkFormValidationFirstname() {
    if (
      this.itemsFormGroup.get('firstname')?.invalid &&
      this.itemsFormGroup.get('firstname')?.touched &&
      this.itemsFormGroup.get('firstname')?.errors?.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationLastName() {
    if (
      this.itemsFormGroup.get('lastname')?.invalid &&
      this.itemsFormGroup.get('lastname')?.touched &&
      this.itemsFormGroup.get('lastname')?.errors?.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationEmail() {
    if (
      this.itemsFormGroup.get('email')?.invalid &&
      this.itemsFormGroup.get('email')?.touched &&
      this.itemsFormGroup.get('email')?.errors?.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationPhonenumber() {
    if (
      this.itemsFormGroup.get('phonenumber')?.invalid &&
      this.itemsFormGroup.get('phonenumber')?.touched &&
      this.itemsFormGroup.get('phonenumber')?.errors?.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  resetForm() {
    this.itemsFormGroup.reset();
  }

  saveUser() {
    let rolesList: string[] = [];
    this.itemsFormGroup.get('roles')?.value.forEach((role: any) => {
      rolesList.push(role.name);
    });
    console.log(rolesList);
    this.userService
      .RegisterUser(
        this.itemsFormGroup.get('firstname')?.value,
        this.itemsFormGroup.get('lastname')?.value,
        this.itemsFormGroup.get('email')?.value,
        this.itemsFormGroup.get('phonenumber')?.value.e164Number,
        this.itemsFormGroup.get('password')?.value,
        rolesList
      )
      .subscribe(
        () => {
          this.toastr.success('Utilisateur a été ajouté avec succès');
          this.getAllUsers();
          this.resetForm();
          this.createUserForm();
          this.hideDialog();
        },
        (error) => {
          this.toastr.error('Une erreur s est produite');
          console.log(error);
        }
      );
  }

  selectAffectRole(item: any) {
    this.selectedItem = item;
    this.itemAffectRoleDialog = true;
  }

  affectRole() {
    this.userService
      .affectRoleUser(this.selectedItem.email, this.selectedRole.name)
      .subscribe(
        () => {
          this.toastr.success('Role a été affecté avec succès');
          this.getAllUsers();
        },
        (error) => {
          this.toastr.error('Une erreur s est produite');
          console.log(error);
        }
      );
  }
}
