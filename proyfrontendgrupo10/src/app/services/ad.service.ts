import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  constructor(private _http: HttpClient) {}

  private URL = 'http://localhost:3000/api';

  createAd(ad: Ad) {
    return this._http.post(`${this.URL}/ads`, ad);
  }

  getAd() {}
  updatePartialAd(ad: Ad) {
    return this._http.patch<Ad[]>(
      'http://localhost:3000/api/ads/' + ad._id,
      ad
    );
  }

  getAds() {
    return this._http.get<Ad[]>(`${this.URL}/ads`);
  }

  getAdsThatBelongToTheArea() {
    return this._http.get<any>(`${this.URL}/ads/all`);
  }

  getAdsWhereUserIsEncargado() {
    return this._http.get<any>(`${this.URL}/ads/all-to-encargado`);
  }

  getAdsAll() {
    return this._http.get<Ad[]>(`${this.URL}/ads/allall`);
  }

  deleteAd(id: string) {
    return this._http.delete(`${this.URL}/ads/${id}`);
  }

  getAdById(id:string) {
    return this._http.get<Ad>(`${this.URL}/ads/${id}`);
  }

  updateAd(ad: Ad) {
    return this._http.put(`${this.URL}/ads/${ad._id}`,ad);
  }
}
