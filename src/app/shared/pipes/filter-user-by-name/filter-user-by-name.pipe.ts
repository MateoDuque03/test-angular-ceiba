import { Pipe, PipeTransform } from '@angular/core';
import { UserInfo } from '@feature/users/create-user/shared/models/user.model';

@Pipe({
  name: 'filterUserByName',
})
export class FilterUserByNamePipe implements PipeTransform {
  transform(userList: UserInfo[] = [], searchText = ''): any {
    if (searchText.length > 2) {
      return userList.filter((user) =>
        user.first_name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    return userList;
  }
}
