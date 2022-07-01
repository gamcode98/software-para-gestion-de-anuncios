import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-all-ads-view',
  templateUrl: './all-ads-view.component.html',
  styleUrls: ['./all-ads-view.component.css'],
})
export class AllAdsViewComponent implements OnInit {
  indice: number = 0;
  adsWithImages: Ad[] = [];
  adsWithPlaneText: Ad[] = [];
  adsWithHTML: Ad[] = [];
  adsWithVideo: Ad[] = [];
  ad!: Ad;
  ads: Ad[] = [];
  constructor(private adService: AdService, private router: Router) {}

  init() {
    this.ad = this.adsWithImages[0];
  }

  next() {
    this.indice++;
    if (this.indice < this.adsWithImages.length) {
      this.ad = this.adsWithImages[this.indice];
    } else {
      this.indice = 0;
      this.ad = this.adsWithImages[this.indice];
    }
  }

  back() {
    if (this.indice === 0) {
      this.indice = this.adsWithImages.length - 1;
      this.ad = this.adsWithImages[this.indice];
    } else {
      this.indice--;
      this.ad = this.adsWithImages[this.indice];
    }
  }

  viewAds() {
    this.adService.getAdsThatBelongToTheArea().subscribe((res) => {
      console.log(res.result);
      this.ads = res;
      res.result.forEach((el: any) => {
        el.forEach((subEl: any) => {
          if (subEl.typeOfContent.html) {
            this.adsWithHTML.push(subEl);
          } else if (subEl.typeOfContent.image) {
            this.adsWithImages.push(subEl);
          } else if (subEl.typeOfContent.planeText) {
            this.adsWithPlaneText.push(subEl);
          } else if (subEl.typeOfContent.video) {
            this.adsWithVideo.push(subEl);
          }
        });
      });

      // console.log("++++++++++++++")
      // console.log(this.ads)
      // this.ads.forEach((ad) => {
      //   if (ad.typeOfContent.html) {
      //     this.adsWithHTML.push(ad);
      //   } else if (ad.typeOfContent.image) {
      //     this.adsWithImages.push(ad);
      //   } else if (ad.typeOfContent.planeText) {
      //     this.adsWithPlaneText.push(ad);
      //   } else if (ad.typeOfContent.video) {
      //     this.adsWithVideo.push(ad);
      //   }
      // });
      this.init();
    });
  }

  ngOnInit(): void {
    this.viewAds();
    // console.log(this.adsWithPlaneText);
  }
}
