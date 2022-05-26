import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/User';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface AccessInterface {
  sub: string;
  privileges: string[];
  iss: string;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  userPrivileges = {
    hasList: false,
    hasCreate: false,
    hasModify: false,
    hasDelete: false,
  }
  token: string;
  user = new User();
  redirectUrl: string;
  authUrl = 'http://localhost:8080';
  helper
  
  constructor(private http: HttpClient) {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.isLoggedIn = true;
    }
    this.helper = new JwtHelperService();
    this.setPrivileges()
  }

  async setPrivileges() {

    if (localStorage.getItem("user") !== null) {
      this.user = JSON.parse(localStorage.getItem("user")!)


      if (this.user.privileges.filter(privilege => privilege === "LIST").length !== 0) {
        this.userPrivileges.hasList = true;
      }
      if (this.user.privileges.filter(privilege => privilege === "CREATE").length !== 0) {
        this.userPrivileges.hasCreate = true;
      }
      if (this.user.privileges.filter(privilege => privilege === "MODIFY").length !== 0) {
        this.userPrivileges.hasModify = true;
      }
      if (this.user.privileges.filter(privilege => privilege === "DELETE").length !== 0) {
        this.userPrivileges.hasDelete = true;
      }
    }
  }

  async getDecodedAccessToken<AccessInterface>(token: string) {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  async login(username: string, password: string): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      console.log("login", formData);

      const loginResponse = await firstValueFrom(this.http
        .post<LoginResponse>(`${this.authUrl}/login`, formData));
      console.log("login");
      console.log(this.user, username);
      console.log(loginResponse);

      this.user.username = username;
      this.token = loginResponse.access_token;
      this.isLoggedIn = true;
      window.localStorage.setItem('token', this.token);
      window.localStorage.setItem('refresh_token', loginResponse.refresh_token)

      const decodedToken = this.helper.decodeToken(loginResponse.access_token);

      console.log("decoded",decodedToken);
      
      const user = await firstValueFrom(this.http
        .get<User>(`${this.authUrl}/user/name/${decodedToken.sub}`));

      this.user.fullName = user.fullName;
      this.user.username = decodedToken.sub;
      this.user.privileges = decodedToken.privileges;

      window.localStorage.setItem("user", JSON.stringify(this.user))

      console.log(this.user);
      console.log(this.user.privileges);
      
      await this.setPrivileges()

    } catch (e) {
      console.log(e);
      return Promise.reject();
    }

  }

  async register(username: string, password: string, fullName: string, privilegesId: number[]): Promise<void> {
    try {
      console.log(privilegesId);

      const loginResponse = await firstValueFrom(this.http
        .post(`${this.authUrl}/user`, {
          username,
          password,
          fullName,
          privilegesId
        }));

      await this.login(username, password)
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  }

  async logout(): Promise<void> {
    //await firstValueFrom(this.http.post(`${this.authUrl}/logout`, {}));
    this.isLoggedIn = false;
    this.token = "";
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    this.redirectUrl = "";
    this.userPrivileges.hasCreate = false;
    this.userPrivileges.hasDelete = false;
    this.userPrivileges.hasList = false;
    this.userPrivileges.hasModify = false;
  }

}