import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  message: string;

  get username(): AbstractControl {
    return this.form.get('username')!;
  }
  get password(): AbstractControl {
    return this.form.get('password')!;
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    try {
      console.log(0);
      
      await this.authService.login(this.username.value, this.password.value);
      console.log(this.password.value);
      
      if (this.authService.redirectUrl) {
        console.log(1);
        this.router.navigate([this.authService.redirectUrl]);
        
      } else {
        console.log(2);
        this.router.navigate(['/contacts']);
      }
    } catch (e) {
      this.message = 'Cannot log in!';
    }
  }
}