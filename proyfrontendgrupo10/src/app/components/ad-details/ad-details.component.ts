import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css'],
})
export class AdDetailsComponent implements OnInit {
  id!: string | null;
  ad: Ad = new Ad();
  constructor(private route: ActivatedRoute, private service: AdService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.service.getAdById(this.id).subscribe((q) => {
        this.ad = q;
        console.log(this.ad);
      });
    }
  }
}
