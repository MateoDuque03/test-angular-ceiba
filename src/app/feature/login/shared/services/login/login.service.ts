import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { LoginInfo, LoginResponse } from '../../models/login.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  /**
   * El nombre de este metodo no debería ser cambiado, pero de ser necesario podrías cambiar la firma
   * */
  public login(userForm: LoginInfo) {
    const promise = axios.post<LoginResponse>(environment.API.concat('/login'), userForm);
    return promise.then((res) => res.data);
  }
}
