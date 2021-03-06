import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/User';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contacts-ui';

  user = new User()

  public isMenuCollapsed = true;

  constructor(public authService: AuthService, private router: Router) {
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}
