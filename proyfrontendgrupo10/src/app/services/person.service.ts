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

  getUsers(){
    return this._http.get<Person[]>(`${this.urlApi}`)
  }

  getPersonById(id: string) {
    return this._http.get<Person>(`${this.urlApi}/${id}`);
  }
  myInfo() {
    return this._http.get<Person>(`${this.urlApi}/my-info`);
  }
  addPerson(person: Person): Observable<any> {
    return this._http.post('http://localhost:3000/api/auth/signup', person);
  }

  requestToEnterArea() {
    return this._http.get<Person[]>(
      'http://localhost:3000/api/users/request-enter-area'
    );
  }

  updateUser(p: Person) {
    return this._http.patch<Person>(`${this.urlApi}/` + p._id, p);
  }

  deleteUser(id:string){
    return this._http.delete<Person>(`${this.urlApi}/${id}`)
  }

}
