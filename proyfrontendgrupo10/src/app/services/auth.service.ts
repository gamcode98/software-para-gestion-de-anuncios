import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Person } from '../models/person';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() disparador: EventEmitter<any> = new EventEmitter()

  private URL = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient, private router: Router) {}

  signUpUser(user: Person) {
    return this.http.post<Person>(this.URL + '/signup', user);
  }

  loginUser(user: Person) {
    return this.http.post<any>(this.URL + '/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
