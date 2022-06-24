import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(private _http: HttpClient) {}

  getAreas() {
    return this._http.get('http://localhost:3000/api/areas');
  }
}
