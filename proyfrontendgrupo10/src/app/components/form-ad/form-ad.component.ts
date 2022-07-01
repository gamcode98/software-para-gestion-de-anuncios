import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { Person } from 'src/app/models/person';
import { Area } from 'src/app/models/area';
import { AdService } from 'src/app/services/ad.service';
import { AreaService } from 'src/app/services/area.service';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-ad',
  templateUrl: './form-ad.component.html',
  styleUrls: ['./form-ad.component.css'],
})
export class FormAdComponent implements OnInit {
  ad!: Ad;
  area: Area[] = [];
  areaAux: Area[] = [];
  sel: string = '';
  pm: number[] = [];
  pmUser: number[][] = [];
  start: boolean = true;
  startArea: boolean = true;
  me: Person = new Person();
  myAreas!: any[];

  constructor(
    private service: AdService,
    private serviceArea: AreaService,
    private userService: PersonService,
    private router: Router
  ) {
    this.ad = new Ad();

    this.ad.entryDate = {
      initial: new Date(),
      final: new Date(),
    };
    this.init();
  }

  ngOnInit(): void {}
  init() {
    // this.serviceArea.getAreas().subscribe((q: any) => {
    //   this.area = q;
    //   console.log(this.area);
    // });

    //Usar las areas del usuario
    this.userService.myInfo().subscribe((el: any) => {
      this.myAreas = el.infoAreas;
      this.me = el;
      for (let i = 0; i < this.me.infoAreas.length; i++) {
        console.log(this.me.infoAreas[i].status);
        console.log(i);
        if (this.me.infoAreas[i].status === 'aceptado') {
          let aux: Area = new Area();
          aux = this.me.infoAreas[i].area;
          aux.areaRoles = this.me.infoAreas[i].userRoles;
          this.area.push(aux);
          console.log(this.me);
        }
      }
      // this.myAreas.forEach((a) => {
      //   if (a.status === 'aceptado') {
      //     this.area.push(a.area);
      //     console.log(a.area);
      //   }
      // });
    });
  }
  newSocial() {
    if (this.start) {
      this.pm.push(0);
      this.pmUser.push([]);
      this.start = false;
      this.ad.publishingMedia = [{ name: '', accounts: [] }];
    } else {
      this.pm.push(this.pm.length);
      this.ad.publishingMedia.push({ name: '', accounts: [] });
      console.log(this.ad);
    }
  }
  newUser(x: number) {
    if (this.pmUser[x] === undefined) {
      this.pmUser[x] = [];
    }
    this.pmUser[x].push(this.pmUser[x].length);
    this.ad.publishingMedia[this.ad.publishingMedia.length - 1].accounts.push(
      ''
    );
    console.log(this.ad);
  }

  createAd() {
    this.service.createAd(this.ad).subscribe((q) => {
      console.log(q);
      this.router.navigate(['my-ads']);
    });
  }
  addRecivers(name: string) {
    if (this.startArea) {
      this.ad.receivers = [
        {
          area: { _id: name, areaRoles: [], name: '' },
          areaRoles: [],
          status: 'confeccionado',
        },
      ];
      this.startArea = false;
      console.log(this.ad);
    } else {
      let exist: Boolean = false;
      for (let i = 0; i < this.ad.receivers.length; i++) {
        if (this.ad.receivers[i].area._id === name) {
          console.log(this.ad);
          this.ad.receivers.splice(i, 1);
          exist = true;
        }
      }
      if (!exist) {
        this.ad.receivers.push({
          area: { _id: name, areaRoles: [], name: '' },
          areaRoles: [],
          status: 'confeccionando',
        });
        console.log(this.ad);
      }
    }
  }
  addReciversRol(name: string, rol: string) {
    let exist: Boolean = false;
    let index: number = 0;
    for (let i = 0; i < this.ad.receivers.length; i++) {
      if (this.ad.receivers[i].area._id === name) {
        index = i;
        for (let j = 0; j < this.ad.receivers[i].areaRoles.length; j++) {
          if (this.ad.receivers[i].areaRoles[j] === rol) {
            this.ad.receivers[i].areaRoles.splice(j, 1);
            exist = true;
            console.log(this.ad);
          }
        }
      }
    }
    if (!exist) {
      let a: Area = new Area();
      this.ad.receivers[index].areaRoles.push(rol);
      console.log(this.ad);
    }
  }
  selectContent() {
    console.log(this.sel);
    if (this.sel === 'planeText') {
      this.ad.typeOfContent = {
        planeText: true,
        image: false,
        html: false,
        video: false,
      };
    }
    if (this.sel === 'html') {
      this.ad.typeOfContent = {
        planeText: false,
        image: false,
        html: true,
        video: false,
      };
    }
    if (this.sel === 'image') {
      this.ad.typeOfContent = {
        planeText: false,
        image: true,
        html: false,
        video: false,
      };
    }
    if (this.sel === 'video') {
      this.ad.typeOfContent = {
        planeText: false,
        image: false,
        html: false,
        video: true,
      };
    }
    console.log(this.ad);
  }
}
