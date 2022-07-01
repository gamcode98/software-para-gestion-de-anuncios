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
  idOfAdToDelete!: string;
  adToDoActions!: Ad;

  constructor(private adService: AdService, private router: Router) {}

  showPopUp(id: string) {
    this.displayStyle = 'block';
    this.idOfAdToDelete = id;
  }

  deleteAd() {    
    this.adService.deleteAd(this.idOfAdToDelete).subscribe((res) => {      
      this.closePopup();
      this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['my-ads']));
    });
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  selectAd(id: string) {
    this.ads.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });
  }

  viewAds() {
    this.adService.getAds().subscribe((ads) => {      
      this.ads = ads;
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
    });
  }
  
  ngOnInit(): void { 
    this.viewAds();
  }
  
}
