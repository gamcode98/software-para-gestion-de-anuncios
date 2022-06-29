import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  constructor(private _http: HttpClient) {}

  createAd(ad: Ad) {
    return this._http.post('http://localhost:3000/api/ads', ad);
  }

  getAd(id: string) {}

  getAds() {
    return this._http.get<Ad[]>('http://localhost:3000/api/ads');
  }

  deleteAd(id: string) {
    return this._http.delete(`http://localhost:3000/api/ads/${id}`);
  }
}
