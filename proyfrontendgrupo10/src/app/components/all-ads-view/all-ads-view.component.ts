import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { Person } from 'src/app/models/person';
import { AdService } from 'src/app/services/ad.service';
import { PersonService } from 'src/app/services/person.service';

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
  adsFilter: Ad[] = [];
  textfilter: string = '';
  socialFilter: string = '';
  typeFilter: string = '';
  userFiler: string = '';
  dateFilter!: Date;
  areasFilter: string = '';
  roleFilter: string = '';
  users: Person[] = [];
  me!: Person;
  filterFile: boolean = false;
  constructor(
    private adService: AdService,
    private router: Router,
    private personService: PersonService
  ) {}

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
    this.personService.myInfo().subscribe(
      (q) => {
        this.me = q;
        this.adService.getAdsThatBelongToTheArea().subscribe((res) => {
          console.log(res.result);
          this.ads = res.result;
          res.result.forEach((el: any) => {
            if (el.typeOfContent.html) {
              this.adsWithHTML.push(el);
            } else if (el.typeOfContent.image) {
              this.adsWithImages.push(el);
            } else if (el.typeOfContent.planeText) {
              this.adsWithPlaneText.push(el);
            } else if (el.typeOfContent.video) {
              this.adsWithVideo.push(el);
            }
          });

          this.init();
        });
      },
      (err) => {
        this.adService.getAdsPublic().subscribe((p) => {
          this.ads = p;
          console.log(p);
          p.forEach((el: any) => {
            console.log(el);
            if (el.typeOfContent.html) {
              this.adsWithHTML.push(el);
            } else if (el.typeOfContent.image) {
              this.adsWithImages.push(el);
            } else if (el.typeOfContent.planeText) {
              this.adsWithPlaneText.push(el);
            } else if (el.typeOfContent.video) {
              this.adsWithVideo.push(el);
            }
          });
          this.init();
        });
      }
    );
  }
  filter() {
    let first: boolean = true;
    this.adsFilter = [];
    this.filterFile = false;
    if (this.textfilter !== '') {
      const aux: Ad[] = [];
      this.ads.forEach((q) => {
        if (q.text.match(this.textfilter)) {
          aux.push(q);
        }
      });
      console.log(aux, '    ', this.filterFile);
      if (aux.length === 0) {
        this.adsFilter === [];
        this.filterFile = true;
      } else {
        first = false;
        this.filterFile = false;
        aux.forEach((a) => {
          this.adsFilter.push(a);
        });
      }
    }
    if (this.socialFilter !== '') {
      const aux: Ad[] = [];
      this.ads.forEach((q) => {
        for (let i = 0; i < q.publishingMedia.length; i++) {
          if (q.publishingMedia[i].name === this.socialFilter) {
            aux.push(q);
          }
        }
      });
      if (aux.length === 0 || this.filterFile) {
        this.adsFilter === [];
        this.filterFile = true;
      } else {
        if (first) {
          first = false;
          aux.forEach((a) => {
            this.adsFilter.push(a);
          });
        } else {
          const aux2: Ad[] = [];
          this.filterFile = false;
          this.adsFilter.forEach((af) => {
            aux.forEach((a) => {
              if (af._id === a._id) {
                aux2.push(af);
              }
            });
          });
          this.adsFilter = aux2;
        }
      }
    }
    if (this.typeFilter !== '') {
      const aux: Ad[] = [];
      this.ads.forEach((q) => {
        if ((q.typeOfContent as any)[this.typeFilter] === true) {
          aux.push(q);
        }
      });
      console.log(aux, '    ', this.filterFile);
      if (aux.length === 0 || this.filterFile) {
        this.adsFilter === [];
        this.filterFile = true;
      } else {
        if (first) {
          first = false;
          aux.forEach((a) => {
            this.adsFilter.push(a);
          });
        } else {
          const aux2: Ad[] = [];
          this.filterFile = false;
          this.adsFilter.forEach((af) => {
            aux.forEach((a) => {
              if (af._id === a._id) {
                aux2.push(af);
              }
            });
          });
          this.adsFilter = aux2;
        }
      }
    }
    if (this.userFiler !== '') {
      const aux: Ad[] = [];
      this.ads.forEach((q) => {
        if (q.editor === this.userFiler) {
          aux.push(q);
        }
      });
      console.log(aux, '    ', this.userFiler);
      if (aux.length === 0 || this.filterFile) {
        this.adsFilter === [];
        this.filterFile = true;
      } else {
        if (first) {
          first = false;
          aux.forEach((a) => {
            this.adsFilter.push(a);
          });
        } else {
          const aux2: Ad[] = [];
          this.filterFile = false;
          this.adsFilter.forEach((af) => {
            aux.forEach((a) => {
              if (af._id === a._id) {
                aux2.push(af);
              }
            });
          });
          this.adsFilter = aux2;
        }
      }
    }
    if (this.dateFilter !== undefined) {
      const aux: Ad[] = [];
      this.ads.forEach((q) => {
        console.log(this.dateFilter);
        if (q.entryDate.initial.toString().match(this.dateFilter.toString())) {
          aux.push(q);
        }
      });
      console.log(aux, '    ', this.filterFile);
      if (aux.length === 0 || this.filterFile) {
        this.adsFilter === [];
        this.filterFile = true;
      } else {
        if (first) {
          first = false;
          aux.forEach((a) => {
            this.adsFilter.push(a);
          });
        } else {
          const aux2: Ad[] = [];
          this.filterFile = false;
          this.adsFilter.forEach((af) => {
            aux.forEach((a) => {
              if (af._id === a._id) {
                aux2.push(af);
              }
            });
          });
          this.adsFilter = aux2;
        }
      }
    }
    if (this.areasFilter !== '') {
      const aux: Ad[] = [];
      this.ads.forEach((q) => {
        for (let i = 0; i < q.receivers.length; i++) {
          if (q.receivers[i].area.toString() === this.areasFilter) {
            aux.push(q);
          }
        }
      });
      console.log(aux, '    ', this.filterFile);
      if (aux.length === 0 || this.filterFile) {
        this.adsFilter === [];
        this.filterFile = true;
      } else {
        if (first) {
          first = false;
          aux.forEach((a) => {
            this.adsFilter.push(a);
          });
        } else {
          const aux2: Ad[] = [];
          this.filterFile = false;
          this.adsFilter.forEach((af) => {
            aux.forEach((a) => {
              if (af._id === a._id) {
                aux2.push(af);
              }
            });
          });
          this.adsFilter = aux2;
        }
      }
    }
  }
  ngOnInit(): void {
    this.viewAds();
    this.personService.getPerson().subscribe((q) => {
      this.users = q;
    });
    // console.log(this.adsWithPlaneText);
  }
}
