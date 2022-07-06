import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from '../models/area';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(private _http: HttpClient) {}

  getAreas() {
    return this._http.get('http://localhost:3000/api/areas');
  }

  createArea(area: Area){
    return this._http.post('http://localhost:3000/api/areas',area)
  }

  deleteArea(id:string){
    return this._http.delete(`http://localhost:3000/api/areas/${id}`)
  }

  updateArea(area:Area){
    return this._http.put(`http://localhost:3000/api/areas/${area._id}`,area)
  }

  getAreaById(id:string){
    return this._http.get(`http://localhost:3000/api/areas/${id}`)
  }
}
