import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInfo } from '../shared/models/login.model';
import { LoginService } from '../shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  singupForm: FormGroup;
  error: string = '';
  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    const token = localStorage.getItem('token');
    if (token) this.redirectUsers();
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectUsers(): void {
    this.router.navigateByUrl('/users/list');
  }

  initializeForm(): void {
    this.singupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }

  async login(userForm: LoginInfo) {
    try {
      if (this.singupForm.invalid) {
        return;
      }
      const res = await this.loginService.login(userForm);
      localStorage.setItem('token', res.token);
      this.redirectUsers();
    } catch (err) {
      let { error } = err.response.data;
      this.error = error;
    }
  }
}
