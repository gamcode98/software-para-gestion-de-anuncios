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
  indice: number = 0;
  adsWithImages: Ad[] = [];
  adsWithPlaneText: Ad[] = [];
  adsWithHTML: Ad[] = [];
  adsWithVideo: Ad[] = [];
  ads: Ad[] = [];
  ad!: Ad;
  displayStyle!: string;

  adToDelete!: string;

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

  showPopUp(id: string) {
    this.displayStyle = 'block';
    this.adToDelete = id;
  }

  deleteAd() {
    this.adService.deleteAd(this.adToDelete).subscribe((data) => {
      this.closePopup();
    });
  }

  editAd(id: string) {
    console.log(id);
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  viewAds() {
    this.adService.getAds().subscribe((res) => {
      this.ads = res;
      this.ads.forEach((ad) => {
        if (ad.typeOfContent.html) {
          this.adsWithHTML.push(ad);
        } else if (ad.typeOfContent.image) {
          this.adsWithImages.push(ad);
        } else if (ad.typeOfContent.planeText) {
          this.adsWithPlaneText.push(ad);
        } else if (ad.typeOfContent.video) {
          this.adsWithVideo.push(ad);
        }
      });
      this.init();
    });
  }

  ngOnInit(): void {
    this.viewAds();
  }

  getInfo() {
    console.log(this.ads);
  }
}
