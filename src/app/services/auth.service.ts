// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
  }

  get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
