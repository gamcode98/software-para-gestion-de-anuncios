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
  adsWithImages: Ad[] = [];
  adsWithPlaneText: Ad[] = [];
  adsWithHTML: Ad[] = [];
  adsWithVideo: Ad[] = [];
  ads: Ad[] = [];
  ad!: Ad;
  displayStyle!: string;
  adToDelete!: string;
  adToDoActions!: Ad;

  constructor(private adService: AdService, private router: Router) {
    this.viewAds();
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

  getInfo() {
    console.log(this.ads);
  }

  selectAd(id: string) {
    this.ads.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });
    console.log(this.adToDoActions);
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
      // this.init();
    });
  }
  init() {
    this.ad = this.adsWithImages[0];
  }
  ngOnInit(): void {
    this.viewAds();
  }
}
