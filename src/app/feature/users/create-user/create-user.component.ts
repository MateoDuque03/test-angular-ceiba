import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './shared/services/users/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private userService: UsersService,
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectToListUsers(): void {
    this.router.navigateByUrl('/users/list');
  }

  initializeForm(): void {
    this.createUserForm = this.fb.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
    });
  }

  createUser(user): void {
    this.redirectToListUsers();
    this.userService
      .createUser(user)
      .then((res) => {
        alert(`Created User: ${res.data.name}`);
      })
      .catch((err) => {
        let { error } = err.response.data;
        console.error(error);
      });
  }
}
