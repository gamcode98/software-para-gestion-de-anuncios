import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  person: Person = new Person();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logIn() {
    this.authService.loginUser(this.person).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/ad-view']);
      },
      (err) => console.log(err)
    );
  }
}
