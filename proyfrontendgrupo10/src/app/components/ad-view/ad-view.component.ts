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
  adsImage:Ad[] = []
  ad!: Ad;

  constructor(private adService: AdService, private router: Router) {
    this.viewAds();
  }

  init() {
    this.ad = this.ads[0];
    console.log("this.ad")
    console.log(this.ad)
  }

  next() {
    if (this.indice != this.adsImage.length - 1) {
      this.indice = this.indice + 1;
      this.ad = this.adsImage[this.indice];
    }
  }
  back() {
    if (this.indice != 0) {
      this.indice = this.indice - 1;
      this.ad = this.adsImage[this.indice];
    }
  }

  viewAds() {
    this.adService.getAds().subscribe((resp) => {
      // console.log("resp");
      // console.log(resp);
      this.ads = resp;
      console.log(this.ads);
      this.adsImage=this.ads.filter((q:any)=> q.typeOfContent.image===true)
      console.log(this.adsImage)
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
