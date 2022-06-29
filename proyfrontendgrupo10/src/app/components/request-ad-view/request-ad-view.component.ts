import { Component, OnInit } from '@angular/core';
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
  adsForMe: Ad[] = [];
  ads: Ad[] = [];
  ad: Ad = new Ad();
  me: Person = new Person();
  constructor(private service: AdService, private serviceUser: PersonService) {
    serviceUser.getPersonById('62bc50cd22998883c156d516').subscribe((q) => {
      this.me = q;
      console.log(this.me);
    });
    this.getRequestAds();
  }

  getRequestAds() {
    this.service.getAds().subscribe((q) => {
      this.ads = q;
      this.ads.forEach((ad) => {
        let add: boolean = false;
        ad.receivers.forEach((rec) => {
          this.me.infoAreas.forEach((myArea) => {
            console.log(myArea.area._id);
            if (rec.area._id === myArea.area._id) {
              if (rec.status === 'confeccionado') {
                if (myArea.userRoles.includes('Encargado')) {
                  console.log('formeeeeeee');
                  add = true;
                }
              }
            }
          });
        });
        if (add) {
          this.adsForMe.push(ad);
        }
      });

      console.log(this.adsForMe);
    });
  }

  moreDetails(a: Ad) {
    this.ad = a;
  }
  decideRequest(idArea: string, del: boolean) {
    for (let i = 0; i < this.ad.receivers.length; i++) {
      if (this.ad.receivers[i].area._id === idArea) {
        this.me.infoAreas.forEach((q) => {
          if (q.area._id === this.ad.receivers[i].area._id) {
            if (q.userRoles.includes('Encargado')) {
              if (del) {
                this.ad.receivers[i].status = 'cancelado';

                console.log(this.ad);
              } else {
                this.ad.receivers[i].status = 'autorizado';
                console.log(this.ad);
              }
            } else {
              console.log('nelPastel');
            }
          }
        });
      }
    }
  }

  ngOnInit(): void {}
}
