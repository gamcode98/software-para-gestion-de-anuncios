import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { Person } from 'src/app/models/person';
import { AdService } from 'src/app/services/ad.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-request-ad-view',
  templateUrl: './request-ad-view.component.html',
  styleUrls: ['./request-ad-view.component.css'],
})
export class RequestAdViewComponent implements OnInit {
  // adsForMe: Ad[] = [];
  // ads: Ad[] = [];
  // ad: Ad = new Ad();
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adService.getAdsWhereUserIsEncargado().subscribe((res) => {
      this.ads = res.result;
      console.log(res.result);
      // this.ads.forEach((el:any) => {
      // });
      this.ads.forEach((subEl: Ad) => {
        console.log(subEl.typeOfContent.html);
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
    console.log(this.adToDoActions);
    this.adService.updatePartialAd(this.adToDoActions).subscribe((q) => {
      console.log(q);
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
