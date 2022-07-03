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
  socialFilter!: string;
  typeFilter!: string;
  userFiler!: string;
  dateFilter!: Date;
  areasFilter!: string;
  roleFilter!: string;
  users: Person[] = [];
  me!: Person;
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
    this.personService.myInfo().subscribe((q) => {
      this.me = q;
      console.log(this.me);
    });
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
  }
  filter() {
    this.adsFilter = [];
    if (this.textfilter !== '') {
      this.ads.forEach((q) => {
        if (q.text.match(this.textfilter)) {
          this.adsFilter.push(q);
        }
      });
    }
    if (this.socialFilter !== '') {
      this.ads.forEach((q) => {
        for (let i = 0; i < q.publishingMedia.length; i++) {
          if (q.publishingMedia[i].name === this.socialFilter) {
            this.adsFilter.push(q);
          }
        }
      });
    }
    if (this.typeFilter !== '') {
      this.ads.forEach((q) => {
        if ((q.typeOfContent as any)[this.typeFilter] === true) {
          this.adsFilter.push(q);
        }
      });
    }
    if (this.userFiler !== undefined) {
      this.ads.forEach((q) => {
        console.log(this.userFiler);
        console.log(q.editor, '     =          ', this.userFiler);
        if (q.editor === this.userFiler) {
          this.adsFilter.push(q);
        }
      });
    }
    if (this.dateFilter !== undefined) {
      this.ads.forEach((q) => {
        console.log(this.dateFilter);
        if (q.entryDate.initial.toString().match(this.dateFilter.toString())) {
          this.adsFilter.push(q);
        }
      });
    }
    if (this.areasFilter !== '') {
      this.ads.forEach((q) => {
        console.log(this.areasFilter);
        for (let i = 0; i < q.receivers.length; i++) {
          console.log(q.receivers[i].area._id);
          if (q.receivers[i].area.toString() === this.areasFilter) {
            console.log('ezzzzzzzzzzzzzzzzzzzz');
            this.adsFilter.push(q);
          }
        }
      });
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
