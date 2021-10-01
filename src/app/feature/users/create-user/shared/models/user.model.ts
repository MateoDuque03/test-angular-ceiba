export interface User {
  name: string;
  job: string;
}

export interface UserResponse extends User {
  id: string;
  createAt: string;
}

export interface UserInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
