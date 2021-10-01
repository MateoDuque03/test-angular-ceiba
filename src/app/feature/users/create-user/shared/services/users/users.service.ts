import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '../../models/user.model';
import axios from 'axios';
/**
 * El nombre de las clases o métodos no se pueden cambiar
 * */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  token: string = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  getUsers() {
    const promise = new Promise<any>((resolve, reject) => {
      this.http
        .get(environment.API.concat('/users'))
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  }

  createUser(user: User) {
    return axios({
      url: environment.API.concat('/users'),
      method: 'POST',
      data: user,
      headers: {
        Authorization: this.token,
      },
    });
  }

  deleteUserForIndex(index: number) {
    return axios({
      url: environment.API.concat(`/users/${index}`),
      method: 'DELETE',
      headers: {
        Authorization: this.token,
      },
    });
  }
}
