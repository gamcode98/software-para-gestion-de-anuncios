import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-view',
  templateUrl: './ad-view.component.html',
  styleUrls: ['./ad-view.component.css'],
})
export class AdViewComponent implements OnInit {
  ads: Ad[] = [];
  indice: number = 0;
  ad!: Ad;

  constructor(private adService: AdService, private router: Router) {
    this.viewAds();
  }

  init() {
    this.ad = this.ads[0];
  }

  next() {
    if (this.indice != this.ads.length - 1) {
      this.indice = this.indice + 1;
      this.ad = this.ads[this.indice];
    }
  }
  back() {
    if (this.indice != 0) {
      this.indice = this.indice - 1;
      this.ad = this.ads[this.indice];
    }
  }

  viewAds() {
    this.adService.getAds().subscribe((resp) => {
      console.log(resp);
      this.ads = resp;
      console.log(this.ads);
    });
  }

  deleteAd(id: string) {}

  editAd(id: string) {
    this.router.navigate(['form-ad', id]);
  }

  ngOnInit(): void {
    this.viewAds();
    this.init();
  }
}
