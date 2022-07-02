import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { Person } from 'src/app/models/person';
import { AdService } from 'src/app/services/ad.service';
import { PersonService } from 'src/app/services/person.service';
import { FacebookService, InitParams } from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';

@Component({
  selector: 'app-request-ad-view',
  templateUrl: './request-ad-view.component.html',
  styleUrls: ['./request-ad-view.component.css'],
})
export class RequestAdViewComponent implements OnInit {
  // adsForMe: Ad[] = [];
  // ads: Ad[] = [];
  // ad: Ad = new Ad();
  mensaje: string = 'probando';
  adsWithImages: Ad[] = [];
  adsWithPlaneText: Ad[] = [];
  adsWithHTML: Ad[] = [];
  adsWithVideo: Ad[] = [];
  adToDoActions!: Ad;
  displayStyle!: string;
  adToDecline!: string;
  adToAuthorize!: string;
  decline!: boolean;
  authorize!: boolean;
  user!: Person;
  idAreaToUpdate!: string;

  myAreas: string[] = [];

  ads: any[] = [];
  adsArea1: any[] = [];

  constructor(
    private adService: AdService,
    private serviceUser: PersonService,
    private router: Router,
    private fb: FacebookService
  ) {}

  ngOnInit(): void {
    this.adService.getAdsWhereUserIsEncargado().subscribe((res) => {
      this.ads = res.result;
      console.log(res.result);
      this.iniciarFb();
      // this.ads.forEach((el:any) => {
      // });
      this.ads.forEach((subEl: any) => {
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
    // this.serviceUser.myInfo().subscribe(res=> {
    //   res.infoAreas.forEach(el=> {
    //     this.myAreas.push(el.area._id)
    //   })
    // })

    // console.log("this.myAreas")
    // console.log(this.myAreas)
  }
  iniciarFb() {
    let initParams: InitParams = {
      appId: '1223520885146013',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v14.0',
    };
    this.fb.init(initParams);
  }
  postFb() {
    var apiMethod: ApiMethod = 'post';
    this.fb.api('/109192058513786/feed', apiMethod, {
      message: this.mensaje,
      access_token:
        'EAARYySe8AZA0BAPZBkZCEI6PqsjssK0IRlfe2eZBTjIeHx9vtxOmGBYQnOGmVDJx1SzqQtbPzZCqlZBI0mf47W7CZAeP2ObZAMNo44UuUzkdcyv8z5KjTDD1mpvN7IiJYUgrd0ZCoZCrlTz5kHsmD0A08JNyQToIgrAd0lNSu3oONRGry1jwQMOJPdzgOe76xv8g5XNoJOkpPWZApUycx6vi0gDZCr1XMsCpzSYZD',
    });
  }

  selectAd(id: string) {
    this.adsWithHTML.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });
    this.adsWithImages.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });
    this.adsWithPlaneText.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });

    this.adsWithVideo.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });
    console.log(
      'this.adToDoActions.receivers => ',
      this.adToDoActions.receivers
    );
    // console.log(this.adToDoActions.receivers[0].area);
  }

  showPopUp(id: string, status: string) {
    console.log('popUp id => ', id);
    this.idAreaToUpdate = id;
    this.displayStyle = 'block';
    if (status === 'authorize') this.authorize = true;
    if (status === 'decline') this.decline = true;

    // console.log(this.adToDoActions.receivers[0].area)

    // this.adToDoActions.receivers.forEach(receiver => {
    //   this.myAreas.forEach(area=>{
    //     if(area===receiver.area._id){
    //       console.log("hii")
    //     }
    //   })
    // })
  }

  authorizeAd() {
    // console.log(this.adToDoActions.receivers[0].status)
    // this.adService.updatePartialAd(this.adToDoActions).subscribe(res=> {
    //   console.log(res)
    // })
    for (let i = 0; i < this.adToDoActions.receivers.length; i++) {
      if (this.adToDoActions.receivers[i].area._id === this.idAreaToUpdate) {
        this.adToDoActions.receivers[i].status = 'autorizado';
      }
    }
    this.adService.updatePartialAd(this.adToDoActions).subscribe((q) => {
      console.log(q);
      this.postFb();
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['admin-reques-ad-v2']));
    });
  }

  declineAd() {
    for (let i = 0; i < this.adToDoActions.receivers.length; i++) {
      if (this.adToDoActions.receivers[i].area._id === this.idAreaToUpdate) {
        this.adToDoActions.receivers[i].status = 'cancelado';
      }
    }
    this.adService.updatePartialAd(this.adToDoActions).subscribe((q) => {
      console.log(q);
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['admin-reques-ad-v2']));
    });
  }

  closePopup() {
    this.displayStyle = 'none';
    this.authorize = false;
    this.decline = false;
  }

  getInfo() {
    console.log(this.adsWithHTML);
    console.log(this.adsWithImages);
    console.log(this.adsWithPlaneText);
    console.log(this.adsWithVideo);
  }
}
