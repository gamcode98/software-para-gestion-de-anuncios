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
  ad: Ad = new Ad();
  area: Area[] = [];

  constructor(private service: AdService, private serviceArea: AreaService) {}

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
