import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/User';

interface LoginResponse {
  access_token : string;
  refresh_token : string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  token: string;
  user = new User();
  redirectUrl: string;
  authUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.isLoggedIn = true;
    }
  }

  async login(username: string, password: string): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      console.log("login",formData);
      
      const loginResponse = await firstValueFrom(this.http
         .post<LoginResponse>(`${this.authUrl}/login`, formData));
         console.log("login");
      console.log(this.user, username);
      console.log(loginResponse);
      
      this.user.username = username;
      this.user.password = password;
      this.token = loginResponse.access_token;
      console.log("login",3);
      this.isLoggedIn = true;
      window.localStorage.setItem('token', this.token);
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
    this.redirectUrl = "";
  }
  
}