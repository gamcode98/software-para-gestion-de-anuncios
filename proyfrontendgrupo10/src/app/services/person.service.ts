import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  urlApi = 'http://localhost:3000/api/users';
  constructor(private _http: HttpClient) {}

  getPerson() {
    return this._http.get<Person[]>(`${this.urlApi}`);
  }
  getPersonById(id: string) {
    return this._http.get<Person>(`${this.urlApi}/${id}`);
  }
  addPerson(person: Person): Observable<any> {
    return this._http.post(this.urlApi, person);
  }
}
