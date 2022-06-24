import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { Area } from 'src/app/models/area';
import { AdService } from 'src/app/services/ad.service';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-form-ad',
  templateUrl: './form-ad.component.html',
  styleUrls: ['./form-ad.component.css'],
})
export class FormAdComponent implements OnInit {
  ad!: Ad;
  area: Area[] = [];

  constructor(private service: AdService, private serviceArea: AreaService) {
    this.ad = new Ad();
    this.ad.publishingMedia = {
      facebook: false,
      twitter: false,
      youtube: false,
      instagram: false,
      email: false,
      tv: false,
    };
    this.ad.entryDate = {
      initial: new Date(),
      final: new Date(),
    };
  }

  ngOnInit(): void {}
  init() {
    this.serviceArea.getAreas().subscribe((q: any) => {
      this.area = q;
    });
  }

  createAd() {
    this.service.createAd(this.ad).subscribe((q) => {
      console.log(q);
    });
  }
}
