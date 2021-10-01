import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../create-user/shared/models/user.model';
import { UsersService } from '../create-user/shared/services/users/users.service';
@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  listUser: UserInfo[] = [];
  searchText: string = '';
  constructor(private router: Router, private userService: UsersService) {}

  ngOnInit() {
    this.getInfoUsers();
  }

  async getInfoUsers() {
    try {
      const res = await this.userService.getUsers();
      const users: UserInfo[] = res.data;
      this.listUser = users;
    } catch (err) {
      let { error } = err.response.data;
      console.error(error);
    }
  }

  deleteUser(id, name) {
    this.userService
      .deleteUserForIndex(id)
      .then(() => {
        alert(`Deleted user: ${name}`);
        this.router.navigateByUrl('users/list');
      })
      .catch((err) => {
        let { error } = err.response.data;
        console.error(error);
      });
  }
}
